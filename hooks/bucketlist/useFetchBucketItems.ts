import { useQuery } from '@tanstack/react-query';
import { BucketItem } from '@/lib/supabase/type';
import { getBucketItems } from '@/lib/supabase/apis/bucketlist';

export const useFetchBucketItems = (folderId: number) => {
  const fetcher = async () => {
    const response = await getBucketItems(folderId);
    return response;
  };
  return useQuery<BucketItem[], Error>(['bucketItems', folderId], fetcher, {
    staleTime: Infinity,
    enabled: !!folderId,
  });
};
