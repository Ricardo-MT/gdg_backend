import { mongo } from 'mongoose';

import Skill from 'models/skill.model';
import { CustomError } from 'utils/errors';

class SkillsService {
  public async fetchAll() {
    try {
      const skills = await Skill.find({}).sort({ name: 1 });
      return skills;
    } catch (error) {
      const e = 'Error consultando las habilidades.';
      if (error instanceof mongo.MongoError) {
        switch (error.code) {
          case 11000:
            // e += " Ya existe un usuario con ese email.";
            break;
          default:
            break;
        }
      }
      throw new CustomError(error, e);
    }
  }
}

export default new SkillsService();
