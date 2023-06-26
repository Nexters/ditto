import { updateGroup } from '@/lib/supabase/apis/group';
import { GROUP_KEY } from '@/utils/const';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type UpdateGroupParams = {
  groupId: number;
  groupName?: string;
  groupIsOpenedEvents?: boolean;
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ groupId, groupName, groupIsOpenedEvents }: UpdateGroupParams) => {
      const group = await updateGroup(groupId, { name: groupName, is_opened_events: groupIsOpenedEvents });
      return group;
    },
    {
      onSuccess: (group) => {
        queryClient.setQueryData(GROUP_KEY.detail([group.id]), group);
      },
    }
  );
};
