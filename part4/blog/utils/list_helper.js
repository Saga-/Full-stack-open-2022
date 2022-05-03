const dummy = blogs => {
  return 1;
}

const totalLikes = blogs => {
  return blogs.reduce((a, b) => a + b.likes, 0);
}

const favouriteBlog = blogs => {
  return blogs.reduce((a, b) => a.likes > b.likes ? a : b);
}

const mostBlogs = blogs => {
  debugger;
  let authorBlogs = {};
  blogs.forEach(blog => {
    if (!authorBlogs[blog.author]) {
      authorBlogs[blog.author] = 1;
    } else {
      authorBlogs[blog.author] += 1;
    }
  });
  return Object.keys(authorBlogs).reduce((a, b) => {
    return authorBlogs[a] > authorBlogs[b] ? { author: a, blogs: authorBlogs[a] } : { author: b, blogs: authorBlogs[b] }
  });

}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}
