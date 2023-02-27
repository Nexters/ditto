import { createGroup, joinGroup, createDefaultBucketFolder } from '@/lib/supabase/apis/group';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GROUP_KEY } from '../queries/keys';

export type CreateGroupParams = {
  userId: number;
  groupName: string;
};

export const useMutateCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ userId, groupName }: CreateGroupParams) => {
      const group = await createGroup(userId, groupName);
      await joinGroup(userId, group.id);
      await createDefaultBucketFolder(userId, group.id);
      return group;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: GROUP_KEY.lists() });
      },
    }
  );
};
