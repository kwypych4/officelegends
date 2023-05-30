import { ConnectedPlayer } from '../gs/model/ConnectedPlayer';
import { Position } from '../gs/model/Position';

type JoinPlayerData = {
  id: number;
  nickname: string;
  avatar: string;
  skin: string;
  money: number;
  exp: number;
};

type GenericRpcRequest = {
  uuid: string;
};

type GenericRpcResponse = {
  success: boolean;
};

type JoinRequest = GenericRpcRequest & {
  player: JoinPlayerData;
};

type JoinResponse = GenericRpcResponse & {
  response?: ConnectedPlayer[];
};

type MoveRequest = GenericRpcRequest & {
  playerId: number;
  direction: string;
  position: Position;
};

type MoveResponse = GenericRpcResponse & {
  direction?: string;
  position?: Position;
};

type LeaveRequest = GenericRpcRequest & {
  playerId: number;
};

type LeaveResponse = GenericRpcResponse & {
  response?: ConnectedPlayer[];
  removedPlayer?: ConnectedPlayer;
};

export { JoinPlayerData, JoinRequest, JoinResponse, MoveRequest, MoveResponse, LeaveRequest, LeaveResponse };
