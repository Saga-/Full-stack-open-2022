const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const { userExtractor } = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs);
});

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body;
  const user = request.user;
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

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const blogToDelete = request.params.id;
  const user = request.user;
  const blog = await Blog.findById(blogToDelete);

  if (blog.user.toString() === user.id.toString()) {
   await Blog.deleteOne({
      _id: blogToDelete
    });
   return response.status(204).end();
  }
  return response.status(401).json({ error: 'invalid user'});
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
