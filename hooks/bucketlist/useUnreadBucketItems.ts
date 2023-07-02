import { getUnreadBucketItems } from '@/lib/supabase/apis/bucketlist';
import { TBucketItem } from '@/lib/supabase/type';
import { useUser } from '@/store/useUser';
import { BUCKET_ITEM_KEY } from '@/utils/const';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useUnreadBucketItems = () => {
  const queryClient = useQueryClient();
  const { user, selectedGroupId } = useUser();

  const query = useQuery(
    BUCKET_ITEM_KEY.list(['unread', selectedGroupId]),
    async () => {
      if (!user) throw 'no authorized';
      if (!selectedGroupId) throw 'not selected group id';

      const lastLoginTime = user.last_login_time ?? new Date(0).toISOString();
      return await getUnreadBucketItems(user.id, selectedGroupId, lastLoginTime);
    },
    {
      enabled: !!selectedGroupId && !!user,
    }
  );

  const setReadByFolderId = useCallback(
    (folderId: number) => {
      queryClient.setQueryData<Pick<TBucketItem, 'id' | 'bucket_folder_id'>[]>(
        BUCKET_ITEM_KEY.list(['unread', selectedGroupId]),
        (prev) => prev?.filter((item) => item.bucket_folder_id !== folderId) ?? []
      );
    },
    [queryClient, selectedGroupId]
  );

  return { ...query, setReadByFolderId };
};
