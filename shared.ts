import { readFile } from 'fs/promises';
import * as fs from 'fs';

export async function readData(path?: string) {
  const fileName = path || process.argv[2];
  const fileContent = (await readFile(fileName)).toString();
  const normalizedContent = fileContent.replace(/\r\n/g, '\n');
  const data = normalizedContent.split('\n');
  return data;
}

// Function to override console.log
function logToFile(data: string): void {
  fs.appendFileSync('output.log', data + '\n');
}

// Use this function instead of console.log to log to a file
export function customLog(...data: any[]): void {
  logToFile(
    data
      .map((item) => (typeof item === 'object' ? JSON.stringify(item) : item))
      .join(' ')
  );
}
