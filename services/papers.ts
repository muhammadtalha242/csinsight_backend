import { Request, Response } from 'express';
import sequelize, { FindAndCountOptions, FindOptions } from 'sequelize';
import { PagedParameters, QueryFilters, TopKParameters } from '../interfaces/types';
import { buildMatchObject, fixYearData, quartilePosition,buildMatchObjectSemanticScholar } from '../utils/queryUtil';


export default () => {
  const models = require('../db/models');
  console.log("modeles: ", models)
  const { paper: Papers, PaperAuthor, authorTable: Author } = models;

  return {
    addPaper: async () => {
      // const _paper = { "corpusid": 224735017, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "952784131", "CorpusId": "224735017", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/97abd35eb7d004e70a58652f2fa762620ad0ea73", "title": "当“商业模式”嫁接“职业规划”", "authors": [{ "authorId": "82841146", "name": "杨吉" }], "venue": "", "publicationvenueid": null, "year": 2012, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "96-96", "volume": "" }, "updated": "2022-01-27T01:47:09.787Z" };
      // const uploadedPaper = await Papers.create({ id: "test2", authorIds: ["82841146"] })
      const test = await Author.findAll()
      const test2 = await Papers.findAll()
      const test3 = await Papers.findAll({ include: Author })
      const test4 = await Author.findAll({ include: Papers })
      console.log("test: ", test, test2, test3, test4)
      return { test, test2, test3, test4 }
    },
    getPapers: async (req: Request<{}, {}, {}, QueryFilters>, res: Response) => {
      const matchObject = buildMatchObjectSemanticScholar(req.query)
      console.log("matchObject: ", matchObject);

      const data = await Papers.findAll({
        where: matchObject,
        attributes: [
          'year',
          [sequelize.fn('COUNT', '*'), 'count'],
        ],
        group: ['year'],
        order: [['year', 'ASC']],
        raw: true,
      });

      // console.log("data: ", data);
      // fixYearData(data, req.query.yearStart, req.query.yearEnd);
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

