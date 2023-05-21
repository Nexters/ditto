import { EdgeFunction } from '@/lib/edge/types';
import { NextResponse } from 'next/server';
import { COOKIE_KAKAO_ACCESS_TOKEN_NAME, COOKIE_KAKAO_REFRESH_TOKEN_NAME } from '@/utils/const';
import { adminApi } from '@/lib/supabase/admin';
import { z } from 'zod';

export const config = {
  runtime: 'edge',
};

const bodyScheme = z.object({
  sender_id: z.number(),
  group_id: z.number(),
  notification_title: z.string(),
  notification_body: z.string(),
});

const edgeFunction: EdgeFunction = async (req) => {
  try {
    const refreshToken = req.cookies.get(COOKIE_KAKAO_REFRESH_TOKEN_NAME)?.value;
    const accessToken = req.cookies.get(COOKIE_KAKAO_ACCESS_TOKEN_NAME)?.value;

    if (!refreshToken || !accessToken) throw 'no authorized';

    const body = await req.json();
    const { sender_id, group_id, notification_title, notification_body } = bodyScheme.parse(body);

    // 1. 푸시 알림을 보내기 위한 그룹 내 다른 멤버 token들을 가져온다
    // 2. firebase http(legacy, not v1) 호출을 통해 푸시 알림을 보낸다
    const fcmTokens = await adminApi.getFcmTokenListByGroupId(sender_id, group_id);

    const serverKey = process.env.NEXT_PUBLIC_FCM_SERVER_KEY as string;
    const results = await Promise.all(
      fcmTokens.map(async ({ token }) => {
        const res = await fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'post',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            Authorization: `key=${serverKey}`,
          },
          body: JSON.stringify({
            to: token,
            notification: {
              title: notification_title,
              body: notification_body,
            },
          }),
        });
        return await res.json();
      })
    );

    const res = new NextResponse(
      JSON.stringify({
        message: 'ok',
        data: { results },
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }
    );
    return res;
  } catch (error) {
    const res = new NextResponse(
      JSON.stringify({
        message: 'bad request',
        error,
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }
    );
    return res;
  }
};

export default edgeFunction;
