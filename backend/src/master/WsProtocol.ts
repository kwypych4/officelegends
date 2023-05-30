export type JoinParams = {
  gameId: number;
};

export type MoveParams = {
  direction: string;
  position: {
    x: number;
    y: number;
  };
};
