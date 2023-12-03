import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);

  const partPositions = [];
  const engineMap = data.map((row) => row.split(''));
  for (let i = 0; i < engineMap.length; i++) {
    const element = engineMap[i];
    for (let j = 0; j < element.length; j++) {
      const element2 = element[j];
      if (element2 === '.') {
        continue;
      }
      const bottomLeft = engineMap[i + 1]?.[j - 1] ?? '.';
      const bottomRight = engineMap[i + 1]?.[j + 1] ?? '.';
      const left = element[j - 1] ?? '.';
      const right = element[j + 1] ?? '.';
      const top = engineMap[i - 1]?.[j] ?? '.';
      const bottom = engineMap[i + 1]?.[j] ?? '.';
      const topRight = engineMap[i - 1]?.[j + 1] ?? '.';
      const topLeft = engineMap[i - 1]?.[j - 1] ?? '.';
      // check if any of the positions are a number
      // regex that matches anything not a number or a dot
      const regex = /[^0-9.]/;
      // if any of the positions doesn't match the regex
      if (
        regex.test(bottomLeft) ||
        regex.test(bottomRight) ||
        regex.test(left) ||
        regex.test(right) ||
        regex.test(top) ||
        regex.test(bottom) ||
        regex.test(topRight) ||
        regex.test(topLeft)
      ) {
        // add it to the partPositions array
        partPositions.push([i, j]);
      }
    }
  }
  // get any numbers before or after the position but stop at a .
  let total = 0;
  partPositions.forEach((position) => {
    // make a set of numbers so we don't add the same number twice
    const combinedNumber = parseInt(
      combineNumbersAtCoordinate(engineMap, position)
    );
    total += Number.isNaN(combinedNumber) ? 0 : combinedNumber;
    // loop through the set and add the numbers together
  });
  return total;
}
// 332653
let processedIndices = new Set();
function combineNumbersAtCoordinate(array2D, coordinate) {
  const [rowIndex, columnIndex] = coordinate;
  let result = '';
  const isNumber = (str) => /^\d+$/.test(str);
  const createIndexIdentifier = (row, col) => `${row},${col}`;

  // Go forward from the coordinate
  for (let i = columnIndex; i < array2D[rowIndex].length; i++) {
    const identifier = createIndexIdentifier(rowIndex, i);

    if (!isNumber(array2D[rowIndex][i]) || processedIndices.has(identifier))
      break;
    result += array2D[rowIndex][i];
    processedIndices.add(identifier);
  }

  // Go backward from one position left of the coordinate
  for (let i = columnIndex - 1; i >= 0; i--) {
    const identifier = createIndexIdentifier(rowIndex, i);

    if (!isNumber(array2D[rowIndex][i]) || processedIndices.has(identifier))
      break;
    result = array2D[rowIndex][i] + result;
    processedIndices.add(identifier);
  }

  return result;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
