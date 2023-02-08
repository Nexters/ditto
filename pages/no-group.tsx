import MainLayout from '@/components/layouts/MainLayout';
import { KAKAO_LOGOUT_URL } from '@/utils/const';

// 필요한 기능
// - 카카오 로그아웃
// - 문의하기 버튼
const NoGroupPage = () => {
  return (
    <MainLayout hideBottomNavigation>
      <h1>참여한 그룹이 없습니다.</h1>
      <p>
        새 그룹을 생성하고 싶다면 <u>서비스 관리자에게 문의</u>해주세요.
      </p>
      <a href={KAKAO_LOGOUT_URL}>카카오 계정 로그아웃</a>
    </MainLayout>
  );
};

export default NoGroupPage;
