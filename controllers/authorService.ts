// import express from 'express';
// import { Op } from 'sequelize';
// import {
//   DatapointsOverTime,
//   Metric,
//   PagedParameters,
//   QueryFilters,
//   TopKParameters,
// } from '../../../types';
// import {
//   buildMatchObject,
//   buildSortObject,
//   computeQuartiles,
//   fixYearData,
// } from './queryUtils';
// import { NA_GROUPS } from '../../../config/consts';

// import { Paper } from '../../models/Paper'; // Assuming you have a Paper model defined
// import { Author } from '../../models/Author'; // Assuming you have an Author model defined

// const passport = require('passport');

// export function initialize(router: express.Router, options: APIOptions) {
//   // authors endpoint
//   const route = `${options.server.baseRoute}/fe/authors`;

//   router.get(
//     route + '/years',
//     passport.authenticate('user', { session: false }),
//     async (req: express.Request<{}, {}, {}, QueryFilters>, res: express.Response) => {
//       const key = '__express__' + req.originalUrl;
//       if (appCache.has(key)) {
//         res.json(appCache.get(key));
//       } else {
//         try {
//           const timeData = await Paper.findAll({
//             attributes: [
//               'yearPublished',
//               [Sequelize.fn('COUNT', Sequelize.col('authorIds')), 'count'],
//             ],
//             where: buildMatchObject(req.query),
//             group: ['yearPublished'],
//             order: [['yearPublished', 'ASC']],
//             raw: true,
//           });

//           let data: DatapointsOverTime = timeData[0] || { years: [], counts: [] };
//           fixYearData(data, req.query.yearStart, req.query.yearEnd);
//           appCache.set(key, data);
//           res.json(data);
//         } catch (error: any) {
//           res.status(500).json({ message: error.message });
//         }
//       }
//     }
//   );

//   router.get(
//     route + '/info',
//     passport.authenticate('user', { session: false }),
//     async (
//       req: express.Request<{}, {}, {}, QueryFilters & PagedParameters>,
//       res: express.Response
//     ) => {
//       const key = '__express__' + req.originalUrl;
//       if (appCache.has(key)) {
//         res.json(appCache.get(key));
//       } else {
//         const matchObject = buildMatchObject(req.query);
//         const pageSize = parseInt(req.query.pageSize);
//         const page = parseInt(req.query.page);
//         if ((page != 0 && !page) || !pageSize) {
//           res.status(422).json({
//             message: 'The request is missing the required parameter "page", "pageSize".',
//           });
//         } else {
//           try {
//             const rowCountPromise = Paper.findAndCountAll({
//               distinct: true,
//               where: matchObject,
//               include: [
//                 {
//                   model: Author,
//                   attributes: [],
//                 },
//               ],
//             });

//             const rowsPromise = Paper.findAll({
//               where: matchObject,
//               include: [
//                 {
//                   model: Author,
//                   attributes: [],
//                 },
//               ],
//               attributes: [
//                 'authors',
//                 [Sequelize.fn('COUNT', Sequelize.col('*')), 'papersCount'],
//                 [Sequelize.fn('SUM', Sequelize.col('inCitationsCount')), 'inCitationsCount'],
//                 [Sequelize.fn('MIN', Sequelize.col('yearPublished')), 'yearPublishedFirst'],
//                 [Sequelize.fn('MAX', Sequelize.col('yearPublished')), 'yearPublishedLast'],
//               ],
//               group: ['authors'],
//               order: buildSortObject(req.query),
//               offset: pageSize * (page - 1),
//               limit: pageSize,
//             });

//             const [rows, rowCount] = await Promise.all([rowsPromise, rowCountPromise]);

//             const data = {
//               totalAuthors: rowCount.count,
//               authors: rows.map((row: any) => ({
//                 authorId: row.authors,
//                 papersCount: row.dataValues.papersCount,
//                 inCitationsCount: row.dataValues.inCitationsCount,
//                 yearPublishedFirst: row.dataValues.yearPublishedFirst,
//                 yearPublishedLast: row.dataValues.yearPublishedLast,
//               })),
//             };

//             appCache.set(key, data);
//             res.json(data);
//           } catch (error: any) {
//             res.status(500).json({ message: error.message });
//           }
//         }
//       }
//     }
//   );

//   router.get(
//     route + '/quartiles',
//     passport.authenticate('user', { session: false }),
//     async (req: express.Request<{}, {}, {}, QueryFilters & Metric>, res: express.Response) => {
//       const key = '__express__' + req.originalUrl;
//       if (appCache.has(key)) {
//         res.json(appCache.get(key));
//       } else {
//         const matchObject = buildMatchObject(req.query);
//         const metric = req.query.metric;
//         if (!metric) {
//           res.status(422).json({
//             message: 'The request is missing the required parameter "metric".',
//           });
//         } else {
//           try {
//             const quartiles = await Paper.findAll({
//               attributes: [
//                 'yearPublished',
//                 [Sequelize.fn('COUNT', Sequelize.col('authorIds')), 'count'],
//               ],
//               where: matchObject,
//               group: ['yearPublished'],
//               order: [['yearPublished', 'ASC']],
//               raw: true,
//             });

//             const data = computeQuartiles(quartiles, metric);
//             appCache.set(key, data);
//             res.json(data);
//           } catch (error: any) {
//             res.status(500).json({ message: error.message });
//           }
//         }
//       }
//     }
//   );

//   router.get(
//     route + '/topk',
//     passport.authenticate('user', { session: false }),
//     async (
//       req: express.Request<{}, {}, {}, QueryFilters & TopKParameters>,
//       res: express.Response
//     ) => {
//       const key = '__express__' + req.originalUrl;
//       if (appCache.has(key)) {
//         res.json(appCache.get(key));
//       } else {
//         const matchObject = buildMatchObject(req.query);
//         const k = req.query.k;
//         if (!k) {
//           res.status(422).json({
//             message: 'The request is missing the required parameter "k".',
//           });
//         } else {
//           try {
//             const topK = await Paper.findAll({
//               attributes: [
//                 'authors',
//                 [Sequelize.fn('COUNT', Sequelize.col('*')), 'papersCount'],
//               ],
//               where: matchObject,
//               group: ['authors'],
//               order: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'DESC']],
//               limit: k,
//               raw: true,
//             });

//             const data = {
//               topAuthors: topK.map((row: any) => ({
//                 authorId: row.authors,
//                 papersCount: row.papersCount,
//               })),
//             };

//             appCache.set(key, data);
//             res.json(data);
//           } catch (error: any) {
//             res.status(500).json({ message: error.message });
//           }
//         }
//       }
//     }
//   );

//   router.get(
//     route + '/list',
//     passport.authenticate('user', { session: false }),
//     async (
//       req: express.Request<{}, {}, {}, QueryFilters & PagedParameters>,
//       res: express.Response
//     ) => {
//       const key = '__express__' + req.originalUrl;
//       if (appCache.has(key)) {
//         res.json(appCache.get(key));
//       } else {
//         const matchObject = buildMatchObject(req.query);
//         const pageSize = parseInt(req.query.pageSize);
//         const page = parseInt(req.query.page);
//         if ((page != 0 && !page) || !pageSize) {
//           res.status(422).json({
//             message: 'The request is missing the required parameter "page", "pageSize".',
//           });
//         } else {
//           try {
//             const authors = await Author.findAll({
//               where: matchObject,
//               attributes: ['authorId'],
//               order: buildSortObject(req.query),
//               offset: pageSize * (page - 1),
//               limit: pageSize,
//               raw: true,
//             });

//             const data = {
//               authors: authors.map((row: any) => row.authorId),
//             };

//             appCache.set(key, data);
//             res.json(data);
//           } catch (error: any) {
//             res.status(500).json({ message: error.message });
//           }
//         }
//       }
//     }
//   );
// }
