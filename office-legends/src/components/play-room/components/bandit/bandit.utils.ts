import { MessageInstance } from 'antd/es/message/interface';

export const getReward = (results: number[], message: MessageInstance, duration: number) => {
  const isWin = results.every((result) => result === results[0]);

  if (isWin) {
    switch (results[0]) {
      case 2: {
        setTimeout(() => message.success('You won 15$'), duration * 1000);
        return 15;
      }
      case 1: {
        setTimeout(() => message.success('You won 30$'), duration * 1000);
        return 30;
      }
      default: {
        setTimeout(() => message.success('You won 50$'), duration * 1000);
        return 50;
      }
    }
  } else {
    setTimeout(() => message.error({ content: 'You lose, try again!', key: 'playroom-lose' }), duration * 1000);
  }
  return 0;
};
