import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { useUser } from '@/store/useUser';
import Image from 'next/image';

const MyPage: NextPageWithLayout = () => {
  const { user, logout } = useUser();

  return (
    <>
      <h1>My Page</h1>
      <section>
        <h2>마이페이지</h2>
        <Image src={user?.profile_image || ''} alt="profile image" width={60} height={60} />
        <h3>{user?.nickname}</h3>
        <button onClick={logout}>로그아웃</button>
      </section>
    </>
  );
};

MyPage.getLayout = (page) => (
  <MainLayout>
    <PageHeader />
    {page}
  </MainLayout>
);

MyPage.isProtectedPage = true;

export default MyPage;
