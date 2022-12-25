import { Response } from 'express';
import { mongo } from 'mongoose';

import Logger from 'loaders/logger';

export const handleServerError = (res: Response, err) => {
  Logger.error(err);
  let error = 'Ha ocurrido un error en el servidor.';
  if (err instanceof CustomError) {
    error = err.error;
  }
  return res.status(400).json({
    error: error || 'Ha ocurrido un error en el servidor.',
    message: error || 'Ha ocurrido un error en el servidor.',
  });
};

export class CustomError extends mongo.MongoError {
  error: string;

  constructor(err: string | globalThis.Error, _error: string) {
    super(err);
    this.error = _error;
  }
}
