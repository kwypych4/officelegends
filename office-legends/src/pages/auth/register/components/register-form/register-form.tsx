import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, Form, Input } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { api } from 'api';
import { useCustomMutation } from 'hooks/use-custom-mutation';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useUserStore } from 'store';
import { appRoutes } from 'urls';

import avatar1 from '../../../../../assets/images/avatar_1.png';
import avatar2 from '../../../../../assets/images/avatar_2.png';
import avatar3 from '../../../../../assets/images/avatar_3.png';
import avatar4 from '../../../../../assets/images/avatar_4.png';
import { getRepeatPasswordRules, validationSchema } from './register-form.schema';
import * as Styled from './register-form.styled';
import { FormInputs } from './register-form.types';

export const RegisterForm = () => {
  const [avatar, setAvatar] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const carouselRef = useRef<CarouselRef | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const mutateLogin = useCustomMutation(api.auth.register, {
    mutationKey: 'register',
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
    message: {
      onSuccess: 'You have been registered correctly!',
      useResponseErrorMessage: true,
    },
  });

  const handleFinish = () => {
    const payload = {
      username: form.getFieldValue(FormInputs.username),
      password: form.getFieldValue(FormInputs.password),
      avatarId: avatar,
    };

    mutateLogin.mutateAsync({ ...payload });
  };

  const onSlideChange = (currentSlide: number) => {
    setAvatar(currentSlide + 1);
    setIsButtonDisabled(false);
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
      <label htmlFor='avatar'>
        <p>Avatar:</p>{' '}
        <Styled.AvatarWrapper id='avatar'>
          <button type='button' onClick={() => carouselRef.current?.prev()}>
            <LeftOutlined />
          </button>
          <Carousel
            beforeChange={() => setIsButtonDisabled(true)}
            afterChange={onSlideChange}
            waitForAnimate
            dots={false}
            ref={carouselRef}
          >
            <img src={avatar1} alt='Avatar 1 - Man with glasses' />
            <img src={avatar2} alt='Avatar 2 - Woman with white collar' />
            <img src={avatar3} alt='Avatar 3 - Man in orange shirt' />
            <img src={avatar4} alt='Avatar 2 - Woman with black ponytails' />
          </Carousel>
          <button type='button' onClick={() => carouselRef.current?.next()}>
            <RightOutlined />
          </button>
        </Styled.AvatarWrapper>
      </label>

      <Styled.ButtonWrapper>
        <button disabled={isButtonDisabled} type='submit'>
          Register new user
        </button>
        <button onClick={() => navigate(appRoutes.auth.login)} type='button'>
          Go back to login
        </button>
      </Styled.ButtonWrapper>
    </Form>
  );
};
