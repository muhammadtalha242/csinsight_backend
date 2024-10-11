import { Request, Response } from "express";
import sequelize, { FindAndCountOptions, FindOptions } from "sequelize";
import axios from "axios";
import { Op } from "sequelize";

import {
  PagedParameters,
  QueryFilters,
  TopKParameters,
} from "../interfaces/types";

import { buildMatchObject, quartilePosition } from "../utils/queryUtil";
import {
  decompressFile,
  readAndLoadFile,
  splitArrayIntoSubArrays,
} from "../utils/fileReader";
import { downloadFile } from "../utils/fileDownload";
import { Sequelize } from "../db/models";

export default () => {
  const models = require("../db/models");
  require("dotenv").config();

  const { paper: Papers, authorTable: Author, paperAuthor } = models;

  return {
    searchAuthorByName: async (req: Request, res: Response) => {
      try {
        const searchQuery = req.query.q;

        if (!searchQuery) {
          return res.status(400).send("Query parameter is required");
        }

        const authors = await Author.findAll({
          attributes: [
            ["authorid", "id"],
            ["name", "value"],
          ],
          where: {
            [Op.or]: [
              { name: { [Op.like]: `${searchQuery}%` } },
              Sequelize.literal(`'${searchQuery}' = ANY(aliases)`),
            ],
          },
          limit: 10,
        });

        return authors;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    getAuthorsYears: async (req: Request<QueryFilters>, res: Response) => {
      try {
        const data = await Papers.findAll({
          attributes: [
            "yearPublished",
            [sequelize.fn("COUNT", sequelize.col("authorIds")), "count"],
          ],
          where: buildMatchObject(req.query),
          group: ["yearPublished"],
          order: [["yearPublished", "ASC"]],
          raw: true,
        });

        res.json(data);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    },
    getAuthorsInfo: async (
      req: Request<QueryFilters & PagedParameters>,
      res: Response
    ) => {
      const query = `SELECT 
      a.authorid,
      a."name",
      a.papercount,
      a.citationcount,
      a.hindex,
        MIN(p.year) as first_year_of_publish,
        MAX(p.year) as last_year_of_publish
    FROM 
        public."authorTable" a
    JOIN 
    public."PaperAuthor" pa ON a.authorid = pa."authorId"
    JOIN 
        public.papers p ON pa."paperId" = p.corpusid 
    GROUP BY 
        a."authorid"
    `;
      const {
        page = 0,
        pageSize = 10,
        sortField = "papercount",
        sortDirection = "asc",
      } = req.body;

      const findOptions: FindAndCountOptions = {
        // where: buildMatchObject(req.body),
        order: [[sortField, sortDirection.toUpperCase()]],
        offset: Number(page) * Number(pageSize),
        limit: Number(pageSize),
      };
      if ((page != 0 && !page) || !pageSize) {
        res.status(422).json({
          message:
            'The request is missing the required parameter "page", "pageSize".',
        });
      } else {
        try {
          const rowCountPromise = Author.count(findOptions);
          const rowsPromise = Author.findAll({
            ...findOptions,
            attributes: [
              ["authorid", "id"],
              "name",
              "hindex",
              "papercount",
              ["citationcount", "totalCitations"],
              ["url", "link"],
            ],
          });
          const [rowCount, rows] = await Promise.all([
            rowCountPromise,
            rowsPromise,
          ]);

          const data = {
            rowCount,
            rows,
          };

          res.json(data);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
      }
    },
    getPaperTopk: async (
      req: Request<{}, {}, {}, QueryFilters & TopKParameters>,
      res: Response
    ) => {
      const k = Number(req.query.k);
      if (!k) {
        res.status(422).json({
          message: 'The request is missing the required parameter "k".',
        });
      } else {
        try {
          const findOptions: FindOptions = {
            where: buildMatchObject(req.query),
            order: [["citationcount", "DESC"]],
            limit: k,
            attributes: ["title", "citationcount"],
          };

          const data = await Papers.findAll(findOptions);
          res.json(data);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
      }
    },
    getPaperQuartiles: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      try {
        const findOptions: FindOptions = {
          where: buildMatchObject(req.query),
        };

        const rowCount = await Papers.count(findOptions);
        let data: number[];
        if (rowCount === 0) {
          data = [0, 0, 0, 0, 0];
        } else {
          const quartiles = [0, 0.25, 0.5, 0.75, 1.0].map((quartile) =>
            quartilePosition(rowCount, quartile)
          );

          const quartileDataPromises = quartiles.map((quartile) =>
            Papers.findAll({
              where: buildMatchObject(req.query),
              attributes: ["inCitationsCounts"],
              order: [["inCitationsCounts", "ASC"]],
              offset: quartile,
              limit: 1,
            })
          );

          const quartileData = await Promise.all(quartileDataPromises);
          data = quartileData.map((quart) => quart[0]?.inCitationsCounts || 0);
        }

        res.json(data);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    },
    getPublicationsCitationsCorrelation: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      try {
        // Optional: Limit the number of data points to avoid overloading the frontend
        const limit = parseInt(req.query.limit) || 10; // Default to 10,000

        // Fetch authors with their publication and citation counts
        // Optionally apply filters or sorting
        const authors = await Author.findAll({
          attributes: ["name", "papercount", "citationcount"],
          where: {
            papercount: { [Op.gt]: 0 },
            citationcount: { [Op.gt]: 0 },
            name: { [Op.not]: [""] },
          },
          order: [["papercount", "DESC"]], // Adjust as needed
          limit,
        });

        // Structure the response
        const dataPoints = authors.map((author) => ({
          x: author.papercount,
          y: author.citationcount,
          name: author.name,
        }));

        return dataPoints;
      } catch (error) {
        console.error("Error in /publications-citations-correlation:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    },

    addAuthors: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      const { SECRET_KEY } = process.env;
      try {
        //1. Get File URLs
        const url =
          "https://api.semanticscholar.org/datasets/v1/release/latest/dataset/authors";
        const response = await axios.get(url, {
          headers: { "x-api-key": SECRET_KEY },
        });
        const fileUrls = response.data.files;
        //2. Download Files
        const filesDownloaded = [];
        for (let index = 0; index < fileUrls.length; index++) {
          const url = fileUrls[index];
          const destinationPath = `./data/downloads/authors/Author-${index}.gz`; // Replace with the desired destination path
          filesDownloaded.push(await downloadFile(url, destinationPath));
        }
        //3.Read files and upload them in db
        for (let index = 0; index < filesDownloaded.length; index++) {
          const filePath = filesDownloaded[index];
          const folderPath = "./data/authors";

          const decompressedFilePath = await decompressFile(
            filePath,
            folderPath
          );
          const authorsArray: any[] = await readAndLoadFile(
            decompressedFilePath,
            folderPath
          );
          const subArrays = splitArrayIntoSubArrays(authorsArray);
          for (let i = 0; i < subArrays.length; i++) {
            const author = subArrays[i];
            const authorArr = author.filter((auth) => auth.authorid !== null);
            await Author.bulkCreate(authorArr, {
              ignoreDuplicates: true,
            });
          }
        }
        res.json({ message: "Data uploaded successfully." });
      } catch (error) {
        res.json({ message: error.message });
      }
    },
  };
};
