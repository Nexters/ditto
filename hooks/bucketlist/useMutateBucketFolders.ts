import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createBucketFolder, deleteBucketFolder, updateBucketFolder } from '@/lib/supabase/apis/bucketlist';
import { TCreateBucketFolder, TUpdateBucketFolder } from '@/lib/supabase/apis/bucketlist/type';
import { useUser } from '@/store/useUser';

export const useMutateBucketFolders = () => {
  const queryClient = useQueryClient();
  const { selectedGroupId, user } = useUser();

  const createBucketFolderMutation = useMutation(
    async (folder: TCreateBucketFolder) => {
      await createBucketFolder({ user, selectedGroupId, folder });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bucketFolders']);
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
  const updateBucketFolderMutation = useMutation(
    async (folder: TUpdateBucketFolder) => {
      await updateBucketFolder(folder);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bucketFolders']);
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
  const deleteBucketFolderMutation = useMutation(
    async (id: number) => {
      await deleteBucketFolder(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bucketFolders']);
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
  return { deleteBucketFolderMutation, createBucketFolderMutation, updateBucketFolderMutation };
};
