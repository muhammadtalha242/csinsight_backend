import { Request, Response } from 'express';
import sequelize, { FindAndCountOptions, FindOptions } from 'sequelize';
import { PagedParameters, QueryFilters, TopKParameters } from '../interfaces/types';
import { buildMatchObject, buildSortObject, fixYearData, quartilePosition } from '../utils/queryUtil';


export default () => {
  const models = require('../db/models');
  const { paper: Papers, author: Author } = models;

  return {
    getAuthorsYears: async (req: Request<{}, {}, {}, QueryFilters>, res: Response) => {
      try {
        const data = await Papers.findAll({
          attributes: [
            'yearPublished',
            [sequelize.fn('COUNT', sequelize.col('authorIds')), 'count'],
          ],
          where: buildMatchObject(req.query),
          group: ['yearPublished'],
          order: [['yearPublished', 'ASC']],
          raw: true,
        });

        // let data: DatapointsOverTime = timeData[0] || { years: [], counts: [] };
        // fixYearData(data, req.query.yearStart, req.query.yearEnd);
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
          message: 'The request is missing the required parameter "page", "pageSize".',
        });
      } else {
        const authorId = "62bf285db8ab9b1341da1673"
        try {
          const test = await Author.findAll({
            distinct: true,
            include: [{
              model: Papers,
              on: sequelize.literal(`author.id = ANY("papers"."authorIds")`),

            }],
            limit: pageSize,
            // group: ['author.id'],
          })
          console.log("TEST: ", test);
        
          // const test = await Author.findAll({
          //   include: {
          //     model: Papers,
          //     where: {
          //       authorIds: {
          //         [sequelize.Op.overlap]: sequelize.literal('ARRAY[author.id]'),
          //       },
          //     },
          //   },
          // })
          
          // const rowCountPromise = await Papers.findAndCountAll({
          //   distinct: true,
          //   // where: matchObject,
          //   include: [
          //     {
          //       model: Author,
          //       attributes: [],
          //       on: sequelize.literal(`author.id = ANY("paper"."authorIds")`),
          //       where: {
          //         id: authorId,
          //       },
          //     },
          //   ],
          // });
          // console.log("rowCountPromise: ", rowCountPromise);



          // const rowsPromise = Papers.findAll({
          //   where: matchObject,
          //   include: [
          //     {
          //       model: Author,
          //       attributes: [],
          //     },
          //   ],
          //   attributes: [
          //     'authors',
          //     [sequelize.fn('COUNT', sequelize.col('*')), 'papersCount'],
          //     [sequelize.fn('SUM', sequelize.col('inCitationsCounts')), 'inCitationsCounts'],
          //     [sequelize.fn('MIN', sequelize.col('yearPublished')), 'yearPublishedFirst'],
          //     [sequelize.fn('MAX', sequelize.col('yearPublished')), 'yearPublishedLast'],
          //   ],
          //   group: ['authors'],
          //   // order: buildSortObject(req.query.sortField, req.query.sortDirection),
          //   offset: pageSize * (page - 1),
          //   limit: pageSize,
          // });

          // const [rows, rowCount] = await Promise.all([rowsPromise, rowCountPromise]);

          // const data = {
          //   totalAuthors: rowCount.count,
          //   authors: rows.map((row: any) => ({
          //     authorId: row.authors,
          //     papersCount: row.dataValues.papersCount,
          //     inCitationsCounts: row.dataValues.inCitationsCounts,
          //     yearPublishedFirst: row.dataValues.yearPublishedFirst,
          //     yearPublishedLast: row.dataValues.yearPublishedLast,
          //   })),
          // };
          res.json({ test });
        }
        catch (error: any) {
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

