import { Request, Response } from 'express';
import sequelize, { FindAndCountOptions, FindOptions } from 'sequelize';
import { PagedParameters, QueryFilters, TopKParameters } from '../interfaces/types';
import { buildMatchObject, fixYearData, quartilePosition } from '../utils/queryUtil';


export default () => {
  const models = require('../db/models');
  const { paper: Papers } = models;

  return {
    getPapers: async (req: Request<{}, {}, {}, QueryFilters>, res: Response) => {
      const matchObject = buildMatchObject(req.query)
      console.log("matchObject: ", matchObject);

      const data = await Papers.findAll({
        where: matchObject,
        attributes: [
          'yearPublished',
          [sequelize.fn('COUNT', '*'), 'count'],
        ],
        group: ['yearPublished'],
        order: [['yearPublished', 'ASC']],
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

