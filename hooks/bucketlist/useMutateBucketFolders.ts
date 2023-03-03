import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createBucketFolder, deleteBucketFolder, updateBucketFolder } from '@/lib/supabase/apis/bucketlist';
import { TCreateBucketFolder, TUpdateBucketFolder } from '@/lib/supabase/apis/bucketlist/type';
import { useUser } from '@/store/useUser';
import { BUCKET_FOLDER_KEY } from '@/utils/const';
import useCustomToast from '@/hooks/shared/useCustomToast';

export const useMutateBucketFolders = () => {
  const queryClient = useQueryClient();
  const { selectedGroupId, user } = useUser();
  const { openToast } = useCustomToast();

  const createBucketFolderMutation = useMutation(
    async (folder: TCreateBucketFolder) => {
      await createBucketFolder({ user, selectedGroupId, folder });
    },
    {
      onSuccess: () => {
        openToast({ message: '폴더가 생성되었습니다.', type: 'success' });
        queryClient.invalidateQueries(BUCKET_FOLDER_KEY.all);
      },
      onError: (err: any) => {
        openToast({ message: '폴더를 생성할 수 없습니다.', type: 'error' });
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
        openToast({ message: '폴더가 수정되었습니다.', type: 'success' });
        queryClient.invalidateQueries(BUCKET_FOLDER_KEY.all);
      },
      onError: (err: any) => {
        openToast({ message: '폴더를 수정할 수 없습니다.', type: 'error' });
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
        openToast({ message: '폴더가 삭제되었습니다.', type: 'success' });
        queryClient.invalidateQueries(BUCKET_FOLDER_KEY.all);
      },
      onError: (err: any) => {
        openToast({ message: '폴더를 삭제할 수 없습니다.', type: 'error' });
        throw new Error(err.message);
      },
    }
  );
  return { deleteBucketFolderMutation, createBucketFolderMutation, updateBucketFolderMutation };
};
