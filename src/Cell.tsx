import { memo, useState } from "react";
import classNames from 'classnames';
import './Cell.scss';

type Props = {
  text: string;
  onClick?: () => void;
};

function Cell(props: Props): JSX.Element {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  function handleClickCell(event: any): void {
    // props.onClick();
    setIsRevealed(true);
  }

  function onCellRightClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
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
      {props.text}
    </div>
  );
}

export default memo(Cell);
