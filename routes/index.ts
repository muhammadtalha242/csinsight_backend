import express, { Request, Response } from "express";

import paper from "../controllers/paper";
import author from "../controllers/author";
import venue from "../controllers/venue";

export const getRoutes = () => {
  const router = express.Router();

  /** controllers */
  const paperController = paper();
  const authorController = author();
  const venueController = venue();

  //Paper Routes
  router.get("/papers", paperController.getAllPapers);
  router.get("/papers/years", paperController.getPapers);
  router.post("/papers/years", paperController.getPapersPost);
  router.post("/papers/info", paperController.getPapersInfo);
  router.get("/papers/topk", paperController.getPapersTopk);
  router.get("/papers/addPapers", paperController.addPapers);
  router.get("/papers/quartiles", paperController.getPapersQuartiles);
  router.post("/papers/s2f", paperController.getS2FieldsOfStudy);

  //Author Routes
  router.get("/authors/years", authorController.getAuthorsYear);
  router.get("/authors/info", authorController.getAuthorsInfo);
  router.get("/authors/topk", authorController.getPapersTopk);
  router.get("/authors/quartiles", authorController.getPapersQuartiles);
  router.get("/authors/addAuthors", authorController.addAuthors);

  // Venue Routes
  router.get("/venues", venueController.getVenues);
  router.get("/venues/addVenues", venueController.addVenues);
  router.get("/venues/:id", venueController.getVenueById);
  router.post("/venues", venueController.createVenue);

  //Search
  // router.get('/search/authors', authorController.searchAuthorByName);
  router.get("/autocomplete/authors", authorController.searchAuthorByName);
  router.get("/autocomplete/venues", venueController.searchVenueByName);

  return router;
};
