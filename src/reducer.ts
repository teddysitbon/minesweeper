import { TypeCell, TypeReducer } from './types';
import { Action } from './actions';
import { ROWS, COLUMNS } from './constants';

export function reducer(state: any, action: any): TypeReducer {
  switch (action.type) {
    case Action.InitiateEmptyBoard:
      return {
        ...state,
        gameOver: false,
        board: initiateBoard(),
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
