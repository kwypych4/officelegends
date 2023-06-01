import { SettingFilled } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { api } from 'api';
import { useCustomMutation } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useGameStore, useUserStore } from 'store';
import { appRoutes } from 'urls';

import * as Styled from './settings.styled';

export const Settings = () => {
  const navigate = useNavigate();
  const { socket } = useGameStore();
  const logoutMutation = useCustomMutation(api.auth.logout, {
    onSuccess: () => {
      useAuthStore.setState({ isLogged: false });
      useUserStore.setState({
        avatar: null,
        exp: null,
        gameServer: null,
        id: null,
        money: null,
        skin: null,
        username: null,
      });
      navigate(appRoutes.auth.login);
    },
    onError: () => {
      useAuthStore.setState({ isLogged: false });
      useUserStore.setState({
        avatar: null,
        exp: null,
        gameServer: null,
        id: null,
        money: null,
        skin: null,
        username: null,
      });
      navigate(appRoutes.auth.login);
    },
    message: {
      onSuccess: 'You have been logged out!',
      onError: 'Occured an problem with logging you out!',
    },
  });

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Logout',
      onClick: () => {
        socket.emit('leave');
        logoutMutation.mutateAsync();
      },
    },
  ];

  return (
    <Styled.Dropdown menu={{ items }}>
      <SettingFilled />
    </Styled.Dropdown>
  );
};
