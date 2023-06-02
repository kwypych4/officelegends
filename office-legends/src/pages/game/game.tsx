import { useEffect } from 'react';
import { useGameStore, useUserStore } from 'store';

import { GameChoose, PlaygroundMap } from '.';
import { HallOfFameMap, Settings } from './components';
import { GameWrapper } from './game.styled';

export const GamePage = () => {
  const { gameServer } = useUserStore();
  const { socket, setPlayersList } = useGameStore();

  useEffect(() => {
    if (gameServer !== undefined) {
      socket.emit('join', {
        gameServer,
      });
    }
  }, [gameServer, socket]);

  useEffect(() => {
    socket.connect();

    socket.on('join', ({ playersList }) => {
      useGameStore.setState({ playersList });
    });

    socket.on('leave', ({ playersList, gameServer }) => {
      setPlayersList(playersList, gameServer);
    });

    return () => {
      socket.off('join', ({ playersList }) => {
        useGameStore.setState({ playersList });
      });

      socket.off('leave', ({ playersList }) => {
        useGameStore.setState({ playersList });
      });
      socket.disconnect();
    };
  }, [socket, setPlayersList]);

  const getGame = () => {
    if (gameServer === null || gameServer === undefined) return <GameChoose />;
    if (!socket.connected) return <div>Loading...</div>;
    if (gameServer === 1) return <PlaygroundMap />;

    return <HallOfFameMap />;
  };

  return (
    <GameWrapper>
      {getGame()} <Settings />
    </GameWrapper>
  );
};
