import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history';

import { ISkill } from 'interfaces/ISkill';

const { Schema } = mongoose;
const skillSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      trim: true,
    },
  },
  { versionKey: '_version' },
);

skillSchema.plugin(mongooseHistory);

export default mongoose.model<ISkill & mongoose.Document>('Skill', skillSchema);
