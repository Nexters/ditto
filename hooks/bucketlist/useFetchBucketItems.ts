import { useQuery } from '@tanstack/react-query';
import { BucketItem } from '@/lib/supabase/type';
import { getBucketItems } from '@/lib/supabase/apis/bucketlist';
import { BUCKET_ITEM_KEY } from '@/utils/const';

export const useFetchBucketItems = (folderId: number) => {
  const fetcher = async () => {
    const response = await getBucketItems(folderId);
    return response;
  };
  return useQuery<BucketItem[], Error>(BUCKET_ITEM_KEY.list([folderId]), fetcher, {
    enabled: !!folderId,
  });
};
