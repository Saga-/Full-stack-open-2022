const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogRouter.post('/', async (request, response, next) => {
  if (!request.body.hasOwnProperty('likes')) {
    request.body.likes = 0;
  }
  const newBlog = new Blog(request.body);
  const result = await newBlog.save();
  return response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response, next) => {
  const blogToDelete = request.params.id;
  const result = await Blog.deleteOne({
    _id: blogToDelete
  });
  return response.status(204).end();
});

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blog = {
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  return response.status(200).json(updatedBlog);
})

module.exports = blogRouter;
