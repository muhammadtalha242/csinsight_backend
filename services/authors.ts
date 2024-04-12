import { Request, Response } from "express";
import sequelize, { FindOptions } from "sequelize";
import axios from "axios";
import { Op } from "sequelize";

import {
  PagedParameters,
  QueryFilters,
  TopKParameters,
} from "../interfaces/types";

import { buildMatchObject, quartilePosition } from "../utils/queryUtil";
import { readAndLoadFile, splitArrayIntoSubArrays } from "../utils/fileReader";
import { downloadFile } from "../utils/fileDownload";
import { Sequelize } from "../db/models";

export default () => {
  const models = require("../db/models");
  require("dotenv").config();

  const { paper: Papers, authorTable: Author } = models;

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
    getAuthorsYears: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
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
      req: Request<{}, {}, {}, QueryFilters & PagedParameters>,
      res: Response
    ) => {
      const matchObject = buildMatchObject(req.query);
      const pageSize = parseInt(req.query.pageSize);
      const page = parseInt(req.query.page);

      if ((page != 0 && !page) || !pageSize) {
        res.status(422).json({
          message:
            'The request is missing the required parameter "page", "pageSize".',
        });
      } else {
        try {
          const authorFull = await Author.findOne({
            where: {
              authorid: "103989795",
            },
            include: Papers,
          });
          const test = await Author.findAll({
            distinct: true,
            include: Papers,
            limit: pageSize,
          });
          res.json({ authorFull, test });
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
            order: [["inCitationsCounts", "DESC"]],
            limit: k,
            attributes: ["title", "inCitationsCounts"],
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
          const authorsArray: any[] = await readAndLoadFile(
            filePath,
            "./data/authors"
          );
          const subArrays = splitArrayIntoSubArrays(authorsArray);
          for (const author of subArrays) {
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
