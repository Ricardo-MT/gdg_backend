import mongoose from 'mongoose';
import config from '../config';
import Logger from '../loaders/logger';
import userSeeds from './user.seeds';

export async function seeds() {
    try {
        const uri = process.env.ATLAS_URI;
        await mongoose.connect(uri, config.mongooseConnectionOptions);
        var date = new Date().valueOf()
        console.log("EMPEZAMOS LOS SEEDS");

        /*--- AQUI VAN LOS SEEDS ---*/

        // await userSeeds();

        /*--- AQUI TERMINAN LOS SEEDS ---*/

        console.log("ACABAMOS LOS SEEDS");
        console.log(new Date().valueOf() - date + 'ms');
        mongoose.disconnect()

    } catch (error) {
        Logger.error("Se ha producido un error.")
        Logger.error(error)
    }
}

seeds();