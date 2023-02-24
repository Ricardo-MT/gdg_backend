import { IPublicUser } from 'interfaces/IUsuario';
import User from 'models/user.model';
import { CustomError } from 'utils/errors';

class AuthenticationService {
  // login
  public login = async (
    email: string,
    pass: string,
  ): Promise<{ user: IPublicUser; correct: boolean }> => {
    let correct = false;
    try {
      let err;
      const user = await User.findOne({ email }).select('+password');
      if (err) throw err;

      if (user) correct = await user.validPassword(pass);

      if (correct) {
        // Quitar todas las propiedades además de estas que no sean públicas.
        const {
          password,
          salt,
          validPassword,
          encryptPassword,
          ...publicUser
        } = ({ ...user } as any)._doc;
        return { user: publicUser, correct: true };
      }
      return { user: null, correct: false };
    } catch (error) {
      let e = 'Error en login.';
      if (error.code) {
        switch (error.code) {
          case 11000:
            e += ' Ya existe un usuario con esos datos.';
            break;
          default:
            break;
        }
      }
      throw new CustomError(error, e);
    }
  };

  // register
  public register = async (
    email: string,
    password: string,
    name: string,
    surname: string,
  ): Promise<{ user: IPublicUser; correct: boolean }> => {
    let correct = false;
    try {
      let err;
      let user = new User();
      user.dateOfJoining = Date.now();
      const { salt, hashedPassword } = await user.encryptPassword(password);
      user.salt = salt;
      user.password = hashedPassword;
      user.name = name;
      user.surname = surname;
      user.email = email;
      user = await User.create(user);
      if (err) throw err;

      if (user) correct = await user.validPassword(password);

      if (correct) {
        // Quitar todas las propiedades además de estas que no sean públicas.
        const {
          // password,
          // salt,
          validPassword,
          encryptPassword,
          ...publicUser
        } = ({ ...user } as any)._doc;
        return { user: publicUser, correct: true };
      }
      return { user: null, correct: false };
    } catch (error) {
      let e = 'Error en register.';
      if (error.code) {
        switch (error.code) {
          case 11000:
            e += ' Ya existe un usuario con esos datos.';
            break;
          default:
            break;
        }
      }
      throw new CustomError(error, e);
    }
  };
}

export default new AuthenticationService();
