export type TypeReducer = {
  gameOver: boolean;
  board: TypeCell[][];
};

export type TypeCell = {
  hasMine: boolean;
  hasFlag: boolean;
  isRevealed: boolean;
};

export type TypeUseData = {
  state: TypeReducer;
  initiateBoard: () => void;
  rightClickOnCell: (cell: TypeCell, row: number, column: number) => void;
};
