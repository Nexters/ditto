import { getEventById } from '@/lib/supabase/apis/event';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { EVENT_KEY } from './useCreateEvent';
import { EventByIdType } from '@/lib/supabase/apis/event/type';

export const useFetchEventById = (eventId: number, options?: UseQueryOptions<EventByIdType, Error>) => {
  return useQuery<EventByIdType, Error>(
    EVENT_KEY.allByGroupId(eventId),
    async () => {
      const response = await getEventById(eventId);
      return response;
    },
    {
      ...options,
      staleTime: Infinity,
    }
  );
};
