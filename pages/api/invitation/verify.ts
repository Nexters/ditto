import { EdgeFunction } from '@/lib/edge/types';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { INVITATION_CODE_LENGTH } from '@/utils/const';
import { adminApi } from '@/lib/supabase/admin';

export const config = {
  runtime: 'edge',
};

const bodyScheme = z.object({
  code: z.string().length(INVITATION_CODE_LENGTH),
});

const edgeFunction: EdgeFunction = async (req) => {
  try {
    // 1. body parsing
    // 2. 초대장 정보 가져오기
    // 3. 생성 시점이 유효기간을 넘었는지 체크
    // 4. 초대장 정보 반환

    const body = await req.json();
    const { code } = bodyScheme.parse(body);

    const invitationInfo = await adminApi.getInvitationInfo(code);

    return new NextResponse(JSON.stringify({ message: 'ok', data: { invitationInfo } }), {
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
