import { MyPageHeader, MY_PAGE_HEADER_HEIGHT } from '@/components/header/MyPageHeader';
import MainLayout from '@/components/layouts/MainLayout';
import { MemberList } from '@/components/memberList/MemberList';
import AlarmSettingModal from '@/components/modals/AlarmSettingModal';
import CreateGroupModal from '@/components/modals/CreateGroupModal';
import ShareEventModal from '@/components/modals/ShareEventModal';
import { NextPageWithLayout } from '@/pages/_app';
import { useUser } from '@/store/useUser';
import theme from '@/styles/theme';
import { INQUIRY_CHANNEL_URL } from '@/utils/const';
import { useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled';

const MyPage: NextPageWithLayout = () => {
  const createGroupModalProps = useDisclosure();
  const shareEventModalProps = useDisclosure();
  const alarmSettingModalProps = useDisclosure();

  const { logout } = useUser();

  const goToOpenInquiryChannel = () => {
    window.open(INQUIRY_CHANNEL_URL, '_blank');
  };

  return (
    <MainLayout header={<MyPageHeader />} headerHeight={MY_PAGE_HEADER_HEIGHT}>
      <MemberList />
      <OtherButton onClick={shareEventModalProps.onOpen}>일정 설정</OtherButton>
      <OtherButton onClick={alarmSettingModalProps.onOpen}>알림 설정</OtherButton>
      <OtherButton onClick={createGroupModalProps.onOpen}>새 그룹 만들기</OtherButton>
      <OtherButton onClick={goToOpenInquiryChannel}>문의하기</OtherButton>
      <OtherButton onClick={logout}>로그아웃</OtherButton>

      <CreateGroupModal isOpen={createGroupModalProps.isOpen} onClose={createGroupModalProps.onClose} />
      <ShareEventModal isOpen={shareEventModalProps.isOpen} onClose={shareEventModalProps.onClose} />
      <AlarmSettingModal isOpen={alarmSettingModalProps.isOpen} onClose={alarmSettingModalProps.onClose} />
    </MainLayout>
  );
};

MyPage.isProtectedPage = true;

export default MyPage;

const OtherButton = styled.button`
  width: 100%;
  padding: 22px 20px;
  text-align: left;
  border-bottom: 1px solid ${theme.colors.grey[2]};
  ${theme.textStyles.buttonMedium};
  color: ${theme.colors.grey[10]};
`;
