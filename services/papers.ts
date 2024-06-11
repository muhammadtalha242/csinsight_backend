
import { Request, Response } from "express";
import { FindAndCountOptions, FindOptions } from "sequelize";
import * as fs from "fs";

import {
  PagedParameters,
  QueryFilters,
  TopKParameters,
} from "../interfaces/types";
import { buildMatchObject, quartilePosition } from "../utils/queryUtil";
import { decompressFile } from "../utils/fileReader";
import axios from "axios";
import { downloadFile } from "../utils/fileDownload";


import { Sequelize, sequelize as sequelizeDB } from "../db/models";

export default () => {
  const models = require("../db/models");
  const fs = require("fs");
  const csv = require("csv-parser");
  const { paper: Papers, paperAuthor: PaperAuthor, authorTable: Author, sequelize } = models;
  require("dotenv").config();
  // Add the association between PaperAuthor and Papers
  PaperAuthor.belongsTo(Papers, { foreignKey: "paperId" });
  Papers.hasMany(PaperAuthor, { foreignKey: "paperId" });
  return {

    addPapers: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      const { SECRET_KEY } = process.env;

      //ERRORS
      //DUPLICATE corpus ID 259212440, 39540493 259088906
      //Key (authorId)=(2224708782) is not present in table "authorTable".'
      // ConnectionAcquireTimeoutError [SequelizeConnectionAcquireTimeoutError]: Operation timeout

      try {
        let i = 0;
        //1. Get File URLs
        const url =
          "https://api.semanticscholar.org/datasets/v1/release/latest/dataset/papers";
        const response = await axios.get(url, {
          headers: { "x-api-key": SECRET_KEY },
        });
        const fileUrls = response.data.files;
        //2. Download Files
        const filesDownloaded = [];
        
        for (let index = 0; index < fileUrls.length; index++) {
          const url = fileUrls[index];
          const destinationPath = `./data/downloads/papers/Papers-${index}.gz`; // Replace with the desired destination path
          filesDownloaded.push(await downloadFile(url, destinationPath));
        }
        console.log('Files downloaded successfully.');
        //3.Read files and upload them in db

        // Drop the foreign key constraints
        await sequelizeDB.query(
          'ALTER TABLE "paperAuthor" DROP CONSTRAINT IF EXISTS "paperAuthor_authorId_fkey"',
          { raw: true }
        );
        await sequelizeDB.query(
          'ALTER TABLE "paperAuthor" DROP CONSTRAINT IF EXISTS "paperAuthor_paperId_fkey"',
          { raw: true }
        );

        for (let index = 0; index < filesDownloaded.length; index++) {
          const filePath = filesDownloaded[index];
          const folderPath = "./data/papers";

          const decompressedFilePath = await decompressFile(
            filePath,
            folderPath
          );
          const readStream = fs.createReadStream(decompressedFilePath, {
            encoding: "utf-8",
          });
          let jsonData = "";
          let buffer = "";
          readStream.on("data", async (chunk) => {
            buffer += chunk;
            jsonData = JSON.parse(JSON.stringify(buffer.toString()));
            let paper_author = [];
            try {
              const lines = jsonData.split("\n");
              buffer = lines.pop();
              const t = lines.map((l) => {
                paper_author = [];

                const parsed = JSON.parse(l);
                const paperAuthors = parsed.authors;
                if (paperAuthors.length > 0) {
                  paperAuthors.forEach((auth) => {
                    paper_author.push({
                      paperId: parsed.corpusid,
                      authorId: auth.authorId,
                    });
                  });
                } else {
                  paper_author.push({
                    paperId: parsed.corpusid,
                    authorId: null,
                  });
                }
                return parsed;
              });
              Papers.bulkCreate(t)
                .then((val) => {
                  PaperAuthor.bulkCreate(paper_author, {
                    validate: false,
                    ignoreDuplicates: true,
                  }).then((val) => {});
                })
                .catch((error) => {
                  res.json({ message: error.message });
                });
            } catch (error) {
              res.json({ message: error.message });
            }
          });

          readStream.on("end", () => {});

          readStream.on("error", (error) => {
            res.json({ message: error.message });
          });
        }
        // Recreate the dropped foreign key constraints
        await sequelizeDB.query(
          'ALTER TABLE "paperAuthor" ADD CONSTRAINT "paperAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE CASCADE',
          { raw: true }
        );
        await sequelizeDB.query(
          'ALTER TABLE "paperAuthor" ADD CONSTRAINT "paperAuthor_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "papers" ("id") ON DELETE CASCADE',
          { raw: true }
        );

        res.json({ message: "Data uploaded successfully." });
      } catch (error) {
        res.json({ message: error.message });
      }
    },

    getPapers: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      console.log("req.query", req.query);

      const matchObject = buildMatchObject(req.query);
      console.log("matchObject", matchObject);

      try {
        const data = await Papers.findAll({
          attributes: [
            [Sequelize.fn("count", Sequelize.col("*")), "count"],
            [
              Sequelize.fn("sum", Sequelize.col("citationcount")),
              "totalCitations",
            ], // Sum of citation counts
            "year",
          ],
          where: matchObject,
          group: ["year"],
          order: [
            ["year", "ASC"], // Optional: To order the results by year
          ],
        });
        return data;
      } catch (error) {
        return error;
      }
    },
    getPapersPost: async (req: Request<QueryFilters>, res: Response) => {
      console.log("req.bodu=y", req.body);
      const matchObject = buildMatchObject(req.body);
      console.log("matchObject", matchObject);

      try {
        const queryObject = {
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("*")), "count"], // Count of papers
            [
              Sequelize.fn("SUM", Sequelize.col("citationcount")),
              "totalCitations",
            ], // Sum of citation counts
            "year",
          ],
          where: matchObject,
          group: ["year"], // Group by year
          order: [["year", "ASC"]], // Order by year ascending
          raw: true, // Returns raw result objects
        };

        if (req.body.authorIds && req.body.authorIds.length > 0) {
          queryObject["include"] = [
            {
              model: PaperAuthor,
              attributes: [], // Exclude PaperAuthor attributes from the output
              where: {
                authorId: req.body.authorIds,
              },
              required: true, // Ensures an INNER JOIN
            },
          ];
        }

        const data = await Papers.findAll(queryObject);

        console.log(data);

        res.send(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
    getPaperInfo: async (
      req: Request<QueryFilters & PagedParameters>,
      res: Response
    ) => {
      const {
        page = 0,
        pageSize = 10,
        sortField = "yearPublished",
        sortDirection = "asc",
      } = req.body;

      const findOptions: FindAndCountOptions = {
        where: buildMatchObject(req.body),
        order: [[sortField, sortDirection.toUpperCase()]],
        offset: Number(page) * Number(pageSize),
        limit: Number(pageSize),
      };

      try {
        const rowCountPromise = Papers.count(findOptions);
        const rowsPromise = Papers.findAll({
          ...findOptions,
          attributes: [
            ["corpusid", "id"],
            "title",
            "year",
            "venue",
            "authors",
            ["citationcount", "citation"],
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
    getAllPapers: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      try {
        const data = await Papers.findAll();
        return data;
      } catch (error) {
        return error;
      }
    },
    getS2FieldsOfStudy: async (req: Request<QueryFilters>, res: Response) => {
      const {
        yearStart,
        yearEnd,
        citationsMin,
        citationsMax,
        authorIds,
        venueIds,
        accessType,
        typesOfPaper,
        fieldsOfStudy,
      } = req.body;
      const query = `
      
        SELECT category, COUNT(*) AS category_count
        FROM (
          SELECT unnest(s2Fieldsofstudy) ->> 'category' AS category
          FROM public.papers
          WHERE s2Fieldsofstudy IS NOT NULL
          ${yearStart !== "" ? `AND year >= ${Number(yearStart)}` : ""}
          ${yearEnd !== "" ? `AND year <= ${Number(yearEnd)}` : ""}
          ${
            citationsMin !== ""
              ? `AND citationcount >= ${Number(citationsMin)}`
              : ""
          }
          ${
            citationsMax !== ""
              ? `AND citationcount <= ${Number(citationsMax)}`
              : ""
          }
        ) AS derived_table
        WHERE category IS NOT NULL
        GROUP BY category
        ORDER BY category_count DESC
        LIMIT 5`;
      `;
      // const query = `;
      //   SELECT category, COUNT(*) AS category_count
      //   FROM (
      //     SELECT unnest(s2Fieldsofstudy) ->> 'category' AS category
      //     FROM public.papers
      //     WHERE s2Fieldsofstudy IS NOT NULL

      //   ) AS derived_table
      //   WHERE category IS NOT NULL
      //   GROUP BY category
      //   ORDER BY category_count DESC
      //   LIMIT 5;
      // `;

      try {
        const results = await sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT,
        });
        console.log("results", results);
        return results;
      } catch (error) {
        console.error("Error executing query:", error);
        throw error;
      }
    },
  };
};
