import { memo } from 'react';
import classNames from 'classnames';
import './Cell.scss';
import { TypeCell } from './types';

type Props = {
  index: {
    row: number;
    column: number;
  };
  onClick: (row: number, column: number) => void;
  loseGame: () => void;
  onRightClick: (row: number, column: number, isActivated: boolean) => void;
  data: TypeCell;
  isDebbugging: boolean;
};

function Cell({
  index,
  onClick,
  loseGame,
  onRightClick,
  data,
  isDebbugging,
}: Props): JSX.Element {
  function handleClickCell(): void {
    if (!data.hasFlag) {
      if (data.hasMine) {
        loseGame();
      }

      onClick(index.row, index.column);
    }
  }

  function onCellRightClick(event: React.MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    onRightClick(index.row, index.column, !data.hasFlag);
  }

  return (
    <div
      className={classNames('cell', {
        cell_opened: data.isOpened,
        cell_flag: data.hasFlag,
        cell_debbugging: isDebbugging,
      })}
      onClick={handleClickCell}
      onContextMenu={(e) => onCellRightClick(e)}
    >
      {(isDebbugging || data.isOpened) && data.hasMine && (
        <span role="img" aria-label="mine">
          💣
        </span>
      )}
      {data.hasFlag && !isDebbugging && (
        <span role="img" aria-label="flag">
          🚩
        </span>
      )}
      {data.isOpened &&
        !data.hasFlag &&
        !data.hasMine &&
        !isDebbugging &&
        data.minesAround > 0 && <span>{data.minesAround}</span>}
    </div>
  );
}

export default memo(Cell);
