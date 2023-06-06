import { Form, Input } from 'antd';
import { api } from 'api';
import { useCustomMutation } from 'hooks/use-custom-mutation';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useUserStore } from 'store';
import { appRoutes } from 'urls';

import { validationSchema } from './login-form.schema';
import { FormInputs } from './login-form.types';

export const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const mutateLogin = useCustomMutation(api.auth.login, {
    mutationKey: 'login',

    onSuccess: ({ avatar, exp, gameServer, id, money, skin, username, credits }) => {
      useAuthStore.setState({ isLogged: true });
      useUserStore.setState({ avatar, exp, gameServer, id, money, skin, username, credits });
      navigate(appRoutes.app.game);
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
        credits: null,
      });
    },
  });

  const handleFinish = () => {
    const payload = {
      username: form.getFieldValue(FormInputs.username),
      password: form.getFieldValue(FormInputs.password),
    };

    mutateLogin.mutateAsync({ ...payload });
  };

  const handleRegisterButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    navigate(appRoutes.auth.register);
  };
  return (
    <Form form={form} requiredMark={false} onFinish={handleFinish}>
      <Form.Item name={FormInputs.username} rules={validationSchema[FormInputs.username]} label='Username'>
        <Input />
      </Form.Item>
      <Form.Item name={FormInputs.password} rules={validationSchema[FormInputs.password]} label='Password'>
        <Input type='password' />
      </Form.Item>
      <div>
        <button type='button' onClick={handleRegisterButton}>
          Register
        </button>
        <button type='submit'>Login</button>
      </div>
    </Form>
  );
};
