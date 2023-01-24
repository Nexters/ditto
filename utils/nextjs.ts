import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiResponse } from 'next';

type CookieValue = {
  name: string;
  value: unknown;
  options?: CookieSerializeOptions;
};

const serializeWithOptions = ({ name, value, options = {} }: CookieValue) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }

  return serialize(name, stringValue, options);
};

export const setCookie = (res: NextApiResponse, values: CookieValue[]) => {
  res.setHeader('Set-Cookie', values.map(serializeWithOptions));
};

export const sendMessage = (res: NextApiResponse, code: number, message: string, data?: any) => {
  return res.status(code).send({ message, data });
};
