import { Event } from '@/lib/supabase/type';
import { getEventsList } from '@/lib/supabase/apis/event';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { EVENT_KEY } from './useCreateEvent';

export const useFetchEventList = (currentGroupId: number, options?: UseQueryOptions<Event[], Error>) => {
  return useQuery<Event[], Error>(
    EVENT_KEY.allByGroupId(currentGroupId),
    async () => {
      const response = await getEventsList(currentGroupId);
      return response;
    },
    {
      ...options,
      staleTime: Infinity,
    }
  );
};
