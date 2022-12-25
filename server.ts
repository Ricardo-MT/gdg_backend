import config from 'config';

import Logger from 'loaders/logger';

async function startServer(): Promise<void> {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const { app } = await require('loaders').default();
  app.listen(config.port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`
              ################################################
              🛡️  Server listening on port: ${config.port} 🛡️ 
              ################################################
            `);
  });
}
startServer();
