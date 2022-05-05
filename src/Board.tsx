import { memo, useEffect } from 'react';
import Cell from './Cell';
import './Board.scss';
import { useData } from './useData';

function Board(): JSX.Element {
  const { state, initiateBoard, rightClickOnCell } = useData();

  useEffect(() => {
    initiateBoard();
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
            data={state.board[indexRow][indexColumn]}
            text={indexColumn.toString()}
            onClick={rightClickOnCell}
          />
        )),
      )}
    </div>
  );
}

export default memo(Board);
