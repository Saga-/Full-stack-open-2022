const listHelper = require('../list_helper');

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toEqual(1);
  })
})

describe('totalLikes', () => {
  const blogs = [
    { "likes": 300 },
    { "likes": 301 }
  ]
  test('adds up all likes', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toEqual(601);
  })
  test('returns likes of only blog if there is one blog', () => {
    const blog = [blogs[0]];
    const result = listHelper.totalLikes(blog);
    expect(result).toEqual(300);
  })
})

describe('favouriteBlog', () => {
  const blogs = [
    {
        "title": "Test",
        "author": "Me",
        "url": "localhost",
        "likes": 300,
        "id": "626fb93d4de4c5597eed918f"
    },
    {
        "title": "Test2",
        "author": "Me",
        "url": "localhost",
        "likes": 301,
        "id": "626fbdd2f8fa76c21aadb403"
    }
  ];
  it('should return the blog with the most likes', () => {
    const result = listHelper.favouriteBlog(blogs);
    const expected = blogs[1];
    expect(result).toEqual(expected);
  })
})
