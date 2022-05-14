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


describe('GET /api/blogs', () => {
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
    response.body.forEach(blog => expect(blog.id).toBeDefined());
  });
})

describe('POST api/blogs', () => {
  const ENDPOINT = '/api/blogs';

  it('should add a new blog post to the database', async () => {
    const data = {
      title: 'newBlog',
      author: 'test',
      url: 'localhost',
      likes: 1448
    };
    await api
      .post(ENDPOINT)
      .send(data)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get(ENDPOINT);
    const titles = response.body.map(blog => blog.title);
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain('newBlog');
  });
});

afterAll(() => {
  mongoose.connection.close();
});


