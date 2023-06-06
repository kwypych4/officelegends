import { App } from 'antd';
import { api } from 'api';
import { useCustomMutation } from 'hooks';
import { useState } from 'react';
import { useGameStore, useUserStore } from 'store';

import * as Styled from './bandit.styled';
import { getReward } from './bandit.utils';
import { BanditBar, Instruction } from './components';

export const Bandit = () => {
  const { message } = App.useApp();
  const [banditResult, setBanditResult] = useState(new Array<number>(3).fill(1));
  const { isPlayroomOpened } = useGameStore();
  const { money, credits } = useUserStore();

  const duration = 0.5;
  const okText = credits ? 'Spin!' : 'Try luck!';

  const startGameMutation = useCustomMutation(api.player.updatePlayer, {
    mutationKey: 'updatePlayer',
    onSuccess: (success) => {
      useUserStore.setState({
        credits: success?.credits,
        money: success?.money,
        exp: success?.exp,
      });
    },
  });

  const handlePlayroomClose = () => {
    setBanditResult(new Array<number>(3).fill(1));
    useGameStore.setState({ isPlayroomOpened: false });
  };

  const buyCredits = () => {
    if (money && money >= 10) return startGameMutation.mutateAsync({ money: money - 10, credits: (credits || 0) + 5 });

    return message.error({ content: `You don't have enough money to start game :(`, key: 'playroom-lose' });
  };

  const handleSpin = () => {
    const results = Array.from({ length: banditResult.length }, () => Math.floor(Math.random() * 3 + 1));
    setBanditResult(results);

    const reward = getReward(results, message, duration);

    if (credits && money) startGameMutation.mutateAsync({ credits: credits - 1, money: money + reward });
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
      closeIcon='X'
    >
      <BanditBar banditResult={banditResult} credits={credits || 0} duration={duration} />
      <Instruction />
    </Styled.Wrapper>
  ) : null;
};
