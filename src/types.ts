export type TypeReducer = {
  gameOver: boolean;
  board: TypeBoard;
};

export type TypeCell = {
  index: {
    row: number;
    column: number;
  };
  hasMine: boolean;
  hasFlag: boolean;
  isOpened: boolean;
  minesAround: number;
};

export type TypeBoard = TypeCell[][];

export type TypeUseData = {
  state: TypeReducer;
  openCell: (row: number, column: number) => void;
  loseGame: () => void;
  restartGame: () => void;
  toggleFlag: (row: number, column: number, isActivated: boolean) => void;
};
