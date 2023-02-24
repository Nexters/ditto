import { getEventById } from '@/lib/supabase/apis/event';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { EVENT_KEY } from './useCreateEvent';
import { getEventByIdType } from '@/lib/supabase/apis/event/type';

export const useFetchEventById = (eventId: number, options?: UseQueryOptions<getEventByIdType, Error>) => {
  return useQuery<getEventByIdType, Error>(
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
