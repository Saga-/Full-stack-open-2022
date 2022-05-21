const Blog = require('../models/Blog');

const initialBlogs = [
  {
    title: 'foo',
    author: 'bar',
    url: 'localhost',
    likes: 555
  },
  {
    title: 'test',
    author: 'Daniel',
    url: 'localhost',
    likes: 1988
  },
  {
    title: 'test2',
    author: 'Carl',
    url: 'localhost',
    likes: 0
  },
  {
    title: 'test3',
    author: 'Daniel',
    url: 'localhost',
    likes: 11
  },
  {
    title: 'test4',
    author: 'John',
    url: 'localhost',
    likes: 4343
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'noId', author: 'Daniel', url: 'localhost', likes: 99 });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
}

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
