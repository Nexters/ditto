import { EdgeFunction } from '@/lib/edge/types';
import { NextResponse } from 'next/server';
import { createInvitation } from '@/lib/supabase/apis/invitation';
import { z } from 'zod';

export const config = {
  runtime: 'edge',
};

const bodyScheme = z.object({
  group_id: z.number(),
  user_id: z.number(),
});

const edgeFunction: EdgeFunction = async (req) => {
  try {
    // 1. body parsing
    // 2. 초대 코드 생성
    // 3. 초대 코드 포함된 invitation object 반환

    const body = await req.json();
    const { user_id, group_id } = bodyScheme.parse(body);

    const invitation = await createInvitation(user_id, group_id);

    return new NextResponse(
      JSON.stringify({
        message: 'ok',
        data: { invitation },
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }
    );
  } catch (error) {
    return new NextResponse(
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
  }
};

export default edgeFunction;
