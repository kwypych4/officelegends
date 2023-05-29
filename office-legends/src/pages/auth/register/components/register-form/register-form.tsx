import { Form, Input } from 'antd';
import { api } from 'api';
import { useCustomMutation } from 'hooks/use-custom-mutation';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store';
import { appRoutes } from 'urls';

import { getRepeatPasswordRules, validationSchema } from './register-form.schema';
import { FormInputs } from './register-form.types';

export const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const mutateLogin = useCustomMutation(api.auth.register, {
    mutationKey: 'register',
    onSuccess: () => {
      useAuthStore.setState({ isLogged: true });
      navigate(appRoutes.app.game);
    },
    message: {
      onSuccess: 'You have been registered correctly!',
    },
  });

  const handleFinish = () => {
    const payload = {
      username: form.getFieldValue(FormInputs.username),
      password: form.getFieldValue(FormInputs.password),
    };

    mutateLogin.mutateAsync({ ...payload });
  };

  return (
    <Form form={form} requiredMark={false} onFinish={handleFinish}>
      <Form.Item name={FormInputs.username} rules={validationSchema[FormInputs.username]} label='Username'>
        <Input />
      </Form.Item>
      <Form.Item name={FormInputs.password} rules={validationSchema[FormInputs.password]} label='Password'>
        <Input type='password' />
      </Form.Item>
      <Form.Item name={FormInputs.repeatPassword} rules={getRepeatPasswordRules(form)} label='Repeat password'>
        <Input type='password' />
      </Form.Item>
      <button>Register new user</button>
    </Form>
  );
};
