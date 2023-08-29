import axios from 'axios';
import fs from 'fs';

export async function downloadFile(url: string, destinationPath: string): Promise<string> {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(destinationPath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(destinationPath));
      writer.on('error', (error) => reject(error.message));
    });
  } catch (error) {
    throw new Error(`Error downloading file: ${error.message}`);
  }
}

