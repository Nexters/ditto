import { deleteEvent } from '@/lib/supabase/apis/event';
import { EVENT_KEY } from '@/utils/const';
import { useQueryClient, useMutation, UseMutationOptions } from '@tanstack/react-query';
import useCustomToast from '../shared/useCustomToast';

export const useDeleteEvent = (options?: Omit<UseMutationOptions<void, Error, number>, 'mutationFn'>) => {
  const queryClient = useQueryClient();
  const { openToast } = useCustomToast();

  return useMutation(async (eventId: number) => await deleteEvent(eventId), {
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: EVENT_KEY.lists() });
      options?.onSuccess?.(data, variables, context);
      openToast({ message: '일정이 삭제되었습니다.', type: 'success' });
    },
    onError: () => {
      openToast({ message: '일정 삭제에 실패했습니다. 화면을 새로고침해주세요', type: 'error' });
    },
  });
};
