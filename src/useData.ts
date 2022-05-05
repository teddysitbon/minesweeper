import { useCallback, useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import { initialEmptyBoard } from './constants';
import { ActionType } from 'actions';
import { TypeCell, TypeUseData } from './types';

export function useData(): TypeUseData {
  const [state, dispatch] = useReducer(reducer, initialEmptyBoard);

  useEffect(() => {
    dispatch({ type: ActionType.InitiateEmptyBoard });
  }, []);

  const initiateBoard = useCallback(() => {
    dispatch({
      type: ActionType.InitiateEmptyBoard,
    });
  }, []);

  const rightClickOnCell = useCallback(
    (cell: TypeCell, row: number, column: number) => {
      dispatch({
        type: ActionType.OpenCell,
        payload: { cell, row, column },
      });
    },
    [],
  );

  return {
    state,
    initiateBoard,
    rightClickOnCell,
  };
}
