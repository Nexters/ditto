import MainLayout from '@/components/layouts/MainLayout';
import { MemberList } from '@/components/memberList/MemberList';
import { NextPageWithLayout } from '@/pages/_app';
import { useUser } from '@/store/useUser';
import styled from '@emotion/styled';

const MyPage: NextPageWithLayout = () => {
  const { logout } = useUser();

  return (
    <MainLayout>
      <MyPageHeader>My Page</MyPageHeader>
      <section>
        <MemberList />
        <MyPageDivider />
        <OtherButton>새 그룹 만들기</OtherButton>
        <OtherButton>문의하기</OtherButton>
        <OtherButton onClick={logout}>로그아웃</OtherButton>
      </section>
    </MainLayout>
  );
};

MyPage.isProtectedPage = true;

export default MyPage;

const MyPageHeader = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  padding: 0 20px;
  ${(props) => props.theme.textStyles.h3}
  border-bottom: 1px solid ${(props) => props.theme.colors.grey['2']};
`;

const MyPageDivider = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f3f5f5;
`;

const OtherButton = styled.button`
  width: 100%;
  padding: 22px 20px;
  text-align: left;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey[2]};
  ${(props) => props.theme.textStyles.buttonMedium}
  color: ${(props) => props.theme.colors.grey[10]};
`;
