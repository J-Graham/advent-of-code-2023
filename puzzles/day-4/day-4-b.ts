import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);
  let totalCards = data.length; // Initially, count all cards
  let copiesOfCards = Array(data.length).fill(1); // Start with 1 copy of each card

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    const [card, winners] = line.split('|').map((item) => item.trim());
    const newWinningValues = card
      .split(':')[1]
      .split(' ')
      .filter(
        (element) => element !== '' && winners.split(' ').includes(element)
      );

    const numberOfWinners = newWinningValues.length;
    for (let j = 1; j <= numberOfWinners; j++) {
      if (i + j < copiesOfCards.length) {
        copiesOfCards[i + j] += copiesOfCards[i];
      }
    }
  }

  // Sum up the total cards including copies
  totalCards = copiesOfCards.reduce((acc, val) => acc + val, 0);

  return totalCards;
}
// return counter.total;
// while (hasWinners) {
//   data.map((line) => {
//     const [card, winners] = line.split('|').map((item) => item.trim());
//     const cardNumbers = card.split(':')[1];
//     const matched = card.split(':')[0].match(/\d+/); // This will find the first sequence of digits in the string
//     const number = matched ? parseInt(matched[0], 10) : null;
//     winningValues = cardNumbers
//       .split(' ')
//       .filter((element) => element !== '')
//       .filter((element) =>
//         winners
//           .split(' ')
//           .filter((element) => element !== '')
//           .includes(element)
//       );
//     if (winningValues.length > 0) {
//       hasWinners = true;
//       winningValues.forEach((value, index) => {
//         data.push(data[number + index]);
//       });
//       console.log(data);
//     } else {
//       hasWinners = false;
//       console.log(data.length);
//     }
//   });
// }

// return total;

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
