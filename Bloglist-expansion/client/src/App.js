import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { setNotification } from './reducers/notificationReducer';

import { useField } from './hooks';

import loginService from './services/login';
import blogService from './services/blogs.js';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Toggleable from './components/Toggleable';

function App({ setNotification }) {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, resetUsername] = useField('text');
  const [password, resetPassword] = useField('password');

  const blogFormRef = React.createRef();

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
      setNotification({ message: `${user.name} logged in`, type: 'success' });
    }
  }, []);

  const handleCreateBlog = async blog => {
    blogFormRef.current.toggleVisibility();

    try {
      const newBlog = await blogService.createBlog(blog);
      setBlogs([...blogs, newBlog]);

      setNotification({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        type: 'success'
      });
    } catch (exception) {
      setNotification({ message: 'Error creating new Blog', type: 'error' });
    }
  };

  const handleBlogUpdate = async blogToUpdate => {
    try {
      console.log(blogToUpdate);
      const updatedBlog = await blogService.updateBlog(blogToUpdate);

      setNotification({
        message: `${updatedBlog.title} updated`,
        type: 'success'
      });
    } catch (exception) {
      setNotification({ message: 'Error updating', type: 'error' });
    }
  };

  const handleDeleteBlog = async blog => {
    try {
      await blogService.deleteBlog(blog);
      fetchBlogs();

      setNotification({ message: `${blog.title} deleted`, type: 'success' });
    } catch (exception) {
      setNotification({ message: 'Error updating', type: 'error' });
    }
  };

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      resetUsername('');
      resetPassword('');

      setNotification({
        message: `${user.name} logged in`,
        type: 'success'
      });
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error' });
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const allBlogs = () => {
    const sortedBlog = blogs.sort((blog1, blog2) => {
      if (blog1.likes === blog2.likes) {
        return 0;
      }
      return blog1.likes < blog2.likes ? 1 : -1;
    });

    return sortedBlog.map(blog => (
      <Blog
        key={blog.id + blog.title}
        blog={blog}
        updateBlog={handleBlogUpdate}
        deleteBlog={handleDeleteBlog}
        blogCreator={(() =>
          blog.user.username === user.username &&
          blog.user.name === user.name)()}
      />
    ));
  };

  return (
    <div>
      <Notification />

      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>

          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Toggleable>

          {allBlogs()}
        </div>
      )}
    </div>
  );
}

export default connect(null, { setNotification })(App);
// export default App;
