import { customLog, readData } from '../../shared.ts';
import chalk from 'chalk';
const maxValue = {
  red: 12,
  green: 13,
  blue: 14,
};
const possibleIds = [];
export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  const gameResults = data.map((line) => {
    return line.split(':')[1];
  });
  gameResults.forEach((result, index) => {
    if (!result) return;
    const rounds = result.split(';');
    const results = mapColorsToNumbers(rounds);
    if (compareWithMaxValues(results, maxValue).length === 0) {
      possibleIds.push(index + 1);
    }
  });
  return possibleIds.reduce((acc, id) => {
    return acc + id;
  });
}

function compareWithMaxValues(result, maxValue) {
  const exceededColors = [];
  result.forEach((item) => {
    Object.keys(item).forEach((color) => {
      if (item[color] > maxValue[color]) {
        exceededColors.push(color);
      }
    });
  });

  return exceededColors;
}
function mapColorsToNumbers(str) {
  if (!str) return;
  if (str[0].trim().split(',').length === -1) {
    const [number, color] = str.trim().split(' ');
    return { [color]: parseInt(number, 10) };
  }
  return str.map((round) => {
    return round
      .trim()
      .split(',')
      .reduce((acc, pair) => {
        const [number, color] = pair.trim().split(' ');
        acc[color] = (acc[color] || 0) + parseInt(number, 10);
        return acc;
      }, {});
  });
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
