import queryString from 'query-string';
import { createQueryKeys } from './createQueryKeys';

export const LOCAL_HOSTING_URL = 'http://localhost:3000';
export const HOSTING_URL = process.env.NEXT_PUBLIC_HOSTING_URL || LOCAL_HOSTING_URL;

export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string;
export const KAKAO_CLIENT_SECRET = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET as string;
export const KAKAO_LOGIN_REDIRECT_URL =
  process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL || `${LOCAL_HOSTING_URL}/api/auth/kakao-login`;
export const KAKAO_LOGOUT_REDIRECT_URL =
  process.env.NEXT_PUBLIC_KAKAO_LOGOUT_REDIRECT_URL || `${LOCAL_HOSTING_URL}/api/auth/kakao-logout`;

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
export const LOCAL_STORAGE__SHOW_MEMBER = 'ditto-show-member';

export const INQUIRY_CHANNEL_URL = 'https://open.kakao.com/o/sNBgXm6e';

export const NOTIFICATION_ICON_URL = `https://raw.githubusercontent.com/Nexters/ditto/main/public/favicon/android-chrome-192x192.png`;

// query keys

export const MEMBER_KEY = createQueryKeys('members');
export const GROUP_KEY = createQueryKeys('groups');
export const INVITATION_KEY = createQueryKeys('invitations');

export const EVENT_KEY = createQueryKeys('events');

export const BUCKET_FOLDER_KEY = createQueryKeys('bucket_folders');
export const BUCKET_ITEM_KEY = createQueryKeys('bucket_items');

// max length

export const MAX_LENGTH__EVENT_TITLE = 15;
export const MAX_LENGTH__EVENT_DESCRIPTION = 200;

export const MAX_LENGTH__GROUP_NAME = 15;

export const MAX_LENGTH__BUCKETLIST_FOLDER_NAME = 15;
export const MAX_LENGTH__BUCKETLIST_ITEM_TITLE = 15;
export const MAX_LENGTH__BUCKETLIST_ITEM_DESCRIPTION = 200;
