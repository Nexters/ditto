import { useQuery } from '@tanstack/react-query';
import { TBucketItem } from '@/lib/supabase/type';
import { getBucketItems } from '@/lib/supabase/apis/bucketlist';
import { BUCKET_ITEM_KEY } from '@/utils/const';

export const useFetchBucketItems = (folderId: number) => {
  const compareByCompleted = (a: TBucketItem, b: TBucketItem) => {
    if (a.completed) return 1;
    if (b.completed) return -1;
    return 0;
  };
  const fetcher = async () => {
    const bucketItems = await getBucketItems(folderId);
    return bucketItems.sort(compareByCompleted);
  };
  return useQuery<TBucketItem[], Error>(BUCKET_ITEM_KEY.list([folderId]), fetcher, {
    enabled: !!folderId,
  });
};
