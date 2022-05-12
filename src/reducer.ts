import { TypeCell, TypeReducer } from './types';
import { ActionType } from './actions';
import { initiateBoard } from './helpers';

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
    case ActionType.LoseGame:
      return {
        ...state,
        gameOver: true,
      };
    default:
      throw new Error('Action not found');
  }
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
  data: { row: number; column: number; isActivated: boolean },
): TypeCell[][] {
  board[data.row][data.column] = {
    ...board[data.row][data.column],
    hasFlag: data.isActivated,
  };

  return board;
}
