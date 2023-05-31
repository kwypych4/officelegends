export type WsJoinParams = {
  gameServer: number;
};

export type WsMoveParams = {
  direction: string;
  position: {
    x: number;
    y: number;
  };
};
