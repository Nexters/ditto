import { useQuery } from '@tanstack/react-query';
import { BucketFolder } from '@/lib/supabase/type';
import { getBucketFolders } from '@/lib/supabase/apis/bucketlist';
import { useUser } from '@/store/useUser';

export const useFetchBucketFolders = () => {
  const { selectedGroupId } = useUser();

  if (!selectedGroupId) throw new Error('selectedGroupId is null');

  const fetcher = async () => {
    const response = await getBucketFolders(selectedGroupId);
    return response;
  };
  return useQuery<BucketFolder[], Error>(['bucketFolders'], fetcher, {
    staleTime: Infinity,
  });
};
