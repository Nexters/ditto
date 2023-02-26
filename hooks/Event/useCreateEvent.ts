import { createEvent } from '@/lib/supabase/apis/event';
import { CreateEventType } from '@/lib/supabase/apis/event/type';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

export const EVENT_KEY = {
  all: ['event'],
  allByGroupId: (currentGroupId: number) => [...EVENT_KEY.all, currentGroupId],
  eventById: (eventId: number) => [...EVENT_KEY.all, eventId],
} as const;

export const useCreateEvent = (options?: UseQueryOptions<void, Error>) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: CreateEventType) => {
      await createEvent(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(EVENT_KEY.all);
        options?.onSuccess?.(data);
        // TODO: 일정 추가 완료 토스트 띄우기
      },
      onError: () => {
        // TODO: 일정 추가 에러 토스트 띄우기
      },
    }
  );
};
