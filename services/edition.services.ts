import { mongo } from 'mongoose';

import { IEdition } from 'interfaces/IEdition';
import Edition from 'models/edition.model';
import { CustomError } from 'utils/errors';

class EditionService {
  // Get all Editions
  public async fetchAll() {
    try {
      const editions = await Edition.find({}).sort({ organizer: 1 });
      return editions;
    } catch (error) {
      const e = 'Error consultando las ediciones.';
      if (error instanceof mongo.MongoError) {
        switch (error.code) {
          case 11000:
            // e += " error";
            break;
          default:
            break;
        }
      }
      throw new CustomError(error, e);
    }
  }

  // Get 3 last
  public async get3Last() {
    try {
      const editions = await Edition.find().sort({ _id: -1 }).limit(3);
      return editions;
    } catch (error) {
      const e = 'Error consultando las ediciones.';
      if (error instanceof mongo.MongoError) {
        switch (error.code) {
          case 11000:
            // e += " error";
            break;
          default:
            break;
        }
      }
      throw new CustomError(error, e);
    }
  }

  // create
  public create = async (
    organizer: string,
    date: string,
    location: string,
    title: string,
    description: string,
  ): Promise<{ edition: IEdition; correct: boolean }> => {
    try {
      let err;
      let edition = new Edition();
      edition = await Edition.create({
        organizer,
        date,
        location,
        title,
        description,
      });
      if (err) throw err;
      return { edition, correct: true };
    } catch (error) {
      let e = 'Error en create.';
      if (error.code) {
        switch (error.code) {
          case 11000:
            e += ' Ya existe una edicion con esos datos.';
            break;
          default:
            break;
        }
      }
      throw new CustomError(error, e);
    }
  };
}

export default new EditionService();
