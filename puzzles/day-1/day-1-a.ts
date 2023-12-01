import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;
  data.forEach((line) => {
    const digitPattern = /[0-9]/g;
    const numbers = line.match(digitPattern);
    if (!numbers) return;
    const number = numbers[0] + numbers[numbers.length - 1];
    sum += parseInt(number);
  });
  return sum;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
