import MainLayout from '@/components/layouts/MainLayout';
import { joinGroup } from '@/lib/supabase/apis/group';
import { useUser } from '@/store/useUser';
import { KAKAO_LOGIN_URL } from '@/utils/const';
import { pickFirst } from '@/utils/array';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFetchInvitationInfo } from '@/hooks/useFetchInvitationInfo';
import { useFetchJoinedGroupList } from '@/hooks/useFetchJoinedGroupList';
import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { TutorialSwiper } from '@/components/login/TutorialSwiper';
import { KakaoIcon } from '@/components/icons';

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
  const code = pickFirst(router.query.code) ?? pickFirst(router.query.state);

  const { user, isLoading: isLoadingUser, selectedGroupId, setGroupId } = useUser();
  const { data: invitationInfo, isLoading: isLoadingInvitationInfo } = useFetchInvitationInfo(code);
  const { data: joinedGroupList = [], isLoading: isLoadingJoinedGroupList } = useFetchJoinedGroupList(user);

  useEffect(() => {
    if (isLoadingUser || !user) return;
    if (isLoadingJoinedGroupList) return;
    if (code && isLoadingInvitationInfo) return;

    (async () => {
      if (invitationInfo) {
        const needToJoin = joinedGroupList.every((group) => group.id !== invitationInfo.group_id);
        if (needToJoin) {
          await joinGroup(user.id, invitationInfo.group_id, invitationInfo.creator_id);
        }
        setGroupId(invitationInfo.group_id);
        return Router.replace('/bucketlist');
      }

      if (joinedGroupList.length > 0) {
        if (!selectedGroupId) {
          setGroupId(joinedGroupList[0].id);
        }
        return Router.replace('/bucketlist');
      } else {
        return Router.replace('/no-group');
      }
    })();
  }, [
    code,
    user,
    isLoadingUser,
    isLoadingJoinedGroupList,
    isLoadingInvitationInfo,
    joinedGroupList,
    invitationInfo,
    setGroupId,
    selectedGroupId,
  ]);

  return (
    <MainLayout hideBottomNavigation>
      <VStack flex={1} justifyContent={'center'} spacing={30}>
        <Heading as="h2" whiteSpace={'pre-line'} fontSize={16} textAlign={'center'} fontWeight={400}>
          {invitationInfo ? (
            <>
              <b>{invitationInfo?.users.nickname}</b>
              {'님이 당신을\n'}
              <b>{invitationInfo?.groups.name}</b>
              {'으로 초대합니다.'}
            </>
          ) : (
            '가까운 사람들과 일정, 버킷리스트를\n함께 작성하고 관리해보세요.'
          )}
        </Heading>

        <TutorialSwiper />

        <Button
          width={280}
          height={50}
          backgroundColor="#FEE500"
          borderRadius={'8px'}
          color="#000"
          as="a"
          href={KAKAO_LOGIN_URL(code)}
        >
          <KakaoIcon />
          <Text paddingLeft={'4px'} fontSize={'16px'} lineHeight={'1'}>
            카카오 로그인
          </Text>
        </Button>
      </VStack>
      {/* </Center> */}
    </MainLayout>
  );
};

export default RootPage;
