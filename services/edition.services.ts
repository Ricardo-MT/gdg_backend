import { mongo } from 'mongoose';

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
}

export default new EditionService();
