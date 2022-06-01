import { memo, useCallback, useMemo, useState } from 'react';
import Cell from './Cell';
import './Board.scss';
import { useData } from './useData';
import { ROWS, COLUMNS, MINES } from './constants';

function Board(): JSX.Element {
  const { state, openCell, loseGame, restartGame, toggleFlag } = useData();
  const [isDebbugging, setIsDebbugging] = useState<boolean>(false);

  function handleToggleVisibleBoard(): void {
    setIsDebbugging((prevState) => !prevState);
  }

  const isInitiated = useMemo(() => {
    return state.board.length > 0;
  }, [state.board.length]);

  const getNumberOfFlags = useCallback(() => {
    return state.board
      .map((row) =>
        row.filter((cell) => cell.hasFlag).reduce((sum) => sum + 1, 0),
      )
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }, [state.board]);

  const getNumberOfOpenCells = useCallback(() => {
    return state.board
      .map((row) =>
        row.filter((cell) => cell.isOpened).reduce((sum) => sum + 1, 0),
      )
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }, [state.board]);

  const isWin = useCallback(
    () => !state.gameOver && COLUMNS * ROWS - getNumberOfOpenCells() === MINES,
    [getNumberOfOpenCells, state.gameOver],
  );

  console.log(isWin());

  return isInitiated ? (
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
      <button onClick={restartGame}>🔃</button>
      {state.gameOver && <div>You lost !</div>}
      {<div>{MINES - getNumberOfFlags()}</div>}
    </>
  ) : (
    <>Loading</>
  );
}

export default memo(Board);
