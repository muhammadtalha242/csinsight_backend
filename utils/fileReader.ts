import * as fs from 'fs';

export function splitArrayIntoSubArrays(largeArray) {
    const subArraySize = Math.ceil(largeArray.length / 50); // Calculate size of each sub-array
    const subArrays = [];

    for (let i = 0; i < largeArray.length; i += subArraySize) {
        subArrays.push(largeArray.slice(i, i + subArraySize));
    }

    return subArrays;
}

export async function readAndLoadFile(filePath: string): Promise<any[]> {
    const authorsArray = [];

    return new Promise((resolve, reject) => {

        const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
        let jsonData = '';
        let buffer = ""
        readStream.on('data', (chunk) => {
            buffer += chunk
            jsonData = JSON.parse(JSON.stringify(buffer.toString()));
            try {
                const lines = jsonData.split("\n");
                buffer = lines.pop();
                const t = lines.map((l) => { return JSON.parse(l) })
                authorsArray.push(...t);
            } catch (error) {
                reject(error);
            }
        });

        readStream.on('end', () => {
            try {
                resolve(authorsArray);
            } catch (error) {
                reject(error);
            }
        });

        readStream.on('error', (error) => {
            reject(error);
        });
    });
}
