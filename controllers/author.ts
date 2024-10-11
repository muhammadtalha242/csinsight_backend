import { Request, Response } from "express";
import authors from "../services/authors";
import {
  PagedParameters,
  QueryFilters,
  TopKParameters,
} from "../interfaces/types";
import redisClient from "../redis";

export default () => {
  const authorService = authors();
  return {
    searchAuthorByName: async (req: Request, res: Response) => {
      const data = await authorService.searchAuthorByName(req, res);
      res.json(data);
    },
    getAuthorsYear: async (req: Request, res: Response) => {
      const data = await authorService.getAuthorsYears(req, res);
      res.json(data);
    },
    getAuthorsInfo: async (
      req: Request<QueryFilters & PagedParameters>,
      res: Response
    ) => {
      const data = await authorService.getAuthorsInfo(req, res);
      res.json(data);
    },
    getPapersTopk: async (
      req: Request<{}, {}, {}, QueryFilters & TopKParameters>,
      res: Response
    ) => {
      const data = await authorService.getPaperTopk(req, res);
      res.json(data);
    },
    getPapersQuartiles: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      const data = await authorService.getPaperQuartiles(req, res);
      res.json(data);
    },
    getPublicationsCitationsCorrelation: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      const cacheKey = `getPublicationsCitationsCorrelation-${JSON.stringify(req.body)}`;
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      const data = await authorService.getPublicationsCitationsCorrelation(
        req,
        res
      );
      await redisClient.setex(cacheKey, 8000, JSON.stringify(data));
      res.json(data);
    },
    addAuthors: async (req: Request, res: Response) => {
      const data = await authorService.addAuthors(req, res);
      res.json(data);
    },
  };
};
