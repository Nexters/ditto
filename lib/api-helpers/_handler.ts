import { NextApiHandler } from 'next';

type HandlerMap = {
  GET?: NextApiHandler;
  POST?: NextApiHandler;
  PUT?: NextApiHandler;
  PATCH?: NextApiHandler;
  DELETE?: NextApiHandler;
};
type HttpMethod = keyof HandlerMap;

const notFoundHandler: NextApiHandler = (req, res) => res.status(404).end();

export const createHandler = (handlerMap: HandlerMap = {}) => {
  const _innerHandler: NextApiHandler = (req, res) => {
    const handler = handlerMap[req.method as HttpMethod] ?? notFoundHandler;
    return handler(req, res);
  };

  return _innerHandler;
};
