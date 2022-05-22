const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs);
});

blogRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id);
  console.log(user);

  if (!body.hasOwnProperty('likes')) {
    body.likes = 0;
  }
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });
  const result = await newBlog.save();
  user.blogs = user.blogs.concat(result._id)
  await user.save();

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
