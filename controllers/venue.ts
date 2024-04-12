import { Request, Response } from "express";
import venue from "../services/venues";

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
    getVenueById: async (req: Request, res: Response) => {
      const data = await venueService.getVenueById(req, res);
      res.json(data);
    },
    addVenues: async (req: Request, res: Response) => {
      const data = await venueService.addVenues(req, res);
      res.json(data);
    },
  };
};
