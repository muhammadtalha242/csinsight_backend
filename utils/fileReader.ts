import * as fs from "fs";
import zlib from "zlib";
import path from "path";

export function splitArrayIntoSubArrays(largeArray) {
  const subArraySize = Math.ceil(largeArray.length / 50); // Calculate size of each sub-array
  const subArrays = [];

  for (let i = 0; i < largeArray.length; i += subArraySize) {
    subArrays.push(largeArray.slice(i, i + subArraySize));
  }

  return subArrays;
}

export async function readAndLoadFile(
  filePath: string,
  folderPath: string
): Promise<any[]> {
  const authorsArray = [];

  //   const decompressedFilePath = await decompressFile(filePath, folderPath);
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath, {
      encoding: "utf-8",
    });
    let jsonData = "";
    let buffer = "";
    readStream.on("data", (chunk) => {
      console.log("chunk: ", chunk);

      buffer += chunk;
      jsonData = JSON.parse(JSON.stringify(buffer.toString()));
      console.log("jsonData", jsonData);

      try {
        const lines = jsonData.split("\n");
        buffer = lines.pop();
        const t = lines.map((l) => {
          return JSON.parse(l);
        });
        authorsArray.push(...t);
      } catch (error) {
        reject(error);
      }
    });

    readStream.on("end", () => {
      try {
        resolve(authorsArray);
      } catch (error) {
        reject(error);
      }
    });

    readStream.on("error", (error) => {
      reject(error);
    });
  });
}

export async function decompressFile(
  inputFilePath: string,
  folderPath: string
): Promise<string> {
  const filePath = `${inputFilePath.split("/")[4].split(".")[0]}.txt`;
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  const outputFilePath = path.join(folderPath, filePath);
  const readStream = fs.createReadStream(inputFilePath);
  const decompressStream = zlib.createGunzip();
  const writeStream = fs.createWriteStream(outputFilePath);

  readStream.pipe(decompressStream).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      resolve(`${outputFilePath}`);
    });
    writeStream.on("error", (error) => {
      reject(`Error during decompression: ${error.message}`);
    });
  });
}
