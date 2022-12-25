import passport from 'passport';

import { IUser, IPublicUser } from 'interfaces/IUsuario';
import User from 'models/user.model';

const passportLoader = async () => {
  passport.serializeUser((user: IPublicUser, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user: IUser) => {
      if (err) throw err;
      if (user) {
        done(err, {
          _id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          descripcion: user.descripcion,
          skills: user.skills,
          role: user.role,
          socialLinks: user.socialLinks,
          statuses: user.statuses,
          dateOfJoining: user.dateOfJoining,
        });
      } else done(err, null);
    });
  });
};

export default passportLoader;
