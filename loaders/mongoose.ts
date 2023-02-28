import config from 'config';
import mongoose from 'mongoose';

export default async () => {
  const uri = config.ATLAS_URI;
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  return mongoose.connection;
};
