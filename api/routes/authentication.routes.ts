import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import middlewares from 'api/middlewares';
import AuthenticationController from 'controllers/authentication.controllers';

const route = Router();

export default (app: Router) => {
  const authenticationController = new AuthenticationController();
  app.use('/authentication', route);
  route.get('/', authenticationController.check);
  route.post(
    '/',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    authenticationController.login,
  );
  route.delete('/', middlewares.isAuth, authenticationController.logout);
};
