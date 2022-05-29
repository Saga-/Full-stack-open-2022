const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const helper = require('./users_test_helper');

const User = require('../models/User');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.initialUsers.map(user => new User(user));
  const promiseArray = userObjects.map(user => user.save());
  await Promise.all(promiseArray);
});

describe('POST /api/users', () => {
  const ENDPOINT = '/api/users'
  it('should successfully create a new user', async () => {
    const newUser = {
      username: 'john22',
      name: 'johnyy',
      password: '123456'
    };
    const response = await api.post(ENDPOINT).send(newUser).expect(201).expect('Content-Type', /application\/json/);
    expect(response.status).toEqual(201);

    const users = await User.find({});
    const userNames = users.map(user => user.username);
    expect(userNames).toContain(newUser.username);
  })

  it('should return a 400 code if a username has less than 3 characters', async () => {
    const newUser = {
      username: 'da',
      name: 'john',
      password: '1234'
    };
    const response = await api.post(ENDPOINT).send(newUser).expect(400);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ error: 'username or password must be at least 3 characters' });
  });

  it('should return a 400 code if a password has less than 3 characters', async () => {
    const newUser = {
      username: 'john',
      name: 'john',
      password: '13'
    };
    const response = await api.post(ENDPOINT).send(newUser).expect(400);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ error: 'username or password must be at least 3 characters' });
  });

  it('should return a 400 code if a user already exists', async () => {
    const newUser = {
      username: 'johnc',
      name: 'john',
      password: '13'
    };
    const response = await api.post(ENDPOINT).send(newUser).expect(400);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ error: 'username must be unique' });
  });

})

afterAll(() => {
  mongoose.connection.close();
});
