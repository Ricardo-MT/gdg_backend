import { Request, Response } from 'express';

import SkillsService from 'services/skills.services';
import handleRequest from 'utils/handleRequest';

export default class SkillsController {
  public async fetchAll(req: Request, res: Response) {
    handleRequest(res, async () => {
      const skills = await SkillsService.fetchAll();
      return res.status(200).json({ status: 200, skills });
    });
  }
}
