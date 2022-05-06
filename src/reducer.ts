import { TypeCell, TypeReducer } from './types';
import { ActionType } from './actions';
import { ROWS, COLUMNS } from './constants';

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
  const initialCell = {
    hasMine: false,
    hasFlag: false,
    isOpened: false,
  };

  return Array.from(Array(ROWS), () => new Array(COLUMNS).fill(initialCell));
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
