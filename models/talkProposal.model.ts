import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history';

import { ITalkProposal } from 'interfaces/ITalkProposal';

const { Schema, Types } = mongoose;
const talkProposalSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      trim: true,
    },
    speakersIds: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      required: true,
      minlength: 1,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    skills: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { versionKey: '_version' },
);
talkProposalSchema.plugin(mongooseHistory);

export default mongoose.model<ITalkProposal & mongoose.Document>(
  'TalkProposal',
  talkProposalSchema,
);
