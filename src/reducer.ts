import { TypeCell, TypeReducer } from './types';
import { ActionType } from './actions';
import { ROWS, COLUMNS, MINES } from './constants';

export function reducer(state: any, action: any): TypeReducer {
  switch (action.type) {
    case ActionType.InitiateEmptyBoard:
      return {
        ...state,
        gameOver: false,
        board: initiateBoard(),
      };
    case ActionType.OpenCell:
      return {
        ...state,
        board: openCell(state.board, action.payload),
      };
    case ActionType.ToggleFlag:
      return {
        ...state,
        board: toggleFlag(state.board, action.payload),
      };
    default:
      throw new Error('Action not found');
  }
}

export function initiateBoard(): TypeCell[][] {
  // Need to Optim ?
  const initialCell = {
    hasMine: false,
    hasFlag: false,
    isOpened: false,
  };

  const emptyBoard = Array.from(Array(ROWS), () => {
    return new Array(COLUMNS).fill(initialCell);
  });

  return initiateMinesInBoard(emptyBoard);
}

function initiateMinesInBoard(board: TypeCell[][]): TypeCell[][] {
  const mines = generateRandomMines(ROWS * COLUMNS, MINES);
  let index = 0;

  board.map((row, indexRow) => {
    row.map((column, indexColumn) => {
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

function generateRandomMines(
  numberOfCells: number,
  numberOfMines: number,
): number[] {
  const arrayToPickValue = Array.from(Array(numberOfCells).keys());
  const arrayOfRandomValues = [];

  do {
    const randomIndex = Math.floor(Math.random() * arrayToPickValue.length);
    arrayOfRandomValues.push(arrayToPickValue[randomIndex]);
    arrayToPickValue.splice(randomIndex, 1);
    numberOfMines--;
  } while (numberOfMines > 0);

  return arrayOfRandomValues.sort((a, b) => a - b);
}

export function openCell(
  board: TypeCell[][],
  index: { row: number; column: number },
): TypeCell[][] {
  board[index.row][index.column] = {
    ...board[index.row][index.column],
    isOpened: true,
  };

  return board;
}

export function toggleFlag(
  board: TypeCell[][],
  index: { row: number; column: number },
): TypeCell[][] {
  board[index.row][index.column] = {
    ...board[index.row][index.column],
    hasFlag: true,
  };

  return board;
}
