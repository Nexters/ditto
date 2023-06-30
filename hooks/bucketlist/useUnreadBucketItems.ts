import { getUnreadBucketItems } from '@/lib/supabase/apis/bucketlist';
import { useUser } from '@/store/useUser';
import { BUCKET_ITEM_KEY } from '@/utils/const';
import { useQuery } from '@tanstack/react-query';

export const useUnreadBucketItems = () => {
  const { user, selectedGroupId } = useUser();

  return useQuery(
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
};
