import express, { Request, Response } from 'express';

import paper from '../controllers/paper';

export const getRoutes = () => {
  const router = express.Router();

  /** controllers */
  const paperController = paper();


  router.get('/papers/years', paperController.getPapers);
  router.get('/papers/info', paperController.getPapersInfo);
  router.get('/papers/topk', paperController.getPapersTopk);
  router.get('/papers/quartiles', paperController.getPapersQuartiles);



  return router;
};
