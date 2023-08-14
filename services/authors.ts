import { Request, Response } from 'express';
import sequelize, { FindAndCountOptions, FindOptions } from 'sequelize';
import { IAuthor, PagedParameters, QueryFilters, TopKParameters } from '../interfaces/types';
import { buildMatchObject, buildSortObject, fixYearData, quartilePosition } from '../utils/queryUtil';
import { readAndLoadFile, splitArrayIntoSubArrays } from '../utils/fileReader';


export default () => {
  const models = require('../db/models');
  const { paper: Papers, authorTable: Author } = models;

  function checkValidity(data: string): boolean {
    try {
      JSON.parse(data);
      return true;
    } catch (error) {
      console.log("data: ", data)
      return false;
    }
  }
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
          const authorFull = await Author.findOne({
            where: {
              authorid: '103989795'
            },
            include: Papers

          })
          console.log("AuthorFull ", authorFull)
          const test = await Author.findAll({
            distinct: true,
            include: Papers,
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
          res.json({ authorFull, test });
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
    },
    addAuthors: async (req: Request<{}, {}, {}, QueryFilters>, res: Response) => {
      //Todos
      /*
        1. Get author.json file location
        2. load the file in database.
      */
      const locations = ['/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_0c7be395-b54d-418d-84e3-d726ebc47d15',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_5d169531-54f0-4141-9dfb-1eb36f4249b2',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_7a5897ad-07e0-40ce-9a8d-9fe00f490b88',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_27c71484-d201-4af1-9c20-2cd40efa8df5',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_034c9119-e063-4c15-a0b5-9c3d32bf9e54',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_537d5d2b-ed4f-4b6d-b986-e869e7292e9e',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_694de3ac-5ee2-4fad-b127-76306961ba5e',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_0949b56d-8d4b-4cc4-b93d-eebf52e41eb7',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_2872c7ec-e6b6-4db7-b04e-8094fb097a70',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_5303a198-d84d-41ad-9e9b-43c57235689f',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_05754ca5-7057-47fe-9c65-6bd150289b21',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_6597e7fa-e688-47b0-b555-cb974e5c6826',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_7972b07e-25d6-40c8-9552-d1029a7b62c4',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_81424ba6-4d21-48a3-a4fb-9b536977e185',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_970376a8-031b-45c5-9f8c-55bd964a100e',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_22189322-0faf-4828-a4e4-f1f2d2a684fc',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_a19e5284-3d5d-4d06-9d55-eeff8a888c38',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_aad2de8a-6d18-4ae9-b7d1-8a31db63410a',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_b8e227d3-8ec2-47a1-ade8-ebb0c414d099',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_b881010c-606d-4fa1-9513-f01e4e11ba32',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_c49b6e9b-b334-4df4-8222-6eac6bbafc4f',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_cccae198-632d-4d23-8bd4-b3facc0e3276',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_d3c28104-0214-4719-9f1e-ecd99dc30255',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_d8d0adb1-03e3-4069-8bf4-dae916fbe517',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_ddebfeca-5280-48c5-a247-b452eaca1a24',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_e2ebd4a3-b450-488f-b16e-5254025a6c9a',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_e8eb2175-631d-4478-9734-7183a571acfe',
        '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_e1506dae-307b-4eec-b7f8-7260e941bb44',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_f24b1827-8527-4c25-91e3-ddafa7127645',
        // '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_f43851df-6e57-4c4a-93e1-be9c7fcd5114'
      ];

      // const location = '/Users/abbasm1/Documents/Study/semester1/DS-Seminar/data/authors.json';
      // const location = '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_f43851df-6e57-4c4a-93e1-be9c7fcd5114';  //DONE
      // const location = '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_f24b1827-8527-4c25-91e3-ddafa7127645'; //DONE with bulkCreate
      const location = '/Users/abbasm1/Downloads/Authors/20230728_071558_00036_ikv7b_e1506dae-307b-4eec-b7f8-7260e941bb44';
      // const location = '/Users/abbasm1/Downloads/Authors/test';
      try {
        const authorsArray: any[] = await readAndLoadFile(location);
        const subArrays = splitArrayIntoSubArrays(authorsArray)
        for (const author of subArrays) {
          // const _ = JSON.parse(author)
          await Author.bulkCreate(author);
          // await Author.create(_);
        }
        res.json({ message: "Data uploaded successfully.", length: authorsArray.length, array: authorsArray.slice(0, 15) })
      } catch (error) {
        console.log("HERE");

        res.json({ message: error.message })
      }
    }
  }

}

