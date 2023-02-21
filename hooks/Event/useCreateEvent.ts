import { createEvent } from '@/lib/supabase/apis/event';
import { CreateEventType } from '@/lib/supabase/apis/event/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: CreateEventType) => {
      await createEvent(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['event']);
        // TODO: 토스트 띄우기
      },
      onError: (err: any) => {
        throw new Error(err.message);
      },
    }
  );
};
