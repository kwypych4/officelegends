import avatar1 from '../../assets/images/avatar_1.png';
import avatar2 from '../../assets/images/avatar_2.png';
import avatar3 from '../../assets/images/avatar_3.png';
import avatar4 from '../../assets/images/avatar_4.png';
import * as Styled from './frames.styled';

type FramesProps = {
  topPlayersList: {
    id: number;
    avatar: number;
    exp: number;
    username: string;
  }[];
};

const getAvatar = (avatarId: number) => {
  switch (avatarId) {
    case 1:
      return avatar1;
    case 2:
      return avatar2;
    case 3:
      return avatar3;
    default:
      return avatar4;
  }
};

export const Frames = ({ topPlayersList }: FramesProps) => {
  return (
    <Styled.Wrapper>
      {topPlayersList?.map(({ id, avatar, exp, username }) => (
        <Styled.FrameWrapper key={id}>
          <img src={getAvatar(avatar)} alt='avatar' />
          <Styled.Frame />
          <Styled.FrameSignature>
            <p>{username}</p>
            <p>{exp} EXP</p>
          </Styled.FrameSignature>
        </Styled.FrameWrapper>
      ))}
    </Styled.Wrapper>
  );
};
