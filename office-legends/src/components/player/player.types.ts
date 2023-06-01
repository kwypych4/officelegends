export type PlayerProps = {
  gameServer: number;
  isControllable: true;
  username?: never;
  id: number;
  position: {
    x: number;
    y: number;
  };
};

export type NPCProps = {
  gameServer: number;
  isControllable: false;
  username: string;
  id: number;
  position: {
    x: number;
    y: number;
  };
};
