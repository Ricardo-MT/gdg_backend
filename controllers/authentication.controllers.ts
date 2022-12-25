import { Request, Response, NextFunction } from 'express';

import Logger from 'loaders/logger';
import AuthenticationService from 'services/authentication.services';

class AuthenticationController {
  // eslint-disable-next-line consistent-return
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      Logger.debug('Inicio proceso de login');
      const { email, password } = req.body;
      if (email && password) {
        const { user, correct } = await AuthenticationService.login(
          email,
          password,
        );
        if (correct) {
          req.login(user, (err) => {
            if (err) throw err;
            Logger.debug('Logueado correctamente.');
            return res.status(200).json({
              status: 200,
              user,
              message: 'Inicio de sesión correcto.',
            });
          });
        } else {
          return res.status(401).json({
            status: 401,
            message: 'Los datos introducidos no son correctos.',
          });
        }
      } else {
        return res.status(401).json({
          status: 401,
          message: 'Los datos introducidos no son correctos.',
        });
      }
    } catch (e) {
      Logger.debug('ERROR EN EL LOGIN');
      Logger.error(e);
      return res.status(400).json({
        status: 400,
        message:
          'Se ha producido un error inesperado. Contacte con el administrador.',
      });
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logout();
      return res.status(200).json({ status: 200, message: 'Logout correcto' });
    } catch (e) {
      Logger.error(e);
      return res.status(400).json({
        status: 400,
        message:
          'Se ha producido un error inesperado. Contacte con el administrador.',
      });
    }
  };

  public check = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({
        status: 200,
        message: 'Successful connection to backend service',
        user: req.user,
      });
    } catch (e) {
      Logger.error(e);
      return res.status(400).json({
        status: 400,
        message:
          'Se ha producido un error inesperado. Contacte con el administrador.',
      });
    }
  };
}

export default AuthenticationController;
