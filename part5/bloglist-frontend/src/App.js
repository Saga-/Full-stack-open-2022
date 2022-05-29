import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Login } from './components/Login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('blogAppUser');
    if (!!loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user)
    }
  }, []);

  function logout() {
    loginService.logout();
    setUser(null)
  }

  function renderBlogs() {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={logout}>
          logout
        </button>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
    )
  }

  function renderLoginForm() {
    return (
      <div>
        <Login user={user} setUser={setUser} />
      </div>
    )
  }

  return (
    <div>
      {user === null ? renderLoginForm() : renderBlogs()}
    </div>
  )
}

export default App
