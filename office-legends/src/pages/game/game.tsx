import { useEffect } from 'react';
import { useGameStore, useUserStore } from 'store';

import { GameChoose, PlaygroundMap } from '.';
import { HallOfFameMap, Settings } from './components';
import { GameWrapper } from './game.styled';

export const GamePage = () => {
  const { gameServer } = useUserStore();
  const { socket } = useGameStore();

  useEffect(() => {
    if (gameServer !== undefined) {
      socket.emit('join', {
        gameServer,
      });
    }

    return () => {
      socket.emit('leave');
    };
  }, [gameServer, socket]);

  socket.on('join', ({ playersList }) => {
    useGameStore.setState({ playersList });
  });
  socket.on('leave', ({ playersList }) => {
    useGameStore.setState({ playersList });
  });

  const getGame = () => {
    if (gameServer === null || gameServer === undefined) return <GameChoose />;
    if (!socket.connected) return <div>Loading...</div>;
    if (gameServer === 2) return <HallOfFameMap />;

    return <PlaygroundMap />;
  };

  return (
    <GameWrapper>
      {getGame()} <Settings />
    </GameWrapper>
  );
};
