import { memo, useState } from 'react';
import classNames from 'classnames';
import './Cell.scss';
import { TypeCell } from './types';

type Props = {
  index: {
    row: number;
    column: number;
  };
  text: string;
  onClick: (cell: TypeCell, row: number, column: number) => void;
  data: TypeCell;
};

function Cell(props: Props): JSX.Element {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  function handleClickCell(): void {
    props.onClick(props.data, props.index.row, props.index.column);
    // setIsRevealed(true);
  }

  /*
  onContextMenu={(e) => onCellRightClick(e)}
  function onCellRightClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  */

  return (
    <div
      className={classNames('cell', { cell_clicked: isRevealed })}
      onClick={handleClickCell}
    >
      {props.text}
    </div>
  );
}

export default memo(Cell);
