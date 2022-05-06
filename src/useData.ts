import { useCallback, useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import { initialEmptyBoard } from './constants';
import { ActionType } from 'actions';
import { TypeUseData } from './types';

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

  const openCell = useCallback((row: number, column: number) => {
    dispatch({
      type: ActionType.OpenCell,
      payload: { row, column },
    });
  }, []);

  const toggleFlag = useCallback((row: number, column: number) => {
    dispatch({
      type: ActionType.ToggleFlag,
      payload: { row, column },
    });
  }, []);

  return {
    state,
    initiateBoard,
    openCell,
    toggleFlag,
  };
}
