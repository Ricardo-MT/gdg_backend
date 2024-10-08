import { Response } from 'express';

import { handleServerError } from 'utils/errors';

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
