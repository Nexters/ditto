import { useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { BucketFolder } from '@/lib/supabase/type';

export const useMutateBucketFolders = () => {
  const queryClient = useQueryClient();

  const createBucketFolderMutation = useMutation(
    async (folder: Omit<BucketFolder, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('bucket_folders').insert(folder);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        const previousBucketFolders = queryClient.getQueryData<BucketFolder[]>(['bucketFolders']);
        if (previousBucketFolders) {
          queryClient.setQueryData(['bucketFolders'], [...previousBucketFolders, res[0]]);
        }
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
  const updateBucketFolderMutation = useMutation(
    async (bucketFolder: BucketFolder) => {
      const { data, error } = await supabase
        .from('bucket_folders')
        .update({ title: bucketFolder.title })
        .eq('id', bucketFolder.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res, variables) => {
        const previousBucketFolders = queryClient.getQueryData<BucketFolder[]>(['bucketFolders']);
        if (previousBucketFolders) {
          queryClient.setQueryData(
            ['bucketFolders'],
            previousBucketFolders.map((folder) => (folder.id === variables.id ? res[0] : folder))
          );
        }
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
  const deleteBucketFolderMutation = useMutation(
    async (id: number) => {
      const { data, error } = await supabase.from('bucket_folders').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (_, variables) => {
        const previousBucketFolders = queryClient.getQueryData<BucketFolder[]>(['bucketFolders']);
        if (previousBucketFolders) {
          queryClient.setQueryData(
            ['bucketFolders'],
            previousBucketFolders.filter((folder) => folder.id !== variables)
          );
        }
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
  return { deleteBucketFolderMutation, createBucketFolderMutation, updateBucketFolderMutation };
};
