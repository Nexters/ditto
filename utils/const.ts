import queryString from 'query-string';
import { createQueryKeys } from './createQueryKeys';

export const HOSTING_URL = process.env.NEXT_PUBLIC_HOSTING_URL || 'http://localhost:3000';

export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string;
export const KAKAO_CLIENT_SECRET = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET as string;
export const KAKAO_LOGIN_REDIRECT_URL =
  process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL || 'http://localhost:3000/api/auth/kakao-login';
export const KAKAO_LOGOUT_REDIRECT_URL =
  process.env.NEXT_PUBLIC_KAKAO_LOGOUT_REDIRECT_URL || 'http://localhost:3000/api/auth/kakao-logout';

export const KAKAO_LOGIN_URL = (state?: string | null) =>
  queryString.stringifyUrl({
    url: 'https://kauth.kakao.com/oauth/authorize',
    query: {
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: KAKAO_LOGIN_REDIRECT_URL,
      response_type: 'code',
      state,
    },
  });
export const KAKAO_LOGOUT_URL = queryString.stringifyUrl({
  url: 'https://kauth.kakao.com/oauth/logout',
  query: {
    client_id: KAKAO_CLIENT_ID,
    logout_redirect_uri: KAKAO_LOGOUT_REDIRECT_URL,
    response_type: 'code',
  },
});

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

export const COOKIE_KAKAO_ACCESS_TOKEN_NAME = 'access_token';
export const COOKIE_KAKAO_REFRESH_TOKEN_NAME = 'refresh_token';

export const API_PRIVATE_KEY = process.env.NEXT_PUBLIC_API_PRIVATE_KEY as string;

export const INVITATION_CODE_LENGTH = 10;

export const LOCAL_STORAGE__GROUP_ID = 'ditto-latest-group-id';

export const INQUIRY_CHANNEL_URL = 'https://open.kakao.com/o/sNBgXm6e';

// query keys

export const MEMBER_KEY = createQueryKeys('members');
export const GROUP_KEY = createQueryKeys('groups');
export const INVITATION_KEY = createQueryKeys('invitations');

export const EVENT_KEY = createQueryKeys('events');

export const BUCKET_FOLDER_KEY = createQueryKeys('bucket_folders');
export const BUCKET_ITEM_KEY = createQueryKeys('bucket_items');
