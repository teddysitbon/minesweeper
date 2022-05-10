export type TypeReducer = {
  gameOver: boolean;
  board: TypeCell[][];
};

export type TypeCell = {
  hasMine: boolean;
  hasFlag: boolean;
  isOpened: boolean;
};

export type TypeUseData = {
  state: TypeReducer;
  openCell: (row: number, column: number) => void;
  toggleFlag: (row: number, column: number, isActivated: boolean) => void;
};
