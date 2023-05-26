import express, { Request, Response } from 'express';

import paper from '../controllers/paper';
import author from '../controllers/author';

export const getRoutes = () => {
  const router = express.Router();

  /** controllers */
  const paperController = paper();
  const authorController = author();


  router.get('/papers/years', paperController.getPapers);
  router.get('/papers/info', paperController.getPapersInfo);
  router.get('/papers/topk', paperController.getPapersTopk);
  router.get('/papers/quartiles', paperController.getPapersQuartiles);

  router.get('/authors/years', authorController.getAuthorsYear);
  router.get('/authors/info', authorController.getAuthorsInfo);
  router.get('/authors/topk', authorController.getPapersTopk);
  router.get('/authors/quartiles', authorController.getPapersQuartiles);



  return router;
};
