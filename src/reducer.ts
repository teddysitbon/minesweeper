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
      console.log(action);
      return {
        ...state,
        board: openCell(state.board, action.payload),
      };
    default:
      throw new Error('Action not found');
  }
}

export function initiateBoard(): TypeCell[][] {
  const initialCell = {
    hasMine: false,
    hasFlag: false,
    isRevealed: false,
  };

  return Array.from(Array(ROWS), () => new Array(COLUMNS).fill(initialCell));
}

export function openCell(
  board: TypeCell[][],
  data: { cell: TypeCell; row: number; column: number },
): TypeCell[][] {
  console.log(board[data.row][data.column]);
  return board;
}
