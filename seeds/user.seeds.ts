import User from '../models/user.model';

import Logger from '../loaders/logger';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import { ROL_ADMIN, ROL_PONENTE } from '../utils/rol';

const usersData = [
    { name: "Rachel", surname: "Lindsey", email: "rlindsey@iturri.com", role: ROL_ADMIN },
    { name: "Barnes", surname: "Howard", email: "bhoward@iturri.com", role: ROL_ADMIN },
    { name: "Aneglina", surname: "Bowen", email: "abowen@iturri.com", role: ROL_PONENTE },
    { name: "Stacie", surname: "Rhodes", email: "srhodes@iturri.com", role: ROL_PONENTE },
]

async function userSeeds() {
    for (let i = 0; i < usersData.length; i++) {
        const salt = randomBytes(32);
        const hashedPassword = await argon2.hash(usersData[i].name, { salt });
        let userToInsert = { ...usersData[i], salt, password: hashedPassword };

        await new User(userToInsert).save();
        continue;
    }
    Logger.debug('Usuarios seeds terminado.');
}

export default userSeeds;