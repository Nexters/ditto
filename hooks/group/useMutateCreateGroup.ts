import { createGroup, joinGroup, createDefaultBucketFolder } from '@/lib/supabase/apis/group';
import { useMutation } from '@tanstack/react-query';

export type CreateGroupParams = {
  userId: number;
  groupName: string;
};

export const useMutateCreateGroup = () => {
  return useMutation(async ({ userId, groupName }: CreateGroupParams) => {
    const group = await createGroup(userId, groupName);
    await joinGroup(userId, group.id);
    await createDefaultBucketFolder(userId, group.id);
    return group;
  });
};
