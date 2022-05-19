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
  isVisible: boolean;
};

function Cell({
  index,
  onClick,
  loseGame,
  onRightClick,
  data,
  isVisible,
}: Props): JSX.Element {
  function handleClickCell(): void {
    if (data.hasMine) {
      loseGame();
    }
    onClick(index.row, index.column);
  }

  function onCellRightClick(event: React.MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    onRightClick(index.row, index.column, !data.hasFlag);
  }

  return (
    <div
      className={classNames('cell', {
        cell_opened: data.isOpened || data.hasFlag,
        cell_flag: data.hasFlag,
      })}
      onClick={handleClickCell}
      onContextMenu={(e) => onCellRightClick(e)}
    >
      {(isVisible || data.isOpened) && data.hasMine && (
        <span role="img" aria-label="mine">
          💣
        </span>
      )}
      {(isVisible || data.isOpened) && data.hasFlag && (
        <span role="img" aria-label="flag">
          🚩
        </span>
      )}
      {(isVisible || data.isOpened) && !data.hasFlag && !data.hasMine && (
        <span>{data.minesAround}</span>
      )}
    </div>
  );
}

export default memo(Cell);
