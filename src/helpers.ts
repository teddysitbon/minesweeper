import { openCell } from './reducer';
import { COLUMNS, MINES, ROWS, cellsAround } from './constants';
import { TypeBoard, TypeCell } from './types';

// EVITER PUSH DANS UN TABLEAU

export function initiateBoard(): TypeBoard {
  const board: TypeBoard = [];

  // RETHINK
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

  const boardWithMines = initiateBoardWithMines(board);

  return initiateMinesAround(boardWithMines);
}

export function initiateMinesAround(board: TypeBoard): TypeBoard {
  board.forEach((row, indexRow) => {
    row.forEach((column, indexColumn) => {
      if (!board[indexRow][indexColumn].hasMine) {
        board[indexRow][indexColumn] = {
          ...board[indexRow][indexColumn],
          minesAround: calculateMinesAround(
            board,
            board[indexRow][indexColumn],
          ),
        };
      }
    });
  });

  return board;
}

function calculateMinesAround(board: TypeBoard, cell: TypeCell): number {
  let minesAround = 0;

  cellsAround.forEach((cellAround) => {
    const indexRow = cellAround.row + cell.index.row;
    const indexColumn = cellAround.column + cell.index.column;

    if (
      indexRow >= 0 &&
      indexRow < ROWS &&
      indexColumn >= 0 &&
      indexColumn < COLUMNS &&
      board[indexRow][indexColumn].hasMine
    ) {
      minesAround = minesAround + 1;
    }
  });

  return minesAround;
}

function initiateBoardWithMines(board: TypeBoard): TypeBoard {
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

export function propagateCellOpening(
  board: TypeBoard,
  index: { row: number; column: number },
): TypeBoard {
  cellsAround.forEach((cellAround) => {
    const indexRow = cellAround.row + index.row;
    const indexColumn = cellAround.column + index.column;

    if (
      indexRow >= 0 &&
      indexRow < ROWS &&
      indexColumn >= 0 &&
      indexColumn < COLUMNS &&
      !board[indexRow][indexColumn].isOpened
    ) {
      openCell(board, { row: indexRow, column: indexColumn });
    }
  });

  return board;
}
