const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const helper = require('./test_helper');

const Blog = require('../models/Blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
})


describe('/api/blogs', () => {
  const ENDPOINT = '/api/blogs';

  it('should return blogs as JSON', async () => {
    await api
      .get(ENDPOINT)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  })

  it('should return all blogs', async () => {
    const response = await api.get(ENDPOINT);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  })

  it('should return blogs with an _id property', async () => {
    const response = await api.get(ENDPOINT);
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })

})

afterAll(() => {
  mongoose.connection.close()
})


