import styled from '@emotion/styled';
import Image from 'next/image';

export type MemberItemProps = {
  nickname: string;
  profileImage?: string | null;
  isMe?: boolean;
};
export const MemberItem = ({ nickname, profileImage, isMe }: MemberItemProps) => {
  return (
    <MemberItemWrap>
      <MemberItemProfileImage src={profileImage || ''} alt={`${nickname}의 프로필 이미지`} width={48} height={48} />
      {isMe && <MemberItemIsMe>나</MemberItemIsMe>}
      <MemberItemNickname>{nickname}</MemberItemNickname>
    </MemberItemWrap>
  );
};

const MemberItemWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0 12px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey['2']};
`;
const MemberItemProfileImage = styled(Image)`
  width: 48px;
  height: 48px;
  margin-right: 16px;
  object-fit: cover;
  border-radius: 50%;
`;
const MemberItemIsMe = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 17px;
  height: 17px;
  background-color: ${(props) => props.theme.colors.grey['9']};
  border-radius: 50%;
  margin-right: 4px;

  color: ${(props) => props.theme.colors.white};
  font-weight: 700;
  font-size: 11px;
  line-height: 100%;
  letter-spacing: 0.025em;
`;
const MemberItemNickname = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.015em;
`;
