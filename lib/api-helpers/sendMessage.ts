import { NextApiResponse } from 'next';

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
