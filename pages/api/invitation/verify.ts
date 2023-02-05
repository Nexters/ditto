import { EdgeFunction } from '@/lib/edge/types';
import { NextResponse } from 'next/server';
import joi from 'joi';
import { getInvitationInfo } from '@/lib/supabase/apis/invitation';
import { addDays } from '@/utils/date';

export const config = {
  runtime: 'edge',
};

const bodySchema = joi.object<{
  code: string;
}>({
  code: joi.string().required(),
});

const edgeFunction: EdgeFunction = async (req) => {
  try {
    // 1. body parsing
    // 2. 초대장 정보 가져오기
    // 3. 생성 시점이 유효기간을 넘었는지 체크
    // 4. 초대장 정보 반환

    const body = await req.json();
    const { code } = await bodySchema.validateAsync(body);

    const invitationInfo = await getInvitationInfo(code);
    const now = new Date();
    const expired = addDays(invitationInfo.created_time, 1);

    if (expired < now) throw 'expired code';

    return new NextResponse(JSON.stringify({ message: 'ok', data: { invitationInfo: invitationInfo } }), {
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
