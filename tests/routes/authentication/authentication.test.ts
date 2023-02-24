import request from 'supertest';

import expressLoader from 'loaders/express';
import mongooseLoader from 'loaders/mongoose';

describe('Authentication', () => {
  let app;
  let connection;
  beforeAll(async () => {
    connection = await mongooseLoader();
    app = await expressLoader(connection);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('1ST LOGOUT REQUEST', async () => {
    const res = await request(app).delete('/api/authentication').send();
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty(
      'message',
      'Para entrar aquí tienes que iniciar sesión.',
    );
  });

  it('1ST TIME CHECK USER INFO', async () => {
    const res = await request(app).get('/api/authentication').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      'message',
      'Successful connection to backend service',
    );
  });

  it('USER LOGIN', async () => {
    const res = await request(app).post('/api/authentication').send({
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('message', 'Inicio de sesión correcto.');
  });

  it('2ND TIME CHECK USER INFO', async () => {
    const res = await request(app).get('/api/authentication').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      'message',
      'Successful connection to backend service',
    );
  });

  it('USER LOGOUT', async () => {
    const res = await request(app).delete('/api/authentication').send();
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty(
      'message',
      'Para entrar aquí tienes que iniciar sesión.',
    );
  });
});
