import { memo, useEffect, useReducer } from 'react';
import Cell from './Cell';
import './Board.scss';
import { reducer } from './reducer';
import { Action } from 'actions';
import { initialEmptyBoard } from './constants';

function Board(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialEmptyBoard);

  useEffect(() => {
    dispatch({ type: Action.InitiateEmptyBoard });
  }, []);

  return (
    <div
      className={'board'}
      style={{
        gridTemplateColumns: `repeat(20, 30px)`,
        gridTemplateRows: `repeat(20, 30px)`,
      }}
    >
      {state.board.map((row, indexRow) =>
        row.map((column, indexColumn) => (
          <Cell
            key={`${indexRow}-${indexColumn}`}
            index={{
              row: indexRow,
              column: indexColumn,
            }}
            text={indexColumn.toString()}
          />
        )),
      )}
    </div>
  );
}

export default memo(Board);
