/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { randomBytes } from 'crypto';

import argon2 from 'argon2';

import Logger from 'loaders/logger';
import User from 'models/user.model';
import { ROL_ADMIN, ROL_PONENTE } from 'utils/rol';

const usersData: Array<any> = [
  {
    name: 'Rachel',
    surname: 'Lindsey',
    email: 'rlindsey@gdgalgeciras.com',
    role: ROL_ADMIN,
    descripcion:
      'Qui magna nostrud irure qui consectetur. Consequat duis quis Lorem ipsum voluptate nostrud enim exercitation Lorem anim. Ipsum aliqua quis in labore aute veniam sit consequat est. Proident ut voluptate est et.',
    skills: ['React', 'Javascript', 'Css', 'Vue', 'Flutter'],
    socialLinks: {
      instagram: 'https://www.google.es/',
      facebook: 'https://www.google.es/',
      linkedin: 'https://www.google.es/',
      twitter: 'https://www.google.es/',
      github: 'https://www.google.es/',
      blog: 'https://www.google.es/',
    },
    statuses: {
      verified: true,
    },
    dateOfJoining: 1674466166,
  },
  {
    name: 'Barnes',
    surname: 'Howard',
    email: 'bhoward@gdgalgeciras.com',
    role: ROL_ADMIN,
    descripcion:
      'Qui magna nostrud irure qui consectetur. Consequat duis quis Lorem ipsum voluptate nostrud enim exercitation Lorem anim. Ipsum aliqua quis in labore aute veniam sit consequat est. Proident ut voluptate est et.',
    skills: ['React', 'Javascript', 'Css', 'Vue', 'Flutter'],
    socialLinks: {
      instagram: 'https://www.google.es/',
      facebook: 'https://www.google.es/',
      linkedin: 'https://www.google.es/',
      twitter: 'https://www.google.es/',
      github: 'https://www.google.es/',
      blog: 'https://www.google.es/',
    },
    statuses: {
      verified: true,
    },
    dateOfJoining: 1674466166,
  },
  {
    name: 'Aneglina',
    surname: 'Bowen',
    email: 'abowen@awesomecompany.com',
    role: ROL_PONENTE,
    descripcion:
      'Qui magna nostrud irure qui consectetur. Consequat duis quis Lorem ipsum voluptate nostrud enim exercitation Lorem anim. Ipsum aliqua quis in labore aute veniam sit consequat est. Proident ut voluptate est et.',
    skills: ['React', 'Javascript', 'Css', 'Vue', 'Flutter'],
    socialLinks: {
      instagram: 'https://www.google.es/',
      facebook: 'https://www.google.es/',
      linkedin: 'https://www.google.es/',
      twitter: 'https://www.google.es/',
      github: 'https://www.google.es/',
      blog: 'https://www.google.es/',
    },
    statuses: {
      verified: true,
    },
    dateOfJoining: 1674466166,
  },
  {
    name: 'Stacie',
    surname: 'Rhodes',
    email: 'srhodes@awesomecompany.com',
    role: ROL_PONENTE,
    descripcion:
      'Qui magna nostrud irure qui consectetur. Consequat duis quis Lorem ipsum voluptate nostrud enim exercitation Lorem anim. Ipsum aliqua quis in labore aute veniam sit consequat est. Proident ut voluptate est et.',
    skills: ['React', 'Javascript', 'Css', 'Vue', 'Flutter'],
    socialLinks: {
      instagram: 'https://www.google.es/',
      facebook: 'https://www.google.es/',
      linkedin: 'https://www.google.es/',
      twitter: 'https://www.google.es/',
      github: 'https://www.google.es/',
      blog: 'https://www.google.es/',
    },
    statuses: {
      verified: false,
    },
    dateOfJoining: 1674466166,
  },
];

async function userSeeds() {
  await User.deleteMany({});
  for (let i = 0; i < usersData.length; i++) {
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(usersData[i].name, { salt });
    const userToInsert = { ...usersData[i], salt, password: hashedPassword };

    await new User(userToInsert).save();
  }
  Logger.debug('Usuarios seeds terminado.');
}

export default userSeeds;
