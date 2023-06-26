import { useFetchMemberList } from '@/hooks/member/useFetchMemberList';
import { useUser } from '@/store/useUser';
import theme from '@/styles/theme';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { BlackDownIcon } from '../icons';
import InviteMemberModal from '../modals/InviteMemberModal';
import { MemberItem } from './MemberItem';
import { motion } from 'framer-motion';

export const MemberList = () => {
  const { user, selectedGroupId } = useUser();
  const { data } = useFetchMemberList(selectedGroupId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isShowList, setShowList] = useState(true);

  if (!user) return null;
  return (
    <>
      <MemberListWrap>
        <MemberListHeader>
          <span>멤버 리스트</span>
          <motion.button
            aria-label={isShowList ? '멤버 리스트 펼치기' : '멤버 리스트 숨기기'}
            onClick={() => setShowList(!isShowList)}
            variants={{
              show: { rotate: 180 },
              hide: { rotate: 0 },
            }}
            animate={isShowList ? 'show' : 'hide'}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <BlackDownIcon width={24} height={24} />
          </motion.button>
        </MemberListHeader>

        <motion.div
          variants={{
            show: { opacity: 1, height: 'auto', pointerEvents: 'auto' },
            hide: { opacity: 0, height: 0, pointerEvents: 'none' },
          }}
          animate={isShowList ? 'show' : 'hide'}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          <MemberItem key={user.id} nickname={user.nickname} profileImage={user.profile_image} isMe />
          {/* @note: 나 자신은 이미 가져온 정보를 활용한다. */}
          {data
            ?.filter((member) => member.id !== user.id)
            .map((member) => (
              <MemberItem key={member.id} nickname={member.nickname} profileImage={member.profile_image} />
            ))}
          <InviteMemberButton onClick={onOpen}>멤버 초대하기</InviteMemberButton>
        </motion.div>
      </MemberListWrap>

      <InviteMemberModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const MemberListWrap = styled.section`
  padding: 0 20px;
  border-bottom: 1px solid ${theme.colors.grey[2]};
  background-color: ${theme.colors.grey[1]};
`;
const MemberListHeader = styled.h3`
  padding: 12px 0;
  ${theme.textStyles.h3};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InviteMemberButton = styled(Button)`
  width: 100%;
  height: auto;
  margin: 20px 0;
  padding: 16px 0;
  ${theme.textStyles.buttonSmall};
  color: ${theme.colors.grey[1]};
  background-color: ${theme.colors.grey[10]};
`;
