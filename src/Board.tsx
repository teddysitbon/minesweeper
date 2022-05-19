import { memo, useState } from 'react';
import Cell from './Cell';
import './Board.scss';
import { useData } from './useData';
import { ROWS, COLUMNS } from './constants';

function Board(): JSX.Element {
  const { state, openCell, loseGame, toggleFlag } = useData();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function handleVisibleBoard(): void {
    setIsVisible((prevState) => !prevState);
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
              isVisible={isVisible}
            />
          )),
        )}
      </div>
      <div>
        <span
          className={'detective'}
          role="img"
          aria-label="detective"
          onClick={handleVisibleBoard}
        >
          🕵️
        </span>
      </div>
      {state.gameOver && <div>You lost !</div>}
    </>
  );
}

export default memo(Board);
