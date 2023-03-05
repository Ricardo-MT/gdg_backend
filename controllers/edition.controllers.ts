import { Request, Response } from 'express';

import EditionService from 'services/edition.services';
import handleRequest from 'utils/handleRequest';

export default class EditionsController {
  // eslint-disable-next-line consistent-return
  public async getEditions(req: Request, res: Response) {
    handleRequest(res, async () => {
      const editions = await EditionService.fetchAll();
      return res.status(200).json({ status: 200, editions });
    });
  }
}
