// import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { App, Form, Input } from 'antd';
import { api } from 'api';
import { AxiosError } from 'axios';
import { useCustomMutation } from 'hooks/use-custom-mutation';
// import { AxiosError } from 'axios';
// import { useCustomMutation } from 'hooks';
import { useNavigate } from 'react-router-dom';

// import { useAuthStore, useUserStore } from 'store';
// import { decodeToken } from 'utils';
import { validationSchema } from './login-form.schema';
import { FormInputs } from './login-form.types';

export const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const { notification } = App.useApp();
  const mutateLogin = useCustomMutation(api.auth.login, {
    onSuccess: () => {
      // const { firstName, lastName, role, userId, username, isThemeDark } = decodeToken(accessToken);
      // useAuthStore.setState({ isLogged: true, accessToken });
      // useUserStore.setState({ firstName, lastName, role, userId, username, isThemeDark });

      navigate('/');
    },
    onError: (error: AxiosError<{ error: string }>) => {
      console.log(error);
      // notification.error({ message: error.response?.data.error });
    },
  });

  const handleFinish = () => {
    const payload = {
      username: form.getFieldValue(FormInputs.username),
      password: form.getFieldValue(FormInputs.password),
      test: 2123,
    };

    console.log(payload);
    mutateLogin.mutateAsync({ password: payload.password, username: payload.username });
  };

  return (
    <Form form={form} requiredMark={false} onFinish={handleFinish}>
      <Form.Item name={FormInputs.username} rules={validationSchema[FormInputs.username]} label='Username'>
        <Input />
      </Form.Item>
      <Form.Item name={FormInputs.password} rules={validationSchema[FormInputs.password]} label='Password'>
        <Input type='password' />
      </Form.Item>
      <button>
        {/* <FontAwesomeIcon icon={faUnlockKeyhole} /> */}
        Login
      </button>
    </Form>
  );
};
