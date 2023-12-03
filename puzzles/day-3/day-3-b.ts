import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);
  const engineMap = data.map((row) => row.split(''));
  const symbols = new Set(['$', '*', '/', '-', '#', '@', '&', '%', '=', '+']);

  const adjacentOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const foundIntegers = [];
  const foundIndicies = new Map();

  function findWholeNumber(y, x) {
    let number = '';
    let left = x;
    while (
      left >= 0 &&
      !isNaN(parseInt(engineMap[y][left])) &&
      engineMap[y][left] !== '.'
    ) {
      number = engineMap[y][left] + number;
      left--;
    }
    let right = x + 1;
    while (
      right < engineMap[y].length &&
      !isNaN(parseInt(engineMap[y][right])) &&
      engineMap[y][right] !== '.'
    ) {
      number += engineMap[y][right];
      right++;
    }
    return { number, index: left + 1 };
  }

  for (let y = 0; y < engineMap.length; y++) {
    for (let x = 0; x < engineMap[y].length; x++) {
      if (symbols.has(engineMap[y][x])) {
        let adjacentNumbers = [];
        for (let offset of adjacentOffsets) {
          const newY = y + offset[0];
          const newX = x + offset[1];
          if (
            newY >= 0 &&
            newY < engineMap.length &&
            newX >= 0 &&
            newX < engineMap[newY].length &&
            !isNaN(parseInt(engineMap[newY][newX])) &&
            engineMap[newY][newX] !== '.'
          ) {
            const { number, index } = findWholeNumber(newY, newX);
            const key = `${newY}, ${index}`;
            if (!foundIndicies.has(key)) {
              adjacentNumbers.push(number);
              foundIndicies.set(key, true);
            }
          }
        }
        if (adjacentNumbers.length >= 2) {
          for (let i = 0; i < adjacentNumbers.length; i++) {
            for (let j = i + 1; j < adjacentNumbers.length; j++) {
              const product =
                Number(adjacentNumbers[i]) * Number(adjacentNumbers[j]);
              foundIntegers.push(product);
            }
          }
        }
      }
    }
  }

  const integersArray = foundIntegers.map(Number);
  return integersArray.reduce((sum, num) => sum + num, 0);
}
const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
