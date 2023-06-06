export type JoinPlayerData = {
  id: number;
  username: string;
  avatar: string;
  skin: string;
  money: number;
  exp: number;
  credits: number;
};

export type Position = {
  x: number;
  y: number;
};

export type Coin = {
  position: Position;
  amount: number;
};

export type ConnectedPlayer = JoinPlayerData & {
  position: Position;
};

export type GameStatus = {
  playersList: ConnectedPlayer[];
  coinList: Coin[];
  gameServer: number;
};

export type GenericRpcRequest = {
  uuid: string;
};

export type GenericRpcResponse = {
  success: boolean;
};

export type JoinRequest = GenericRpcRequest & {
  player: JoinPlayerData;
};

export type JoinResponse = GenericRpcResponse & {
  response?: GameStatus;
};

export type MoveRequest = GenericRpcRequest & {
  playerId: number;
  direction: string;
  position: Position;
};

export type MoveResponse = GenericRpcResponse & {
  direction?: string;
  position?: Position;
  money?: number;
  coins?: Coin[];
};

export type LeaveRequest = GenericRpcRequest & {
  playerId: number;
};

export type LeaveResponse = GenericRpcResponse & {
  response?: GameStatus;
  removedPlayer?: ConnectedPlayer;
};

export type AddCoinRequest = GenericRpcRequest & {
  coin: Coin;
};

export type AddCoinResponse = GenericRpcResponse & {
  response?: Coin[];
};

export type UpdatePlayerRequest = GenericRpcRequest & {
  playerId: number;
  money?: number;
  exp?: number;
  credits?: number;
};

export type UpdatePlayerResponse = GenericRpcResponse & {
  response?: {
    player: ConnectedPlayer;
  };
};
