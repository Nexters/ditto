import { deleteEvent } from '@/lib/supabase/apis/event';
import { useQueryClient, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { EVENT_KEY } from './useCreateEvent';

export const useDeleteEvent = (options?: Omit<UseMutationOptions<void, Error, number>, 'mutationFn'>) => {
  const queryClient = useQueryClient();
  return useMutation(async (eventId: number) => await deleteEvent(eventId), {
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(EVENT_KEY.all);
      options?.onSuccess?.(data, variables, context);
      // TODO: 삭제 완료 토스트 띄우기
    },
    onError: () => {
      // TODO: 삭제 에러 토스트 띄우기
    },
  });
};
