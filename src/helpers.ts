import { COLUMNS, MINES, ROWS } from './constants';
import { TypeCell } from './types';

export function initiateBoardWithMines(board: TypeCell[][]): TypeCell[][] {
  const mines = generateRandomMines(ROWS * COLUMNS, MINES);
  let index = 0;

  board.forEach((row, indexRow) => {
    row.forEach((_, indexColumn) => {
      if (mines.includes(index)) {
        board[indexRow][indexColumn] = {
          ...board[indexRow][indexColumn],
          hasMine: true,
        };
      }
      index++;
    });
  });

  return board;
}

export function generateRandomMines(
  numberOfCells: number,
  numberOfMines: number,
): number[] {
  const arrayToPickValue = Array.from(Array(numberOfCells).keys());
  const arrayOfRandomValues = [];

  while (numberOfMines > 0) {
    const randomIndex = Math.floor(Math.random() * arrayToPickValue.length);
    arrayOfRandomValues.push(arrayToPickValue[randomIndex]);
    arrayToPickValue.splice(randomIndex, 1);
    numberOfMines--;
  }

  return arrayOfRandomValues.sort((a, b) => a - b);
}
