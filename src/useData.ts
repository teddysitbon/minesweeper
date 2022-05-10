import { useCallback, useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import { initialEmptyBoard } from './constants';
import { ActionType } from 'actions';
import { TypeUseData } from './types';

export function useData(): TypeUseData {
  const [state, dispatch] = useReducer(reducer, initialEmptyBoard);

  useEffect(() => {
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

  const loseGame = useCallback(() => {
    dispatch({
      type: ActionType.LoseGame,
    });
  }, []);

  const toggleFlag = useCallback(
    (row: number, column: number, isActivated: boolean) => {
      dispatch({
        type: ActionType.ToggleFlag,
        payload: { row, column, isActivated },
      });
    },
    [],
  );

  return {
    state,
    openCell,
    loseGame,
    toggleFlag,
  };
}
