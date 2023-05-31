export type JoinParams = {
  gameServer: number;
};

export type MoveParams = {
  direction: string;
  position: {
    x: number;
    y: number;
  };
};
