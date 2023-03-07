import { createEvent } from '@/lib/supabase/apis/event';
import { CreateEventType } from '@/lib/supabase/apis/event/type';
import { EVENT_KEY } from '@/utils/const';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import useCustomToast from '../shared/useCustomToast';

export const useCreateEvent = (options?: UseQueryOptions<void, Error>) => {
  const queryClient = useQueryClient();
  const { openToast } = useCustomToast();
  return useMutation(
    async (params: CreateEventType) => {
      await createEvent(params);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: EVENT_KEY.lists() });
        options?.onSuccess?.(data);
        openToast({ message: '일정이 생성되었습니다.', type: 'success' });
      },
      onError: () => {
        openToast({ message: '일정 생성에 실패했습니다. 화면을 새로고침해주세요', type: 'error' });
      },
    }
  );
};
