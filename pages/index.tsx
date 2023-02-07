import MainLayout from '@/components/layouts/MainLayout';
import { getJoinedGroupList, joinGroup } from '@/lib/supabase/apis/group';
import { getInvitationInfo } from '@/lib/supabase/apis/invitation';
import { useUser } from '@/store/useUser';
import { KAKAO_LOGIN_URL } from '@/utils/const';
import { pickFirst } from '@/utils/array';
import { useQuery } from '@tanstack/react-query';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
  // @note: 유저 정보를 받아온 후에 root page를 보여줄 지 여부를 결정하기 위함
  const [showRootPage, setShowRootPage] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (isLoadingUser) return;
      if (code && invitationInfoQuery.isLoading) return;
      if (joinedGroupListQuery.isLoading) return;

      const invitationInfo = invitationInfoQuery.data;
      const joinedGroupList = joinedGroupListQuery.data ?? [];

      if (!user) {
        setShowRootPage(true);
        return;
      }

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
        setShowRootPage(true);
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
      {showRootPage ? (
        <>
          <p>
            {invitationInfoQuery.data
              ? `${invitationInfoQuery.data.users.nickname}님이 당신을\n${invitationInfoQuery.data.groups.name} 그룹으로 초대합니다.`
              : '가까운 사람들과\n일정, 버킷리스트를 함께 공유해보세요.'}
          </p>
          <a href={KAKAO_LOGIN_URL}>카카오 로그인</a>
        </>
      ) : (
        // @todo: 깜빡임 방지를 위해 적절한 로딩페이지로 변경할 것.
        'loading'
      )}
    </MainLayout>
  );
};

export default RootPage;
