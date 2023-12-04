import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);
  let total = 0;
  data.map((line) => {
    let [card, winners] = line.split('|').map((item) => item.trim());
    card = card.split(':')[1];
    const winningValues = card
      .split(' ')
      .filter((element) => element !== '')
      .filter((element) =>
        winners
          .split(' ')
          .filter((element) => element !== '')
          .includes(element)
      );
    var doubled = winningValues.reduce(function (acc, val, ind) {
      if (ind === 0) return 1;
      acc = acc * 2;
      return acc;
    }, 0);
    total += doubled;
  });
  return total;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
