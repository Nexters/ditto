import { ModalBody } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import { HOSTING_URL } from '@/utils/const';
import { useFetchInvitations } from '@/hooks/invitation/useFetchInvitations';
import { useUser } from '@/store/useUser';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = () => {
  const { user, selectedGroupId } = useUser();
  const { data: invitations, isLoading } = useFetchInvitations(user?.id, selectedGroupId);
  const urls = invitations?.map((invitation) => `${HOSTING_URL}?code=${invitation.code}`);

  return (
    <ModalBody>
      <h2>초대 링크</h2>
      <p>아래 url을 공유해주세요</p>
      <div>{isLoading ? 'loading...' : urls?.[0]}</div>
    </ModalBody>
  );
};

const AddMemberModal = ({ isOpen, onClose }: AddMemberModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} />
);

export default AddMemberModal;
