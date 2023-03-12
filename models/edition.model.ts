import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history';

import { IEdition } from 'interfaces/IEdition';

const { Schema } = mongoose;
const editionSchema = new Schema(
  {
    organizer: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
    registrationLink: {
      type: String,
      required: false,
      match:
        // eslint-disable-next-line max-len, no-control-regex
        /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      trim: true,
    },
    talks: {
      type: [
        {
          title: String,
          description: String,
          skills: [String],
          createdBy: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
          },
          speakersIds: [
            {
              type: Schema.Types.ObjectId,
              required: true,
              ref: 'User',
              minlength: 1,
            },
          ],
        },
      ],
      required: true,
      minlength: 1,
    },
  },
  { versionKey: '_version' },
);

editionSchema.plugin(mongooseHistory);

export default mongoose.model<IEdition & mongoose.Document>(
  'Edition',
  editionSchema,
);
