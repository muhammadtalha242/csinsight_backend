import { Request, Response } from "express";
import venue from "../services/venues";
import { PagedParameters, QueryFilters } from "../interfaces/types";
import redisClient from "../redis";

export default () => {
  const venueService = venue();
  return {
    searchVenueByName: async (req: Request, res: Response) => {
      const data = await venueService.searchVenueByName(req, res);
      res.json(data);
    },
    createVenue: async (req: Request, res: Response) => {
      const data = await venueService.createVenue(req, res);
      res.json(data);
    },
    getVenues: async (req: Request, res: Response) => {
      const data = await venueService.getVenues(req, res);
      res.json(data);
    },
    getVenuesInfo: async (
      req: Request<QueryFilters & PagedParameters>,
      res: Response
    ) => {
      const data = await venueService.getVenuesInfo(req, res);
      res.json(data);
    },
    getVenueById: async (req: Request, res: Response) => {
      const data = await venueService.getVenueById(req, res);
      res.json(data);
    },
    getTopVenues: async (req: Request<QueryFilters>, res: Response) => {
      const cacheKey = `getTopVenues-${JSON.stringify(req.body)}`;
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      const data = await venueService.getTopVenues(req, res);
      await redisClient.setex(cacheKey, 8000, JSON.stringify(data));
      res.json(data);
    },
    getVenueImpactAnalysis: async (
      req: Request<QueryFilters>,
      res: Response
    ) => {
      const cacheKey = `getVenueImpactAnalysis-${JSON.stringify(req.body)}`;
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      const data = await venueService.getVenueImpactAnalysis(req, res);
      await redisClient.setex(cacheKey, 8000, JSON.stringify(data));
      res.json(data);
    },
    getFieldsOfStudyDistribution: async (
      req: Request<QueryFilters>,
      res: Response
    ) => {
      const cacheKey = `getFieldsOfStudyDistribution-${JSON.stringify(
        req.body
      )}`;
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      const data = await venueService.getFieldsOfStudyDistribution(req, res);
      await redisClient.setex(cacheKey, 8000, JSON.stringify(data));

      res.json(data);
    },
    addVenues: async (req: Request, res: Response) => {
      const data = await venueService.addVenues(req, res);
      res.json(data);
    },
  };
};
