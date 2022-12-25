/* eslint-disable no-console */
import config from 'config';
import mongoose from 'mongoose';

import Logger from 'loaders/logger';

async function seeds() {
  try {
    const uri = process.env.ATLAS_URI;
    await mongoose.connect(uri, config.mongooseConnectionOptions);
    const date = new Date().valueOf();
    console.log('EMPEZAMOS LOS SEEDS');

    /* --- AQUI VAN LOS SEEDS ---*/

    /* --- AQUI TERMINAN LOS SEEDS ---*/

    console.log('ACABAMOS LOS SEEDS');
    console.log(`${new Date().valueOf() - date}ms`);
    mongoose.disconnect();
  } catch (error) {
    Logger.error('Se ha producido un error.');
    Logger.error(error);
  }
}

export default seeds;

seeds();
