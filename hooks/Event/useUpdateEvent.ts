import { updateEvent } from '@/lib/supabase/apis/event';
import { useQueryClient, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UpdateEventType } from '@/lib/supabase/apis/event/type';
import { EVENT_KEY } from '@/utils/const';

export const useUpdateEvent = (options?: Omit<UseMutationOptions<void, Error, UpdateEventType>, 'mutationFn'>) => {
  const queryClient = useQueryClient();
  return useMutation(async (params: UpdateEventType) => await updateEvent(params), {
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(EVENT_KEY.all);
      options?.onSuccess?.(data, variables, context);
      // TODO: 일정 수정 완료 토스트 띄우기
    },
    onError: () => {
      // TODO: 일정 수정 에러 토스트 띄우기
    },
  });
};
