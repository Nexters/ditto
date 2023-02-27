import { useQuery } from '@tanstack/react-query';
import { BucketFolder } from '@/lib/supabase/type';
import { getBucketFolders } from '@/lib/supabase/apis/bucketlist';
import { useUser } from '@/store/useUser';
import { BUCKET_FOLDER_KEY } from '@/utils/const';

export const useFetchBucketFolders = () => {
  const { selectedGroupId } = useUser();

  if (!selectedGroupId) throw new Error('selectedGroupId is null');

  const fetcher = async () => {
    const response = await getBucketFolders(selectedGroupId);
    return response;
  };
  return useQuery<BucketFolder[], Error>(BUCKET_FOLDER_KEY.list([selectedGroupId]), fetcher, {
    refetchOnMount: false,
    keepPreviousData: true,
    staleTime: Infinity,
  });
};
