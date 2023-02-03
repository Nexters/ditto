import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { BucketFolder } from '@/lib/supabase/type';

export const useFetchBucketFolders = () => {
  const getBucketFolders = async () => {
    const { data, error } = await supabase
      .from('bucket_folders')
      .select('*')
      .order('created_time', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<BucketFolder[], Error>(
    ['bucketFolders'],
    getBucketFolders,

    {
      staleTime: Infinity,
    }
  );
};
