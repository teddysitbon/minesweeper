import { memo, useState } from "react";
import classNames from 'classnames';
import './Cell.scss';

type Props = {
  onClick: () => void;
};

function Cell(props: Props): JSX.Element {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  function handleClickCell(event: any): void {
    console.log(event);
    props.onClick();
    setIsRevealed(true);
  }

  function onCellRightClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    console.log('right click');
    return false;
  }

  return (
    <div
      className={classNames(
        'cell',
        { 'cell_clicked': isRevealed }
      )}
      onClick={handleClickCell}
      onContextMenu={(e) => onCellRightClick(e)}
    >
      Cell
    </div>
  );
}

export default memo(Cell);
