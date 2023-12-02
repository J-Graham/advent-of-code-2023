import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);
  const gameResults = data.map((line) => {
    return line.split(':')[1];
  });
  let sum = 0;
  gameResults.forEach((result, index) => {
    if (!result) return;
    let currentLowest = { red: 0, green: 0, blue: 0 };
    const rounds = result.split(';');
    const mappedRounds = mapColorsToNumbers(rounds);
    mappedRounds.forEach((item) => {
      Object.keys(item).forEach((color) => {
        if (item[color] > currentLowest[color]) {
          currentLowest[color] = item[color];
        }
      });
    });
    const total = Object.values(currentLowest).reduce(
      (acc, value) => acc * value,
      1
    );
    sum += total;
  });
  return sum;
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
const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
