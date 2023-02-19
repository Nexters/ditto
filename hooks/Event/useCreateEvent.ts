import { createEvent, getEventsList } from '@/lib/supabase/apis/event';
import { CreateEventType } from '@/lib/supabase/apis/event/type';
import { Event } from '@/lib/supabase/type';
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

export const EVENT_KEY = {
  all: ['event'],
} as const;

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: CreateEventType) => {
      await createEvent(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(EVENT_KEY.all);
        // TODO: 토스트 띄우기
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
};

export const useFetchEventList = (options?: UseQueryOptions<Event[], Error>) => {
  return useQuery<Event[], Error>(
    EVENT_KEY.all,
    async () => {
      const response = await getEventsList();
      return response;
    },
    { ...options }
  );
};
