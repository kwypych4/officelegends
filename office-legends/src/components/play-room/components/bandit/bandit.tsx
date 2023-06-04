import { App } from 'antd';
import { useState } from 'react';
import { useGameStore, useUserStore } from 'store';

import * as Styled from './bandit.styled';
import { BanditBar, Instruction } from './components';

export const Bandit = () => {
  const { message } = App.useApp();
  const [credits, setCredits] = useState(0);
  const [banditResult, setBanditResult] = useState(new Array<number>(3).fill(1));
  const { isPlayroomOpened } = useGameStore();
  const { money } = useUserStore();
  const handlePlayroomClose = () => {
    setBanditResult(new Array<number>(3).fill(1));
    useGameStore.setState({ isPlayroomOpened: false });
  };

  const duration = 0.5;
  const okText = credits ? 'Spin!' : 'Try luck!';

  const buyCredits = () => {
    if (money && money >= 10) return setCredits(5);

    return message.error({ content: `You don't have enough money to start game :(`, key: 'playroom-lose' });
  };

  const handleSpin = () => {
    setCredits((prevState) => prevState - 1);
    const results = Array.from({ length: banditResult.length }, () => Math.floor(Math.random() * 3 + 1));
    setBanditResult(results);

    const isWin = results.every((result) => result === results[0]);

    if (isWin) {
      switch (results[0]) {
        case 2:
          return setTimeout(() => message.success('You won 15$'), duration * 1000);
        case 1:
          return setTimeout(() => message.success('You won 30$'), duration * 1000);
        default:
          return setTimeout(() => message.success('You won 50$'), duration * 1000);
      }
    }

    return setTimeout(() => message.error({ content: 'You lose, try again!', key: 'playroom-lose' }), duration * 1000);
  };

  const okButtonHandler = () => {
    if (credits > 0) return handleSpin();

    return buyCredits();
  };

  return isPlayroomOpened ? (
    <Styled.Wrapper
      title='One-Handed bandit'
      open={isPlayroomOpened}
      onOk={okButtonHandler}
      onCancel={handlePlayroomClose}
      width={700}
      okText={okText}
      closeIcon='X'
    >
      <BanditBar banditResult={banditResult} credits={credits} duration={duration} />
      <Instruction />
    </Styled.Wrapper>
  ) : null;
};
