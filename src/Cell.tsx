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
  onRightClick: (row: number, column: number) => void;
  data: TypeCell;
};

function Cell(props: Props): JSX.Element {
  function handleClickCell(): void {
    props.onClick(props.index.row, props.index.column);
  }

  function onCellRightClick(event: React.MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    props.onRightClick(props.index.row, props.index.column);
  }

  return (
    <div
      className={classNames('cell', {
        cell_opened: props.data.isOpened || props.data.hasFlag,
        cell_flag: props.data.hasFlag,
      })}
      onClick={handleClickCell}
      onContextMenu={(e) => onCellRightClick(e)}
    >
      {props.data.hasMine && (
        <span role="img" aria-label="mine">
          💣
        </span>
      )}
      {props.data.hasFlag && (
        <span role="img" aria-label="flag">
          🚩
        </span>
      )}
      {!props.data.hasFlag && !props.data.hasMine && <span>{props.text}</span>}
    </div>
  );
}

export default memo(Cell);
