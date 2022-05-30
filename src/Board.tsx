import { memo, useState } from 'react';
import Cell from './Cell';
import './Board.scss';
import { useData } from './useData';
import { ROWS, COLUMNS } from './constants';

function Board(): JSX.Element {
  const { state, openCell, loseGame, toggleFlag } = useData();
  const [isDebbugging, setIsDebbugging] = useState<boolean>(false);

  function handleToggleVisibleBoard(): void {
    setIsDebbugging((prevState) => !prevState);
  }

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
              onClick={openCell}
              loseGame={loseGame}
              onRightClick={toggleFlag}
              isDebbugging={isDebbugging}
            />
          )),
        )}
      </div>
      <div>
        <span
          className={'monkey'}
          role="img"
          aria-label="monkey"
          onClick={handleToggleVisibleBoard}
        >
          {isDebbugging ? <>🙈</> : <>🙉</>}
        </span>
      </div>
      {state.gameOver && <div>You lost !</div>}
    </>
  );
}

export default memo(Board);
