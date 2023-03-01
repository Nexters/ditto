import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useUser } from '@/store/useUser';
import { TCreateBucketItem, TUpdateBucketItem } from '@/lib/supabase/apis/bucketlist/type';
import {
  completeBucketItem,
  createBucketItem,
  deleteBucketItem,
  updateBucketItem,
} from '@/lib/supabase/apis/bucketlist';
import { BUCKET_ITEM_KEY } from '@/utils/const';

export const useMutateBucketItems = () => {
  const queryClient = useQueryClient();
  const { selectedGroupId, user } = useUser();

  const createBucketItemMutation = useMutation(
    async (item: TCreateBucketItem) => {
      await createBucketItem({ user, selectedGroupId, item });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(BUCKET_ITEM_KEY.all);
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );

  const updateBucketItemMutation = useMutation(
    async (item: TUpdateBucketItem) => {
      await updateBucketItem(item);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(BUCKET_ITEM_KEY.all);
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
        queryClient.invalidateQueries(BUCKET_ITEM_KEY.all);
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );

  const completeBucketItemMutation = useMutation(
    async ({ id, completed }: { id: number; completed: boolean }) => {
      await completeBucketItem({ id, completed });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(BUCKET_ITEM_KEY.all);
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );

  return { deleteBucketItemMutation, createBucketItemMutation, updateBucketItemMutation, completeBucketItemMutation };
};
