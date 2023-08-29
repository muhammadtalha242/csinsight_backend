import { Request, Response } from 'express';
import sequelize, { FindAndCountOptions, FindOptions } from 'sequelize';
import { PagedParameters, QueryFilters, TopKParameters } from '../interfaces/types';
import { buildMatchObject, fixYearData, quartilePosition } from '../utils/queryUtil';
import * as fs from 'fs';
import { decompressFile, readAndLoadFile, splitArrayIntoSubArrays } from '../utils/fileReader';
import axios from 'axios';
import { downloadFile } from '../utils/fileDownload';
import { Sequelize, sequelize as sequelizeDB } from '../db/models';


export default () => {
  const models = require('../db/models');
  const { paper: Papers, PaperAuthor, authorTable: Author } = models;
  require('dotenv').config();
  return {
    addPapers: async (req: Request<{}, {}, {}, QueryFilters>, res: Response) => {
      const { SECRET_KEY } = process.env;
      //ERRORS
      //DUPLICATE corpus ID 259212440, 39540493 259088906
      //Key (authorId)=(2224708782) is not present in table "authorTable".'
      // ConnectionAcquireTimeoutError [SequelizeConnectionAcquireTimeoutError]: Operation timeout

      try {
        const PapersAuthorsArray = [];
        let i = 0
        //1. Get File URLs
        const url = "https://api.semanticscholar.org/datasets/v1/release/latest/dataset/papers"
        const response = await axios.get(url, { headers: { 'x-api-key': SECRET_KEY } })
        const fileUrls = response.data.files
        //2. Download Files
        const filesDownloaded = []
        for (let index = 0; index < fileUrls.length; index++) {
          const url = fileUrls[index];
          const destinationPath = `./data/downloads/papers/Papers-${index}.gz`; // Replace with the desired destination path
          filesDownloaded.push(await downloadFile(url, destinationPath))
        }
        // console.log('Files downloaded successfully.');
        //3.Read files and upload them in db

        // Drop the foreign key constraints
        await sequelizeDB.query('ALTER TABLE "PaperAuthor" DROP CONSTRAINT IF EXISTS "PaperAuthor_authorId_fkey"', { raw: true });
        await sequelizeDB.query('ALTER TABLE "PaperAuthor" DROP CONSTRAINT IF EXISTS "PaperAuthor_paperId_fkey"', { raw: true });

        for (let index = 0; index < filesDownloaded.length; index++) {
          const filePath = filesDownloaded[index];
          const folderPath = './data/papers';

          const decompressedFilePath = await decompressFile(filePath, folderPath)
          const readStream = fs.createReadStream(decompressedFilePath, { encoding: 'utf-8' });
          let jsonData = '';
          let buffer = ""
          readStream.on('data', async (chunk) => {
            buffer += chunk
            jsonData = JSON.parse(JSON.stringify(buffer.toString()));
            let paper_author = [];
            try {
              const lines = jsonData.split("\n");
              buffer = lines.pop();
              const t = lines.map((l) => {
                paper_author = []

                const parsed = JSON.parse(l)
                const paperAuthors = parsed.authors;
                if (paperAuthors.length > 0) {
                  paperAuthors.forEach(auth => {
                    paper_author.push({ paperId: parsed.corpusid, authorId: auth.authorId })
                  });
                } else {
                  paper_author.push({ paperId: parsed.corpusid, authorId: null })
                }
                return parsed
              })
              Papers.bulkCreate(t).then((val) => {
                PaperAuthor.bulkCreate(paper_author, {
                  validate: false,
                  ignoreDuplicates: true,
                }).then((val) => {
                })
              }).catch((error) => {
                res.json({ message: error.message })
              });

            } catch (error) {
              res.json({ message: error.message })

            }
          });

          readStream.on('end', () => { });

          readStream.on('error', (error) => {
            res.json({ message: error.message })
          });
        }
        // Recreate the dropped foreign key constraints
        await sequelizeDB.query('ALTER TABLE "PaperAuthor" ADD CONSTRAINT "PaperAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Authors" ("id") ON DELETE CASCADE', { raw: true });
        await sequelizeDB.query('ALTER TABLE "PaperAuthor" ADD CONSTRAINT "PaperAuthor_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Papers" ("id") ON DELETE CASCADE', { raw: true });

        res.json({ message: "Data uploaded successfully." })

      } catch (error) {
        res.json({ message: error.message })
      }
    },
    getPapers: async (req: Request<{}, {}, {}, QueryFilters>, res: Response) => {
      const matchObject = buildMatchObject(req.query)
      const data = await Papers.findAll({
        distinct: true,
        include: Author,
        limit: 500,
        // where: matchObject,
        // attributes: [
        //   'yearPublished',
        //   [sequelize.fn('COUNT', '*'), 'count'],
        // ],
        // group: ['yearPublished'],
        // order: [['yearPublished', 'ASC']],
        // raw: true,
      });

      return data;
    },
    getPaperInfo: async (req: Request<{}, {}, {}, QueryFilters & PagedParameters>, res: Response) => {

      const { page = 0, pageSize = 10, sortField = 'yearPublished', sortDirection = 'asc' } = req.query;

      const findOptions: FindAndCountOptions = {
        where: buildMatchObject(req.query),
        order: [[sortField, sortDirection.toUpperCase()]],
        offset: Number(page) * Number(pageSize),
        limit: Number(pageSize),
      }

      try {
        const rowCountPromise = Papers.count(findOptions);
        const rowsPromise = Papers.findAll(findOptions);
        const [rowCount, rows] = await Promise.all([rowCountPromise, rowsPromise]);

        const data = {
          rowCount,
          rows,
        };

        res.json(data);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }

    }, getPaperTopk: async (
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
            order: [['inCitationsCounts', 'DESC']],
            limit: k,
            attributes: ['title', 'inCitationsCounts'],
          };

          const data = await Papers.findAll(findOptions);
          res.json(data);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
      }
    }, getPaperQuartiles: async (req: Request<{}, {}, {}, QueryFilters>, res: Response) => {

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
              attributes: ['inCitationsCounts'],
              order: [['inCitationsCounts', 'ASC']],
              offset: quartile,
              limit: 1,
            })
          );

          const quartileData = await Promise.all(quartileDataPromises);
          data = quartileData.map((quart) => quart[0]?.inCitationsCounts || 0
          );
        }

        res.json(data);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
  }

}

