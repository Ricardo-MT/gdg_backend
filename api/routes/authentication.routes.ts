import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import middlewares from 'api/middlewares';
import AuthenticationController from 'controllers/authentication.controllers';

const router = Router();

const authenticationController = new AuthenticationController();

router.get('/', authenticationController.check);
router.post(
  '/',
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  authenticationController.login,
);
router.post(
  '/register',
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      surname: Joi.string().required(),
    }),
  }),
  authenticationController.register,
);
router.delete('/', middlewares.isAuth, authenticationController.logout);

// eslint-disable-next-line import/prefer-default-export
export { router };
