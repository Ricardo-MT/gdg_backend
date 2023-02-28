import { Router } from 'express';

import SkillsController from 'controllers/skills.controllers';

const router = Router();

const controller = new SkillsController();
router.get('/', controller.fetchAll);

// eslint-disable-next-line import/prefer-default-export
export { router };
