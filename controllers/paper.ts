import { Request, Response } from "express";
import papers from "../services/papers";
import {
  PagedParameters,
  QueryFilters,
  TopKParameters,
} from "../interfaces/types";
import redisClient from "../redis";

export default () => {
  const paperService = papers();
  return {
    addPapers: async (req: Request, res: Response) => {
      const data = await paperService.addPapers(req, res);
      res.json(data);
    },
    getPapers: async (req: Request, res: Response) => {
      const data = await paperService.getPapers(req, res);
      res.json(data);
    },
    getAllPapers: async (req: Request, res: Response) => {
      const data = await paperService.getAllPapers(req, res);
      res.json(data);
    },
    getPapersPost: async (req: Request, res: Response) => {
      const data = await paperService.getPapersPost(req, res);
      res.json(data);
    },
    getPapersInfo: async (
      req: Request<QueryFilters & PagedParameters>,
      res: Response
    ) => {
      const data = await paperService.getPaperInfo(req, res);
      res.json(data);
    },
    getPapersTopk: async (
      req: Request<{}, {}, {}, QueryFilters & TopKParameters>,
      res: Response
    ) => {
      const data = await paperService.getPaperTopk(req, res);
      res.json(data);
    },
    getPapersQuartiles: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      const data = await paperService.getPaperQuartiles(req, res);
      res.json(data);
    },
    getS2FieldsOfStudy: async (req: Request, res: Response) => {
      const cacheKey = `s2fieldsOfStudy-${JSON.stringify(req.body)}`;
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      const data = await paperService.getS2FieldsOfStudy(req, res);
      await redisClient.setex(cacheKey, 8000, JSON.stringify(data));

      res.json(data);
    },
  };
};
