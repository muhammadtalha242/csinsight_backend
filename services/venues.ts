import axios from "axios";
import { Request, Response } from "express";
import { col, FindAndCountOptions, FindOptions, fn, Op } from "sequelize";
import { downloadFile } from "../utils/fileDownload";
import {
  decompressFile,
  readAndLoadFile,
  splitArrayIntoSubArrays,
} from "../utils/fileReader";
import { PagedParameters, QueryFilters } from "../interfaces/types";
import { Sequelize } from "../db/models";
import { buildMatchObject } from "../utils/queryUtil";

export default () => {
  const models = require("../db/models");
  const { venue: Venue, paper: Papers, sequelize } = models;
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
    getVenuesInfo: async (
      req: Request<QueryFilters & PagedParameters>,
      res: Response
    ) => {
      const {
        page = 0,
        pageSize = 10,
        sortField = "id",
        sortDirection = "asc",
      } = req.body;

      const findOptions: FindAndCountOptions = {
        // where: buildMatchObject(req.body),
        order: [[sortField, sortDirection.toUpperCase()]],
        offset: Number(page) * Number(pageSize),
        limit: Number(pageSize),
      };

      if ((page != 0 && !page) || !pageSize) {
        res.status(422).json({
          message:
            'The request is missing the required parameter "page", "pageSize".',
        });
      } else {
        try {
          const rowCountPromise = Venue.count(findOptions);
          const rowsPromise = Venue.findAll({
            ...findOptions,
            attributes: [
              "id",
              "name",
              ["alternate_names", "alternativeNames"],
              "type",
              ["url", "link"],
            ],
          });
          const [rowCount, rows] = await Promise.all([
            rowCountPromise,
            rowsPromise,
          ]);

          const data = {
            rowCount,
            rows,
          };

          res.json(data);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
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

    getTopVenues: async (req: Request<QueryFilters>, res: Response) => {
      try {
        // Optional: Extract query parameters for dynamic filtering
        const { topN } = req.query;
        const limit = topN ? parseInt(topN as string, 10) : 10; // Default to top 10
        const matchObject = buildMatchObject(req.body);
        const findOptions: FindOptions = {
          attributes: [
            [Sequelize.fn("count", Sequelize.col("*")), "publicationCount"],
            "venue",
          ],
          where: { ...matchObject, venue: { [Op.not]: [""] } },
          group: ["publicationvenueid", "venue"],
          order: [["publicationCount", "DESC"]],
          limit,
          raw: true,
        };
        const topVenues: { venue: string; publicationCount: string }[] =
          await Papers.findAll(findOptions);

        const data = topVenues.map((venue) => {
          return {
            venue: venue.venue,
            publicationCount: parseInt(venue.publicationCount),
          };
        });

        return data;
      } catch (error) {
        console.error("Error fetching top venues:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    },

    getVenueImpactAnalysis: async (
      req: Request<QueryFilters>,
      res: Response
    ) => {
      try {
        const limit = 10; // You can adjust this as needed
        interface VenueImpact {
          venue: string;
          averageCitations: number;
        }
        const matchObject = buildMatchObject(req.body);
        console.log("🚀 ~ matchObject:", matchObject)
        const findOptions: FindOptions = {
          attributes: [
            "venue",
            [fn("AVG", col("citationcount")), "averageCitations"],
          ],
          where: {
            ...matchObject,
            publicationvenueid: { [Op.ne]: null },
            venue: { [Op.not]: [""] },
          },
          group: ["publicationvenueid", "venue"],
          order: [["averageCitations", "DESC"]],
          limit,
          raw: true,
        };

        const venueImpactRaw = await Papers.findAll(findOptions);

        // Map the raw results to the desired format with averageCitations as number
        const venueImpact: VenueImpact[] = venueImpactRaw.map(
          (record: any) => ({
            venue: record.venue,
            averageCitations: parseFloat(record.averageCitations),
          })
        );

        return venueImpact;
      } catch (error) {
        console.error("Error fetching venue impact analysis:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    },
    getFieldsOfStudyDistribution: async (
      req: Request<QueryFilters>,
      res: Response
    ) => {
      const matchObject = buildMatchObject(req.body);

      const query = `
        SELECT 
            p.publicationvenueid,
            p.venue,
            unnest(p.s2fieldsofstudy) AS fieldOfStudy, 
            COUNT(*) AS publicationCount
        FROM 
            papers p
        WHERE 
            p.publicationvenueid IS NOT NULL
            AND p.s2fieldsofstudy IS NOT NULL
            AND array_length(p.s2fieldsofstudy, 1) > 0
        GROUP BY 
            p.publicationvenueid,
            p.venue,
            unnest(p.s2fieldsofstudy)
        ORDER BY  
            publicationCount DESC
        LIMIT 10;
      `;
      try {
        const results = await sequelize.query(query, {
          type: Sequelize.QueryTypes.SELECT,
        });
        return results;
      } catch (error) {
        console.error("Error executing query:", error);
        throw error;
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
