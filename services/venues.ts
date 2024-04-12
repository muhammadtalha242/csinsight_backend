import axios from "axios";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { downloadFile } from "../utils/fileDownload";
import {
  decompressFile,
  readAndLoadFile,
  splitArrayIntoSubArrays,
} from "../utils/fileReader";
import { QueryFilters } from "../interfaces/types";

export default () => {
  const models = require("../db/models");
  const { Venue } = models;
  require("dotenv").config();
  return {
    searchVenueByName: async (req: Request, res: Response) => {
      try {
        const { q: name } = req.query;
        const venues = await Venue.findAll({
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          limit: 10,
          attributes: ["id", ["name", "value"]],
        });
        return venues;
        // res.status(200).json({ success: true, data: venues });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
    },
    getVenues: async (req: Request, res: Response) => {
      try {
        const venues = await Venue.findAll();
        return res.status(200).json({ success: true, data: venues });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
    },
    getVenueById: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const venue = await Venue.findByPk(id);
        if (!venue) {
          return res
            .status(404)
            .json({ success: false, error: "Venue not found" });
        }
        return res.status(200).json({ success: true, data: venue });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
    },
    createVenue: async (req: Request, res: Response) => {
      try {
        const {
          name,
          alternate_issns,
          alternate_names,
          alternate_urls,
          issn,
          type,
          url,
        } = req.body;
        const venue = await Venue.create({
          name,
          alternate_issns,
          alternate_names,
          alternate_urls,
          issn,
          type,
          url,
        });
        return res.status(201).json({ success: true, data: venue });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
    },
    updateVenue: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const {
          name,
          alternate_issns,
          alternate_names,
          alternate_urls,
          issn,
          type,
          url,
        } = req.body;
        const venue = await Venue.findByPk(id);
        if (!venue) {
          return res
            .status(404)
            .json({ success: false, error: "Venue not found" });
        }
        await venue.update({
          name,
          alternate_issns,
          alternate_names,
          alternate_urls,
          issn,
          type,
          url,
        });
        return res.status(200).json({ success: true, data: venue });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
    },
    deleteVenue: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const venue = await Venue.findByPk(id);
        if (!venue) {
          return res
            .status(404)
            .json({ success: false, error: "Venue not found" });
        }
        await venue.destroy();
        return res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
    },

    addVenues: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      const { SECRET_KEY } = process.env;
      try {
        // 1. Get File URLs
        const url =
          "https://api.semanticscholar.org/datasets/v1/release/latest/dataset/publication-venues";
        const response = await axios.get(url, {
          headers: { "x-api-key": SECRET_KEY },
        });
        const fileUrls = response.data.files;

        // 2. Download Files
        const downloadedFiles = [];
        for (let i = 0; i < fileUrls.length; i++) {
          const fileUrl = fileUrls[i];
          const destinationPath = `./data/downloads/venues/Venue-${i}.gz`;
          const downloadedFile = await downloadFile(fileUrl, destinationPath);
          downloadedFiles.push(downloadedFile);
        }
        const folderPath = "./data/venues";

        // 3. Decompress and Load Files into Database
        for (let i = 0; i < downloadedFiles.length; i++) {
          const filePath = downloadedFiles[i];
          const decompressedFilePath = await decompressFile(
            filePath,
            folderPath
          );
          console.log("Decompressed File Path: ", decompressedFilePath);
          const venuesData = await readAndLoadFile(
            decompressedFilePath,
            folderPath
          );

          await Venue.bulkCreate(venuesData, { ignoreDuplicates: true });
        }

        return "Files downloaded and loaded into the database successfully.";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to download and load files.");
      }
    },
    addVenuesX: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      const { SECRET_KEY } = process.env;
      try {
        //1. Get File URLs
        const url =
          "https://api.semanticscholar.org/datasets/v1/release/latest/dataset/publication-venues";
        const response = await axios.get(url, {
          headers: { "x-api-key": SECRET_KEY },
        });
        const fileUrls = response.data.files;
        //2. Download Files
        const filesDownloaded = [];
        for (let index = 0; index < fileUrls.length; index++) {
          const url = fileUrls[index];
          const destinationPath = `./data/downloads/venues/Venue-${index}.gz`; // Replace with the desired destination path
          filesDownloaded.push(await downloadFile(url, destinationPath));
        }
        //3.Read files and upload them in db
        for (let index = 0; index < filesDownloaded.length; index++) {
          const filePath = filesDownloaded[index];
          const authorsArray: any[] = await readAndLoadFile(
            filePath,
            "./data/venues"
          );
          const subArrays = splitArrayIntoSubArrays(authorsArray);
          for (const author of subArrays) {
            const authorArr = author.filter((auth) => auth.authorid !== null);
            await Venue.bulkCreate(authorArr, {
              ignoreDuplicates: true,
            });
          }
        }
        res.json({ message: "Data uploaded successfully." });
      } catch (error) {
        res.json({ message: error.message });
      }
    },
  };
};
