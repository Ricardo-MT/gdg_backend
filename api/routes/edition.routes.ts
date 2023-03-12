import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import EditionController from 'controllers/edition.controllers';

const router = Router();

const controller = new EditionController();
router.get('/', controller.getEditions);
router.get('/get3last', controller.get3Last);
router.get('/getById', controller.getById);
router.get('/getNextEdition', controller.getNextEdition);
router.post(
  '/create',
  celebrate({
    body: Joi.object({
      organizer: Joi.string().required(),
      date: Joi.string().required(),
      location: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
    }),
  }),
  controller.create,
);

// eslint-disable-next-line import/prefer-default-export
export { router };
