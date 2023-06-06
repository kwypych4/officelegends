import { useEffect } from 'react';
import { useGameStore, useUserStore } from 'store';

import { GameChoose, PlaygroundMap } from '.';
import { HallOfFameMap, Info, Settings } from './components';
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

    socket.on('join', ({ playersList, coinList }) => {
      useGameStore.setState({ playersList, coinsList: coinList });
    });

    socket.on('leave', ({ playersList, gameServer }) => {
      setPlayersList(playersList, gameServer);
    });

    socket.on('status', ({ player }) => {
      useUserStore.setState({ credits: player.credits, exp: player.exp, money: player.money });
    });

    socket.on('coin', (coins) => {
      useGameStore.setState({ coinsList: coins });
    });

    socket.on('move', ({ coins }) => {
      useGameStore.setState({ coinsList: coins });
    });

    return () => {
      socket.off('join', ({ playersList }) => {
        useGameStore.setState({ playersList });
      });

      socket.off('leave', ({ playersList }) => {
        useGameStore.setState({ playersList });
      });

      socket.off('status', ({ player }) => {
        useUserStore.setState({ credits: player.credits, exp: player.exp, money: player.money });
      });

      socket.off('coin', (coins) => {
        useGameStore.setState({ coinsList: coins });
      });

      socket.off('move', ({ coins }) => {
        useGameStore.setState({ coinsList: coins });
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
      {gameServer && socket.connected && <Info />}
    </GameWrapper>
  );
};
