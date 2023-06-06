import { Server } from 'socket.io';
import { rpcClient } from './RpcClient';
import { gameServerManager } from './GameServerManager';
import { Coin } from '../../common/RpcProtocol';
import { roomForGameId } from '../controller/WsController';
import { randomX, randomY } from '../../gs/controller/GameController';

const randomAmount = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

const server = gameServerManager.getServer(1);

let spawner;

const startCoinSpawner = (intervalMs: number, io: Server) => {
  clearInterval(spawner);
  spawner = setInterval(async () => {
    const coin: Coin = {
      amount: randomAmount(10, 200),
      position: {
        x: randomX(),
        y: randomY(),
      },
    };

    const response = await rpcClient.requestSpawnCoin(server, coin);
    if (!response.success) return;

    const room = roomForGameId(1);
    io.in(room).emit('coin', response.response);
  }, intervalMs);
};

const coinManager = { startCoinSpawner };

export { coinManager };
