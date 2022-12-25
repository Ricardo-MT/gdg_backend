import { Response } from 'express';

// eslint-disable-next-line no-restricted-imports
import { handleServerError } from './errors';

const handleRequest = async (
  res: Response,
  callback: () => Promise<Response>,
) => {
  try {
    await callback();
  } catch (err) {
    handleServerError(res, err);
  }
};

export default handleRequest;
