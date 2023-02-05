import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { BucketItem } from '@/lib/supabase/type';

export const useFetchBucketItems = (folderId: number) => {
  const getBucketItems = async () => {
    const { data, error } = await supabase
      .from('bucket_items')
      .select('*')
      .order('created_time', { ascending: true })
      .eq('bucket_folder_id', folderId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<BucketItem[], Error>(['bucketItems', folderId], getBucketItems, {
    staleTime: Infinity,
    enabled: !!folderId,
  });
};
