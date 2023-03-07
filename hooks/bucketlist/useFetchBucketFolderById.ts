import { useQuery } from '@tanstack/react-query';
import { BucketFolder } from '@/lib/supabase/type';
import { getBucketFolderById } from '@/lib/supabase/apis/bucketlist';
import { BUCKET_FOLDER_KEY } from '@/utils/const';

export const useFetchBucketFolderById = (id: number) => {
  const fetcher = async () => {
    const response = await getBucketFolderById(id);
    return response;
  };
  return useQuery<BucketFolder, Error>(BUCKET_FOLDER_KEY.detail([id]), fetcher, {
    enabled: !!id,
  });
};
