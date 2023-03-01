import { getEventById } from '@/lib/supabase/apis/event';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { EventByIdType } from '@/lib/supabase/apis/event/type';
import { EVENT_KEY } from '@/utils/const';

export const useFetchEventById = (eventId: number, options?: UseQueryOptions<EventByIdType, Error>) => {
  return useQuery<EventByIdType, Error>(
    EVENT_KEY.list([{ eventId }]),
    async () => {
      const response = await getEventById(eventId);
      return response;
    },
    {
      ...options,
    }
  );
};
