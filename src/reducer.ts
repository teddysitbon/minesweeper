import { TypeBoard, TypeReducer } from './types';
import { ActionType } from './actions';
import { initiateBoard, propagateCellOpening } from './helpers';

export function reducer(state: any, action: any): TypeReducer {
  switch (action.type) {
    case ActionType.InitiateBoard:
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
  board: TypeBoard,
  index: { row: number; column: number },
): TypeBoard {
  const currentCell = board[index.row][index.column];

  board[index.row][index.column] = {
    ...currentCell,
    isOpened: true,
    hasFlag: false,
  };

  if (
    currentCell.minesAround === 0 &&
    !currentCell.isOpened &&
    !currentCell.hasMine
  ) {
    propagateCellOpening(board, index);
  }

  return board;
}

export function toggleFlag(
  board: TypeBoard,
  data: { row: number; column: number; isActivated: boolean },
): TypeBoard {
  board[data.row][data.column] = {
    ...board[data.row][data.column],
    hasFlag: data.isActivated,
  };

  return board;
}
