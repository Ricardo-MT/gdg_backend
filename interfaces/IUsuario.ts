export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  descripcion?: string;
  skills: Array<string>;
  role: 'admin' | 'ponente';
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    blog?: string;
  };
  statuses: {
    verified?: string;
    banned?: string;
  };
  dateOfJoining: number;
  password: string;
  salt: Buffer;
  updated_for: string;
  validPassword(password: string): Promise<boolean>;
  encryptPassword(
    password: string,
  ): Promise<{ salt: Buffer; hashedPassword: string; err: Error }>;
}

export interface IPublicUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  descripcion?: string;
  skills: Array<string>;
  role: 'admin' | 'ponente';
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    blog?: string;
  };
  statuses: {
    verified?: string;
    banned?: string;
  };
  dateOfJoining: number;
}
