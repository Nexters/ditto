import { EdgeFunction } from '@/lib/edge/types';
import { NextResponse } from 'next/server';
import { object, string, number } from 'joi';
import { createDefaultBucketFolder, createGroup, joinGroup } from '@/lib/supabase/apis/group';
import { API_PRIVATE_KEY } from '@/utils/const';

export const config = {
  runtime: 'edge',
};

const bodySchema = object<{
  private_key: string;
  group_name: string;
  user_id: number;
}>({
  private_key: string()
    .valid(API_PRIVATE_KEY)
    .required()
    // @note: private_key field가 있다는 걸 숨기기 위함
    .error(() => new Error()),
  group_name: string().required(),
  user_id: number().required(),
});

const edgeFunction: EdgeFunction = async (req) => {
  try {
    // 1. body validation
    //   1-1. hidden private key 확인
    // 2. supabase 통해서 그룹 생성
    // 3. setup
    //   3-1. 해당 그룹에 참여시키기
    //   3-2. 해당 그룹에 기본 버킷리스트 생성

    const body = await req.json();
    const { group_name, user_id } = await bodySchema.validateAsync(body);

    const group = await createGroup(user_id, group_name);

    await joinGroup(user_id, group.id);
    await createDefaultBucketFolder(user_id, group.id);

    return new NextResponse(
      JSON.stringify({
        message: 'ok',
        data: { group },
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
