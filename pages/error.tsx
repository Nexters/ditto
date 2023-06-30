import { ErrorPageTemplate } from '@/components/errors/ErrorPageTemplate';
import MainLayout from '@/components/layouts/MainLayout';
import theme from '@/styles/theme';
import styled from '@emotion/styled';

const ErrorPage = () => {
  return (
    <MainLayout hideBottomNavigation>
      <ErrorPageTemplate title="앗 뭔가 문제가 발생했습니다..." description="새로 고침하거나 홈으로 재접속해보세요">
        <GoRootPageButton onClick={() => (location.href = '/')}>홈으로 돌아가기</GoRootPageButton>
      </ErrorPageTemplate>
    </MainLayout>
  );
};

export default ErrorPage;

const GoRootPageButton = styled.button`
  padding: 17px 24px;
  height: 50px;
  border-radius: 25px;
  background-color: ${theme.colors.grey[10]};
  ${theme.textStyles.buttonMedium};
  color: ${theme.colors.white};
`;
