import { Router } from 'express';

import SkillsController from 'controllers/skills.controllers';

const route = Router();

export default (app: Router) => {
  const controller = new SkillsController();
  app.use('/skills', route);
  route.get('/', controller.fetchAll);
};
