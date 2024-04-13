import axios from "axios";
import { Request, Response } from "express";
import { downloadFile } from "../utils/fileDownload";
import {
  decompressFile,
  readAndLoadFile,
  splitArrayIntoSubArrays,
} from "../utils/fileReader";
import { QueryFilters } from "../interfaces/types";

export default () => {
  const models = require("../db/models");
  const { citations: Citations } = models;
  require("dotenv").config();
  return {
    getCitaions: async (req: Request, res: Response) => {
      try {
        const citations = await Citations.findAll();
        return res.status(200).json({ success: true, data: citations });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
    },
    addCitations: async (
      req: Request<{}, {}, {}, QueryFilters>,
      res: Response
    ) => {
      const { SECRET_KEY } = process.env;
      try {
        // 1. Get File URLs
        const url =
          "https://api.semanticscholar.org/datasets/v1/release/latest/dataset/citations";
        const response = await axios.get(url, {
          headers: { "x-api-key": SECRET_KEY },
        });
        const fileUrls = response.data.files;

        // 2. Download Files
        const downloadedFiles = [
          `./data/downloads/citations/Citations-${0}.gz`,
        ];
        // for (let i = 0; i < fileUrls.length; i++) {
        //   const fileUrl = fileUrls[i];
        //   const destinationPath = `./data/downloads/citations/Citations-${i}.gz`;
        //   const downloadedFile = await downloadFile(fileUrl, destinationPath);
        //   downloadedFiles.push(downloadedFile);
        // }
        const folderPath = "./data/citations";

        // 3. Decompress and Load Files into Database
        for (let i = 0; i < downloadedFiles.length; i++) {
          const filePath = downloadedFiles[i];
          const decompressedFilePath = await decompressFile(
            filePath,
            folderPath
          );
          const citaionsData = await readAndLoadFile(
            decompressedFilePath,
            folderPath
          );
          console.log('citaionsData', citaionsData.length)
          // const subArrays = splitArrayIntoSubArrays(citaionsData);
          // for (const arr of subArrays) {
          //   await Citations.bulkCreate(arr, {
          //     ignoreDuplicates: true,
          //   });
          // }

          //   await Citations.bulkCreate(citaionsData, { ignoreDuplicates: true });
        }

        return "Files downloaded and loaded into the database successfully.";
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to download and load files.");
      }
    },
  };
};
