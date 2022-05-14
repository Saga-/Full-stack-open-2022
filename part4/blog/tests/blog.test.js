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

  it('should assign a default value of 0 likes if the property does not exist', async () => {
    const data = {
      title: 'newBlog',
      author: 'test',
      url: 'localhost'
    };

    await api.post(ENDPOINT).send(data);
    const response = await api.get(ENDPOINT);
    const newBlog = response.body.find(blog => blog.title === data.title);
    expect(newBlog.likes).toEqual(0);

  })

  it('should return a 400 if the title is missing from the request', async () => {
    const data = {
      author: 'test',
      url: 'localhost'
    };

    const response = await api.post(ENDPOINT).send(data).expect(400);
    expect(response.status).toEqual(400);
  });

  it('should return a 400 if the url is missing from the request', async () => {
    const data = {
      author: 'test',
      title: 'foo'
    };

    const response = await api.post(ENDPOINT).send(data).expect(400);
    expect(response.status).toEqual(400);
  })
});

describe('DELETE /api/blogs/:id', () => {
  const ENDPOINT = '/api/blogs';
  it('should delete a blog by ID', async () => {
    const blogs = await Blog.find({});
    await api.delete(`${ENDPOINT}/${blogs[0].id}`).expect(204);
    const blogsNew = await Blog.find({});
    expect(blogsNew.length).toEqual(blogs.length - 1);
  })
})

describe('PUT /api.blogs/:id', () => {
  const ENDPOINT = '/api/blogs';
  it('should update the blog by ID', async () => {
    const blogs = await Blog.find({});
    const id = blogs[0].id;
    await api.put(`${ENDPOINT}/${id}`).send({ likes: 500 }).expect(200);
    const blog = await Blog.findById(id)
    console.log(blog);
    expect(blog.likes).toEqual(500);
  })
})


afterAll(() => {
  mongoose.connection.close();
});


