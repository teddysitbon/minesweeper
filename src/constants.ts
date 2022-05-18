export const ROWS = 10;
export const COLUMNS = 10;
export const MINES = 10;

export const initialEmptyBoard = {
  gameOver: false,
  board: [],
};

export const cellsAround = [
  { row: -1, column: -1 },
  { row: -1, column: 0 },
  { row: -1, column: 1 },
  { row: 0, column: -1 },
  { row: 0, column: 1 },
  { row: 1, column: -1 },
  { row: 1, column: 0 },
  { row: 1, column: 1 },
];
