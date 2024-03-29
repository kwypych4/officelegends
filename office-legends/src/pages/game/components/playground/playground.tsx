import { Coin, HallOfFame, Player, PlayRoom, Shop } from 'components';
import { useGameStore, useUserStore } from 'store';

import { GameWrapper } from './playground.styled';

export const PlaygroundMap = () => {
  const { playersList, coinsList } = useGameStore();
  const { id: playerId } = useUserStore();

  return (
    <GameWrapper>
      {coinsList?.map((coin) => (
        <Coin key={`${coin.position.x}${coin.position.y}`} position={coin.position} />
      ))}

      <Shop />
      <PlayRoom />
      <HallOfFame />
      {playersList &&
        playersList.map(({ id, username, position }) => {
          if (id !== playerId)
            return (
              <Player position={position} gameServer={1} isControllable={false} key={id} id={id} username={username} />
            );
          return <Player gameServer={1} isControllable id={playerId} position={position} key={id} />;
        })}
    </GameWrapper>
  );
};
