import { ErrorPageTemplate } from '@/components/errors/ErrorPageTemplate';
import MainLayout from '@/components/layouts/MainLayout';
import { KAKAO_LOGOUT_URL } from '@/utils/const';
import { Button } from '@chakra-ui/button';
import styled from '@emotion/styled';

// 필요한 기능
// - 카카오 로그아웃
// - 문의하기 버튼
const NoGroupPage = () => {
  return (
    <MainLayout hideBottomNavigation>
      <ErrorPageTemplate
        title={'참여한 그룹이 없습니다.'}
        description={
          <>
            새 그룹을 생성하고 싶다면
            <br />
            <UnderlinedText>서비스 관리자에게 문의</UnderlinedText>해주세요.
          </>
        }
      >
        <Button
          as={'a'}
          href={KAKAO_LOGOUT_URL}
          padding={'17px 24px'}
          height={'50px'}
          backgroundColor={'#1A1919'}
          color={'white'}
          fontSize={'16px'}
          lineHeight={'1'}
          borderRadius={'25px'}
        >
          {'카카오 계정 로그아웃'}
        </Button>
      </ErrorPageTemplate>
    </MainLayout>
  );
};

const UnderlinedText = styled.a`
  color: #0080ff;
  text-decoration: underline;
`;

export default NoGroupPage;
