import MainLayout from '@/components/layouts/MainLayout';
import { joinGroup } from '@/lib/supabase/apis/group';
import { useUser } from '@/store/useUser';
import { KAKAO_LOGIN_URL } from '@/utils/const';
import { pickFirst } from '@/utils/array';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFetchInvitationInfo } from '@/hooks/useFetchInvitationInfo';
import { useFetchJoinedGroupList } from '@/hooks/useFetchJoinedGroupList';

// @note: root page flow
// 1-1. 로그인 여부 확인 -> 로그인되어 있다면 참여한 그룹 리스트 확인
// 1-2. 초대코드로 그룹 정보 확인
//
// 2-1. 로그인 x -> 초대코드 유효 시 초대 메시지 노출
//                 그렇지 않다면 웰컴 메시지 노출
// 2-2. 로그인 o -> 초대코드 유효 시 해당 그룹에 가입되어 있는지 확인
//                 -> 가입되어 있지 않다면, 자동 가입 후 해당 그룹 홈으로 이동
//                    가입되어 있다면, 해당 그룹 홈으로 이동
//                초대코드 유효하지 않으면 속한 그룹 중 하나의 홈으로 이동.

const RootPage = () => {
  const router = useRouter();
  const code = pickFirst(router.query.code);

  const { user, isLoading: isLoadingUser, setGroupId } = useUser();
  const invitationInfoQuery = useFetchInvitationInfo(code);
  const joinedGroupListQuery = useFetchJoinedGroupList(user);

  useEffect(() => {
    const run = async () => {
      if (isLoadingUser || !user) return;
      if (joinedGroupListQuery.isLoading) return;
      if (code && invitationInfoQuery.isLoading) return;

      const invitationInfo = invitationInfoQuery.data;
      const joinedGroupList = joinedGroupListQuery.data ?? [];

      if (invitationInfo) {
        const needToJoin = joinedGroupList.every((group) => group.id !== invitationInfo.group_id);
        if (needToJoin) {
          await joinGroup(user.id, invitationInfo.group_id, invitationInfo.creator_id);
        }
        setGroupId(invitationInfo.group_id);
        return Router.replace('/bucketlist');
      }

      if (joinedGroupList.length > 0) {
        setGroupId(joinedGroupList[0].id);
        return Router.replace('/bucketlist');
      } else {
        // @todo: 에러 페이지로 이동
      }
    };
    run();
  }, [
    code,
    user,
    invitationInfoQuery.data,
    joinedGroupListQuery.data,
    isLoadingUser,
    invitationInfoQuery.isLoading,
    joinedGroupListQuery.isLoading,
    setGroupId,
  ]);

  return (
    <MainLayout hideBottomNavigation>
      <p>
        {invitationInfoQuery.data
          ? `${invitationInfoQuery.data.users.nickname}님이 당신을\n${invitationInfoQuery.data.groups.name} 그룹으로 초대합니다.`
          : '가까운 사람들과\n일정, 버킷리스트를 함께 공유해보세요.'}
      </p>
      <a href={KAKAO_LOGIN_URL}>카카오 로그인</a>
    </MainLayout>
  );
};

export default RootPage;
