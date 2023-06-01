export type PlayerProps = {
  gameServer: number;
  isControllable: true;
  username?: never;
  id: number;
};

export type NPCProps = {
  gameServer: number;
  isControllable: false;
  username: string;
  id: number;
};
