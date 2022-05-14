const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

blogRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
})

blogRouter.post('/api/blogs', async (request, response) => {
  const newBlog = new Blog(request.body);
  const result = await newBlog.save();
  return response.status(201).json(result);
})

module.exports = blogRouter;
