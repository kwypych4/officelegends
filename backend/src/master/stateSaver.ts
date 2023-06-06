import { rpcClient } from './manager/RpcClient';
import { gameServerManager } from './manager/GameServerManager';
import { playerUtils } from './db/DbUtils';

const server = gameServerManager.getServer(1);

const setupSaver = (interval: number) => {
  setInterval(async () => {
    const status = await rpcClient.requestStatus(server);
    if (!status.success) return;

    const updateData = status.response.playersList.map((p) => ({
      id: p.id,
      money: p.money,
      exp: p.exp,
      credits: p.credits,
    }));

    await playerUtils.updateMany(updateData);
  }, interval);
};

export { setupSaver };
