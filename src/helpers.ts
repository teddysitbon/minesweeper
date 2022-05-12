import { COLUMNS, MINES, ROWS } from './constants';
import { TypeCell } from './types';

// EVITER PUSH DANS UN TABLEAU

export function initiateBoard(): TypeCell[][] {
  const board: TypeCell[][] = [];

  for (let row = 0; row < ROWS; row++) {
    board.push([]);
    for (let column = 0; column < COLUMNS; column++) {
      board[row].push({
        hasMine: false,
        hasFlag: false,
        isOpened: false,
        minesAround: 0,
        index: {
          row,
          column,
        },
      });
    }
  }

  /*
  const emptyBoard = Array.from(Array(ROWS), () => {
    return new Array(COLUMNS).fill({
      hasMine: false,
      hasFlag: false,
      isOpened: false,
      minesAround: 0,
    });
  });
  */

  return initiateMinesAround(initiateBoardWithMines(board));
}

export function initiateMinesAround(board: TypeCell[][]): TypeCell[][] {
  board.forEach((row, indexRow) => {
    row.forEach((column, indexColumn) => {
      if (!board[indexRow][indexColumn].hasMine) {
        calculateMinesAround(board, board[indexRow][indexColumn]);
      }
    });
  });
  return board;
}

function calculateMinesAround(board: TypeCell[][], cell: TypeCell): TypeCell {
  const cellsAround = [
    { row: -1, column: -1 },
    { row: -1, column: 0 },
    { row: -1, column: 1 },
    { row: 0, column: -1 },
    { row: 0, column: 1 },
    { row: 1, column: -1 },
    { row: 1, column: 0 },
    { row: 1, column: 1 },
  ];

  /*
  let mineAround = 0;
  cellsAround.forEach((cellAround) => {
    if (
      cellAround.row + cell.row > 0 &&
      cellAround.column + cell.column > 0 &&
      cell[row][column].hasMine
    ) {
      mineAround = mineAround + 1;
    }
  });
  */

  return cell;
}

function initiateBoardWithMines(board: TypeCell[][]): TypeCell[][] {
  const mines = generateRandomMines(ROWS, COLUMNS, MINES);

  mines.forEach((mine) => {
    board[mine.row][mine.column] = {
      ...board[mine.row][mine.column],
      hasMine: true,
    };
  });

  return board;
}

function generateRandomMines(
  rows: number,
  columns: number,
  numberOfMines: number,
): { row: number; column: number }[] {
  const arrayToPickValue = [];
  const arrayOfRandomValues = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      arrayToPickValue.push({ row, column });
    }
  }

  while (numberOfMines > 0) {
    const randomIndex = Math.floor(Math.random() * arrayToPickValue.length);
    arrayOfRandomValues.push(arrayToPickValue[randomIndex]);
    arrayToPickValue.splice(randomIndex, 1);
    numberOfMines--;
  }

  return arrayOfRandomValues;
}
