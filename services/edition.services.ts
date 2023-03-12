import { mongo } from 'mongoose';

import { IEdition } from 'interfaces/IEdition';
import Edition from 'models/edition.model';
import { CustomError } from 'utils/errors';

class EditionService {
  // Get all Editions
  public async fetchAll() {
    try {
      const editions = await Edition.find({
        date: { $lte: new Date() },
      }).sort({ _id: -1 });
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
      const editions = await Edition.find({
        date: { $lte: new Date() },
      })
        .sort({ _id: -1 })
        .limit(3);
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

  public getById = async (id: string): Promise<IEdition | null> => {
    try {
      const edition = await Edition.findById(id)
        .populate({
          path: 'talks',
          populate: {
            path: 'createdBy',
          },
        })
        .populate({
          path: 'talks',
          populate: {
            path: 'speakersIds',
          },
        });
      if (edition) return edition;
      throw new Error('Not found');
    } catch (error) {
      const e = 'Error buscando edición.';
      throw new CustomError(error, e);
    }
  };

  public getNextEdition = async (): Promise<IEdition | null> => {
    try {
      const now = new Date().valueOf();
      const query = {
        date: { $gt: now },
      };
      const editions = await Edition.find(query)
        .sort({ date: 1 })
        .limit(1)
        .populate({
          path: 'talks',
          populate: {
            path: 'createdBy',
          },
        })
        .populate({
          path: 'talks',
          populate: {
            path: 'speakersIds',
          },
        });

      if (editions && editions[0]) return editions[0];
      throw new Error('Not found');
    } catch (error) {
      const e = 'Error buscando próxima edición.';
      throw new CustomError(error, e);
    }
  };

  // create
  public create = async (
    organizer: string,
    date: Date,
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
