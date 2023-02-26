import { ErrorPageTemplate } from '@/components/errors/ErrorPageTemplate';
import MainLayout from '@/components/layouts/MainLayout';
import CreateGroupModal from '@/components/modals/CreateGroupModal';
import theme from '@/styles/theme';
import { KAKAO_LOGOUT_URL } from '@/utils/const';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { NextPageWithLayout } from './_app';

const NoGroupPage: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MainLayout hideBottomNavigation>
      <ErrorPageTemplate
        title={'참여한 그룹이 없습니다.'}
        description={
          <>
            새 그룹을 생성하고 싶다면
            <br />
            {/* 임시로 그룹 생성 버튼 추가함 */}
            <TextButton onClick={onOpen}>여기를 클릭해주세요.</TextButton>
          </>
        }
      >
        <LogoutButton as={'a'} href={KAKAO_LOGOUT_URL}>
          {'카카오 계정 로그아웃'}
        </LogoutButton>
      </ErrorPageTemplate>

      <CreateGroupModal isOpen={isOpen} onClose={onClose} />
    </MainLayout>
  );
};

NoGroupPage.isProtectedPage = true;

export default NoGroupPage;

const TextButton = styled.button`
  color: ${theme.colors.hyperlink};
`;
const LogoutButton = styled(Button)`
  padding: 17px 24px;
  height: 50px;
  border-radius: 25px;
  background-color: ${theme.colors.grey[10]};
  ${theme.textStyles.buttonMedium};
  color: ${theme.colors.white};
`;
