import { EdgeFunction } from '@/lib/edge/types';
import { NextResponse } from 'next/server';
import { createInvitation } from '@/lib/supabase/apis/invitation';

export const config = {
  runtime: 'edge',
};

const edgeFunction: EdgeFunction = async (req) => {
  try {
    // 1. body parsing
    // 2. 초대 코드 생성
    // 3. 초대 코드 포함된 invitation object 반환

    const { user_id, group_id } = await req.json();

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
