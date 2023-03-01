import { Event } from '@/lib/supabase/type';
import { getEventsList } from '@/lib/supabase/apis/event';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { EVENT_KEY } from '@/utils/const';
import { useUser } from '@/store/useUser';

export const useFetchEventList = (options?: UseQueryOptions<Event[], Error>) => {
  const { selectedGroupId } = useUser();
  return useQuery<Event[], Error>(
    EVENT_KEY.list([{ selectedGroupId }]),
    async () => {
      const response = await getEventsList(Number(selectedGroupId));
      return response;
    },
    {
      ...options,
      enabled: !!selectedGroupId,
    }
  );
};
