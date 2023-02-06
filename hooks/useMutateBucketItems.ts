import { useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { BucketItem } from '@/lib/supabase/type';

export const useMutateBucketItems = () => {
  const queryClient = useQueryClient();

  const createBucketItemMutation = useMutation(
    async (item: Omit<BucketItem, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('bucket_items').insert(item).select();
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        const previousBucketItems = queryClient.getQueryData<BucketItem[]>(['bucketItems']);
        if (previousBucketItems) {
          queryClient.setQueryData(['bucketItems'], [...previousBucketItems, res[0]]);
        }
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
  const updateBucketItemMutation = useMutation(
    async (bucketItem: BucketItem) => {
      const { data, error } = await supabase
        .from('bucket_items')
        .update({ title: bucketItem.title })
        .eq('id', bucketItem.id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res, variables) => {
        const previousBucketItems = queryClient.getQueryData<BucketItem[]>(['bucketItems']);
        if (previousBucketItems) {
          queryClient.setQueryData(
            ['bucketItems'],
            previousBucketItems.map((item) => (item.id === variables.id ? res[0] : item))
          );
        }
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
  const deleteBucketItemMutation = useMutation(
    async (id: number) => {
      const { data, error } = await supabase.from('bucket_items').delete().eq('id', id).select();
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (_, variables) => {
        const previousBucketItems = queryClient.getQueryData<BucketItem[]>(['bucketItems']);
        if (previousBucketItems) {
          queryClient.setQueryData(
            ['bucketItems'],
            previousBucketItems.filter((item) => item.id !== variables)
          );
        }
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
  return { deleteBucketItemMutation, createBucketItemMutation, updateBucketItemMutation };
};
