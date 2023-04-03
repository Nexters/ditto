import { EdgeFunction } from '@/lib/edge/types';
import { adminApi } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import { icsCreateEvents } from '@/lib/ics';

export const config = {
  runtime: 'edge',
};

const edgeFunction: EdgeFunction = async (req) => {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug') ?? '';
    const [uid, ext] = slug.split('.');

    if (!uid) throw 'uid is null';
    if (ext !== 'ics') throw 'ext is not ics';

    const events = await adminApi.getAllEventsByGroupUid(uid);
    const data = await icsCreateEvents(events);

    return new NextResponse(data, {
      status: 200,
      headers: {
        'content-type': 'plain/text;charset=UTF-8',
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
