import { App } from 'antd';
import { useState } from 'react';
import { useGameStore, useUserStore } from 'store';

import * as Styled from './bandit.styled';
import { getReward } from './bandit.utils';
import { BanditBar, Instruction } from './components';

export const Bandit = () => {
  const { message } = App.useApp();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [banditResult, setBanditResult] = useState(new Array<number>(3).fill(1));
  const { isPlayroomOpened } = useGameStore();
  const { money, credits, exp } = useUserStore();
  const { socket } = useGameStore();
  const duration = 0.5;
  const okText = credits ? 'Spin!' : 'Try luck!';

  const handlePlayroomClose = () => {
    setBanditResult(new Array<number>(3).fill(1));
    useGameStore.setState({ isPlayroomOpened: false });
  };

  const buyCredits = () => {
    if (money && money >= 10)
      return socket.emit('updatePlayer', { money: money - 10, credits: (credits || 0) + 5, exp: (exp || 0) + 100 });

    return message.error({ content: `You don't have enough money to start game`, key: 'playroom-lose' });
  };

  const handleSpin = () => {
    setIsButtonDisabled(true);
    const results = Array.from({ length: banditResult.length }, () => Math.floor(Math.random() * 3 + 1));
    setBanditResult(results);
    const reward = getReward(results, message, duration);

    setTimeout(() => setIsButtonDisabled(false), duration * 1000);

    if (credits && money)
      socket.emit('updatePlayer', { credits: credits - 1, money: money + reward, exp: (exp || 0) + reward });
  };

  const okButtonHandler = () => {
    if (credits && credits > 0) return handleSpin();

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
      okButtonProps={{
        disabled: isButtonDisabled,
      }}
      closeIcon='X'
    >
      <BanditBar banditResult={banditResult} credits={credits || 0} duration={duration} />
      <Instruction />
    </Styled.Wrapper>
  ) : null;
};
