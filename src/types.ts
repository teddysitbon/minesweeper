export type TypeReducer = {
  gameOver: boolean;
  board: TypeCell[][];
};

export type TypeCell = {
  hasMine: boolean;
  hasFlag: boolean;
  isRevealed: boolean;
};
