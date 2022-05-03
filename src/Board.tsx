import { memo } from 'react';
import { ROWS, COLUMNS } from './constants';
import Cell from './Cell';
import './Board.scss';
import { getArrayFromNumber } from 'helper';

function Board(): JSX.Element {
  const rows = getArrayFromNumber(ROWS);
  const columns = getArrayFromNumber(COLUMNS);

  return (
    <div
      className={'board'}
      style={{
        gridTemplateColumns: `repeat(20, 30px)`,
        gridTemplateRows: `repeat(20, 30px)`,
      }}
    >
      {rows.map((row, indexRow) =>
        columns.map((column, indexColumn) => (
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
