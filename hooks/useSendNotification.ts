import { useMutation } from '@tanstack/react-query';

export type SendNotificationBody = {
  sender_id: number;
  group_id: number;
  notification_title: string;
  notification_body: string;
};

export const useSendNotification = () => {
  return useMutation(
    async (body: SendNotificationBody) => {
      const res = await fetch('/api/fcm/send-message', {
        method: 'post',
        body: JSON.stringify(body),
      });
      return await res.json();
    },
    {
      onError: (error) => {
        // @note: 조용한 실패를 위해 로깅만 한다.
        console.error(error);
      },
    }
  );
};
