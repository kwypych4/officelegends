type ConnectedPlayer = {
  playerId: number;
  gameId: number;
  lastHeartbeat: number;
};

const connectedPlayers = Array<ConnectedPlayer>();

const playerManager = {
  join: (playerId: number, gameId: number) => {
    connectedPlayers.push();
  },
  move: (playerId: number, x: number, y: number) => {},
  leave: (playerId: number) => {},
};

export { ConnectedPlayer, playerManager };
