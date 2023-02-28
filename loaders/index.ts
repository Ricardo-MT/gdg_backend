import expressLoader from 'loaders/express';
import Logger from 'loaders/logger';
import mongooseLoader from 'loaders/mongoose';

const indexLoader = async () => {
  const mongoConnection = await mongooseLoader();
  Logger.info('MongoDB inicializado');
  const app = await expressLoader(mongoConnection);
  Logger.info('Express inicializado');

  return { app, connection: mongoConnection };
};

export default indexLoader;
