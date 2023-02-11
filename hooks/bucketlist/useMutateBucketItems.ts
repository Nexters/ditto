import { useQueryClient, useMutation } from '@tanstack/react-query';

import { BucketItem } from '@/lib/supabase/type';
import { useUser } from '@/store/useUser';
import { TCreateBucketItem } from '@/lib/supabase/apis/bucketlist/type';
import { createBucketItem, deleteBucketItem, updateBucketItem } from '@/lib/supabase/apis/bucketlist';

export const useMutateBucketItems = () => {
  const queryClient = useQueryClient();
  const { selectedGroupId, user } = useUser();

  const createBucketItemMutation = useMutation(
    async (item: TCreateBucketItem) => {
      await createBucketItem({ user, selectedGroupId, item });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bucketItems']);
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );

  const updateBucketItemMutation = useMutation(
    async (bucketItem: BucketItem) => {
      await updateBucketItem(bucketItem);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bucketItems']);
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
  const deleteBucketItemMutation = useMutation(
    async (id: number) => {
      await deleteBucketItem(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bucketItems']);
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
  return { deleteBucketItemMutation, createBucketItemMutation, updateBucketItemMutation };
};
