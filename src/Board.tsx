import { memo } from 'react';
import Cell from './Cell';
import './Board.scss';
import { useData } from './useData';
import { ROWS, COLUMNS } from './constants';

function Board(): JSX.Element {
  const { state, openCell, loseGame, toggleFlag } = useData();

  return (
    <>
      <div
        className={'board'}
        style={{
          gridTemplateRows: `repeat(${ROWS}, 30px)`,
          gridTemplateColumns: `repeat(${COLUMNS}, 30px)`,
        }}
      >
        {state.board.map((row, indexRow) =>
          row.map((_, indexColumn) => (
            <Cell
              key={`${indexRow}-${indexColumn}`}
              index={{
                row: indexRow,
                column: indexColumn,
              }}
              data={state.board[indexRow][indexColumn]}
              text={indexColumn.toString()}
              onClick={openCell}
              loseGame={loseGame}
              onRightClick={toggleFlag}
            />
          )),
        )}
      </div>
      {state.gameOver && <div>You lost !</div>}
    </>
  );
}

export default memo(Board);
