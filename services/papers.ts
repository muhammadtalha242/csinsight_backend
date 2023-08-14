import { Request, Response } from 'express';
import sequelize, { FindAndCountOptions, FindOptions } from 'sequelize';
import { PagedParameters, QueryFilters, TopKParameters } from '../interfaces/types';
import { buildMatchObject, fixYearData, quartilePosition } from '../utils/queryUtil';
import * as fs from 'fs';
import { readAndLoadFile, splitArrayIntoSubArrays } from '../utils/fileReader';


export default () => {
  const models = require('../db/models');
  const { paper: Papers, PaperAuthor, authorTable: Author } = models;

  return {
    addPapers: async (req: Request<{}, {}, {}, QueryFilters>, res: Response) => {
      //Todos
      /*
        1. Get Papers.json file location
        2. load the file in database.
      */
      // const location = '/Users/abbasm1/Downloads/papers/Papers2-13-08-23'; donee
      const location = '/Users/abbasm1/Downloads/papers/Papers-13-08-23';
      //DUPLICATE corpus ID 259212440, 39540493 259088906
      // try {
      //   const jsonData = JSON.parse(fs.readFileSync(location, 'utf-8'));

      //   for (const data of jsonData) {

      //     // Assuming your JSON data has a "name" property corresponding to the Author model
      //     // await Papers.create(data);
      //     let paper_author= []; 
      //     if (data.authors.length > 0) {
      //       // authors[index].authorid = paper.authors[0].authorId
      //       data.authors.forEach(auth => {

      //         paper_author.push({ paperId: data.corpusid, authorId: auth.authorId })

      //       });

      //       // paper.authors.forEach(PA => {
      //       // })
      //     } else {
      //       paper_author.push({ paperId: data.corpusid, authorId: null })
      //     }
      //     console.log("paper_author: ", paper_author);

      //     await PaperAuthor.bulkCreate(paper_author);
      //     // Add other properties based on your JSON data and Author model
      //   }

      //   console.log('Data uploaded successfully.');
      //   res.json(jsonData)
      // } catch (error) {
      //   console.error('Error uploading data to the database:', error);
      //   res.status(500).json({ message: error.message });
      // }
      try {
        const PapersAuthorsArray = [];
        let i = 0


        const readStream = fs.createReadStream(location, { encoding: 'utf-8' });
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
            console.log("CHUNK: ", i++);
            // Papers.bulkCreate(t).then((val) => {
            //   console.log("UPLOADED: ", t.length)

            // }).catch((error) => {
            //   console.log("ERROR WHILE UPLOAD: ", error);

            // });
            await PaperAuthor.bulkCreate(paper_author);

          } catch (error) {
          }
        });

        readStream.on('end', () => {
          try {

            res.json({ message: "Data uploaded successfully." })

          } catch (error) {
          }
        });

        readStream.on('error', (error) => {
        });
        // const papersArray: any[] = await readAndLoadFile(location);
        // const subArrays = splitArrayIntoSubArrays(papersArray)
        // for (const paper of subArrays) {
        //   await Papers.bulkCreate(paper);
        // }
      } catch (error) {
        console.log("HERE");

        res.json({ message: error.message })
      }
    },
    getPapers: async (req: Request<{}, {}, {}, QueryFilters>, res: Response) => {
      const matchObject = buildMatchObject(req.query)
      // console.log("matchObject: ", matchObject);
      // const test3 = await Papers.findAll({ include: Author })
      // const test4 = await Author.findAll({ include: Papers })
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

