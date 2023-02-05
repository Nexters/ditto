import { EdgeFunction } from '@/lib/edge/types';
import { NextResponse } from 'next/server';
import { joinGroup } from '@/lib/supabase/apis/group';

export const config = {
  runtime: 'edge',
};

const edgeFunction: EdgeFunction = async (req) => {
  try {
    // 1. body parsing
    // 2. 해당 그룹에 참여

    const { group_id, user_id, joined_by } = await req.json();

    await joinGroup(user_id, group_id, joined_by);

    return new NextResponse(JSON.stringify({ message: 'ok' }), {
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
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
