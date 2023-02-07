import MainLayout from '@/components/layouts/MainLayout';
import { getJoinedGroupList, joinGroup } from '@/lib/supabase/apis/group';
import { getInvitationInfo } from '@/lib/supabase/apis/invitation';
import { useUser } from '@/store/useUser';
import { KAKAO_LOGIN_URL } from '@/utils/const';
import { pickFirst } from '@/utils/array';
import { useQuery } from '@tanstack/react-query';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';

// @note: root page flow
// 1-1. 로그인 여부 확인 -> 로그인되어있다면 참여한 그룹 리스트 확인
// 1-2. 초대코드로 그룹 정보 확인 -> 웰컴 메시지 노출
// 2-1. 초대코드 유효 o + 로그인 x -> 초대 메시지 노출
// 2-2. 초대코드 유효 o + 로그인 o -> 해당 그룹에 가입되어있다면, 자동 가입 후 해당 그룹 홈으로 이동
//                               가입되어있지 않다면, 그 그룹 홈으로 이동.
// 2-3. 초대코드 유효 x + 로그인 x -> 웰컴 메시지 노출
// 2-4. 초대코드 유효 x + 로그인 o -> 속한 그룹 중 하나의 홈으로 이동

const RootPage = () => {
  const router = useRouter();
  const code = pickFirst(router.query.code);

  const { user, isLoading: isLoadingUser } = useUser();
  const invitationInfoQuery = useQuery(
    ['code', code],
    async () => {
      if (!code) throw 'code is null';
      return await getInvitationInfo(code);
    },
    { enabled: !!code }
  );
  const joinedGroupListQuery = useQuery(
    ['groups', user],
    async () => {
      if (!user) throw 'need to login';
      return await getJoinedGroupList(user.id);
    },
    { enabled: !!user }
  );

  useEffect(() => {
    const run = async () => {
      if (isLoadingUser) return;
      if (code && invitationInfoQuery.isLoading) return;
      if (joinedGroupListQuery.isLoading) return;

      const invitationInfo = invitationInfoQuery.data;
      const joinedGroupList = joinedGroupListQuery.data ?? [];

      if (user) {
        if (invitationInfo) {
          const needToJoin = joinedGroupList.every((group) => group.id !== invitationInfo.group_id);
          if (needToJoin) {
            await joinGroup(user.id, invitationInfo.group_id, invitationInfo.creator_id);
          }
          return Router.push('/' + invitationInfo.group_id);
        }

        if (joinedGroupList.length > 0) {
          Router.push('/' + joinedGroupList[0].id);
        }
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
