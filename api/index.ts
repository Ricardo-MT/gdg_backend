import { Router } from 'express';

import authenticationRoutes from 'api/routes/authentication.routes';
import skillRoutes from 'api/routes/skill.routes';

export default () => {
  const app = Router();
  authenticationRoutes(app);
  skillRoutes(app);
  return app;
};
