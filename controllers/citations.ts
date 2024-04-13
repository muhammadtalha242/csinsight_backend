import { Request, Response } from "express";
import citations from "../services/citations";

export default () => {
  const citationService = citations();
  return {
    addCitations: async (req: Request, res: Response) => {
      const data = await citationService.addCitations(req, res);
      res.json(data);
    },
    getCitations: async (req: Request, res: Response) => {
      const data = await citationService.getCitaions(req, res);
      res.json(data);
    },
  };
};
