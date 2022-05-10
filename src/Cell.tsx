import { memo } from 'react';
import classNames from 'classnames';
import './Cell.scss';
import { TypeCell } from './types';

type Props = {
  index: {
    row: number;
    column: number;
  };
  text: string;
  onClick: (row: number, column: number) => void;
  onRightClick: (row: number, column: number, isActivated: boolean) => void;
  data: TypeCell;
};

function Cell({
  index,
  text,
  onClick,
  onRightClick,
  data,
}: Props): JSX.Element {
  function handleClickCell(): void {
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
      {data.hasMine && (
        <span role="img" aria-label="mine">
          💣
        </span>
      )}
      {data.hasFlag && (
        <span role="img" aria-label="flag">
          🚩
        </span>
      )}
      {!data.hasFlag && !data.hasMine && <span>{text}</span>}
    </div>
  );
}

export default memo(Cell);
