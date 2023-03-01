import { useQuery } from '@tanstack/react-query';
import { TBucketItem } from '@/lib/supabase/type';
import { getBucketItems } from '@/lib/supabase/apis/bucketlist';
import { BUCKET_ITEM_KEY } from '@/utils/const';

export const useFetchBucketItems = (folderId: number) => {
  const fetcher = async () => {
    const response = await getBucketItems(folderId);
    return response;
  };
  return useQuery<TBucketItem[], Error>(BUCKET_ITEM_KEY.list([folderId]), fetcher, {
    enabled: !!folderId,
  });
};
