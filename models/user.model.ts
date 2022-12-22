import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import { IUser } from '../interfaces/IUsuario';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history'
import { ROLES, ROL_PONENTE } from '../utils/rol';
import moment from 'moment';

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    select: false
  },
  descripcion: {
    type: String,
  },
  skills: {
    type: [String],
    default: []
  },
  role: {
    type: String,
    enum: ROLES,
    default: ROL_PONENTE,
    required: true,
  },
  socialLinks: {
    type: {
      instagram: {
        type: String,
        default: null,
      },
      facebook: {
        type: String,
        default: null,
      },
      linkedin: {
        type: String,
        default: null,
      },
      twitter: {
        type: String,
        default: null,
      },
      github: {
        type: String,
        default: null,
      },
      blog: {
        type: String,
        default: null,
      },
    },
    default: {
      instagram: null,
      facebook: null,
      linkedin: null,
      twitter: null,
      github: null,
      blog: null,
    },
    required: true,
  },
  statuses: {
    type: {
      verified: {
        type: Boolean,
        default: false
      },
      banned: {
        type: Boolean,
        default: false
      }
    },
    default: {
      verified: false,
      banned: false,
    },
    required: true,
  },
  dateOfJoining: {
    type: Number,
    required: true,
    default: moment.now(),
  },
  salt: {
    type: Buffer,
    required: true,
    select: false
  },
  updated_for: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, { versionKey: '_version' });

userSchema.plugin(mongooseHistory);

userSchema.methods.encryptPassword = async function (password: string): Promise<{ salt: Buffer, hashedPassword: string }> {
  try {
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(password, { salt })

    return { salt, hashedPassword };
  } catch (err) {
    throw err;
  }

};

userSchema.methods.validPassword = async function (password: string): Promise<Boolean> {
  return await argon2.verify((this as any).password, password);
};
export default mongoose.model<IUser & mongoose.Document>('User', userSchema);