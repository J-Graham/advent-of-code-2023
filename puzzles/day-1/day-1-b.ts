import { customLog, readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1b(dataPath?: string) {
  let data = await readData(dataPath);
  const sum = data.reduce((sum, line) => {
    const result = calculateCalibrationValue(line);
    customLog(line);
    customLog(result);
    return sum + result;
  }, 0);
  return sum;
}

function convertSpelledDigitsToNumbers(text: string): string {
  const spelledNumbers: { [key: string]: string } = {
    // Add entries for numbers above nine
    ten: '10',
    eleven: '11',
    twelve: '12',
    thirteen: '13',
    fourteen: '14',
    fifteen: '15',
    sixteen: '16',
    seventeen: '17',
    eighteen: '18',
    nineteen: '19',
    // Original entries for one to nine
    one: 'one1one',
    two: 'two2two',
    three: 'three3three',
    four: 'four4four',
    five: 'five5five',
    six: 'six6six',
    seven: 'seven7seven',
    eight: 'eight8eight',
    nine: 'nine9nine',
  };

  Object.keys(spelledNumbers).forEach((key) => {
    text = text.replace(new RegExp(`${key}`, 'g'), spelledNumbers[key]);
  });

  return text.replace(/\s+/g, ''); // Remove any added spaces
}
function calculateCalibrationValue(line: string): number {
  const convertedLine = convertSpelledDigitsToNumbers(line);
  const digits = convertedLine.match(/\d/g);

  if (digits && digits.length > 0) {
    const firstDigit = parseInt(digits[0]);
    const lastDigit = parseInt(digits[digits.length - 1]);
    return firstDigit * 10 + lastDigit;
  }

  return 0;
}
const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
