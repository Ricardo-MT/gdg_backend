import { NextFunction, Request, Response } from 'express';

import Logger from 'loaders/logger';
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

  // eslint-disable-next-line consistent-return
  public async get3Last(req: Request, res: Response) {
    handleRequest(res, async () => {
      const editions = await EditionService.get3Last();
      return res.status(200).json({ status: 200, editions });
    });
  }

  // eslint-disable-next-line consistent-return
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      Logger.debug('Inicio proceso de creacion Edicion');
      const { organizer, date, location, title, description } = req.body;
      if (organizer && date && location && title && description) {
        const { edition } = await EditionService.create(
          organizer,
          date,
          location,
          title,
          description,
        );

        Logger.debug('Edicion creada correctamente');
        return res.status(200).json({
          status: 200,
          edition,
          message: 'Edicion creada correctamente.',
        });
      }
      return res.status(401).json({
        status: 401,
        message: 'Algun que otro campo esta sin valor.',
      });
    } catch (e) {
      Logger.debug('ERROR EN EL REGISTER');
      Logger.error(e);
      return res.status(400).json({
        status: 400,
        message: 'Error inesperado en register. Contacte con el administrador.',
      });
    }
  };
}
