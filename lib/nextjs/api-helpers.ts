import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiResponse } from 'next';

type CookieValue = {
  name: string;
  value: unknown;
  options?: CookieSerializeOptions;
};

// ref:
// https://nextjs.org/docs/api-routes/request-helpers#extending-the-reqres-objects-with-typescript
// https://davidhwang.netlify.app/TIL/(0320)nextjs%EC%97%90%EC%84%9C-next-cookies-%EC%82%AC%EC%9A%A9-%EC%9D%B4%EC%8A%88/
const serializeWithOptions = ({ name, value, options = {} }: CookieValue) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }

  return serialize(name, stringValue, options);
};

/**
 * response에 cookie들을 설정합니다.
 * @note set-cookie 호출 시 기존의 호출된 건 overwrite됩니다.
 *
 * @param res NextApiResponse
 * @param values CookieValue[]
 * @returns
 */
export const setCookie = (res: NextApiResponse, values: CookieValue[]) => {
  res.setHeader('Set-Cookie', values.map(serializeWithOptions));
};

/**
 * response에 code, message, data를 설정합니다.
 *
 * @param res NextApiResponse
 * @param code status code
 * @param message status message
 * @param data 반환할 payload
 */
export const sendMessage = (res: NextApiResponse, code: number, message: string, data?: any) => {
  res.status(code).send({ message, data });
};
