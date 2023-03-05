import { Router } from 'express';

import EditionController from 'controllers/edition.controllers';

const router = Router();

const controller = new EditionController();
router.get('/', controller.getEditions);

// eslint-disable-next-line import/prefer-default-export
export { router };
