import { keyframes, styled } from 'styled-components';
import { colors } from 'styles';
import { DirectionsType } from 'types';
import { variables } from 'variables';

import playerBottom1 from '../../assets/images/player1/bottom1.png';
import playerBottom2 from '../../assets/images/player1/bottom2.png';
import playerBottom3 from '../../assets/images/player1/bottom3.png';
import playerBottom4 from '../../assets/images/player1/bottom4.png';
import playerLeft1 from '../../assets/images/player1/left1.png';
import playerLeft2 from '../../assets/images/player1/left2.png';
import playerLeft3 from '../../assets/images/player1/left3.png';
import playerLeft4 from '../../assets/images/player1/left4.png';
import playerRight1 from '../../assets/images/player1/right1.png';
import playerRight2 from '../../assets/images/player1/right2.png';
import playerRight3 from '../../assets/images/player1/right3.png';
import playerRight4 from '../../assets/images/player1/right4.png';
import playerTop1 from '../../assets/images/player1/top1.png';
import playerTop2 from '../../assets/images/player1/top2.png';
import playerTop3 from '../../assets/images/player1/top3.png';
import playerTop4 from '../../assets/images/player1/top4.png';

let defaultImage: string = playerBottom1;

const getAnimation = (direction: DirectionsType | null) => {
  const getImage1 = () => {
    if (direction === 'top') defaultImage = playerTop1;
    if (direction === 'bottom') defaultImage = playerBottom1;
    if (direction === 'left') defaultImage = playerLeft1;
    if (direction === 'right') defaultImage = playerRight1;
    return defaultImage;
  };
  const getImage2 = () => {
    if (direction === 'top') return playerTop2;
    if (direction === 'bottom') return playerBottom2;
    if (direction === 'left') return playerLeft2;
    if (direction === 'right') return playerRight2;
    return playerTop2;
  };
  const getImage3 = () => {
    if (direction === 'top') return playerTop3;
    if (direction === 'bottom') return playerBottom3;
    if (direction === 'left') return playerLeft3;
    if (direction === 'right') return playerRight3;
    return playerTop3;
  };
  const getImage4 = () => {
    if (direction === 'top') return playerTop4;
    if (direction === 'bottom') return playerBottom4;
    if (direction === 'left') return playerLeft4;
    if (direction === 'right') return playerRight4;
    return playerTop4;
  };

  return keyframes`
  0% {  background-image: url(${getImage1()}); }
  25% {  background-image: url(${getImage2()}); }
  75% {  background-image: url(${getImage3()}); }
  100% {  background-image: url(${getImage4()}); }
 `;
};

type PlayerStyleProps = {
  $direction: DirectionsType | null;
};

export const Player = styled.div<PlayerStyleProps>`
  width: ${variables.PLAYER_WIDTH}px;
  height: ${variables.PLAYER_HEIGHT}px;
  position: absolute;
  background-repeat: no-repeat;
  animation-name: ${({ $direction }) => getAnimation($direction)};
  animation-play-state: ${({ $direction }) => ($direction === null ? 'paused' : 'running')};
  animation-duration: 0.95s;
  animation-iteration-count: infinite;
`;

export const PlayerName = styled.div`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  width: fit-content;
  background-color: ${colors.black}ab;
  color: white;
  padding: 2px 10px;
`;
