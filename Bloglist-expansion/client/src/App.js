import React, { useState, useEffect } from 'react';

import { useField } from './hooks';

import loginService from './services/login';
import blogService from './services/blogs.js';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Toggleable from './components/Toggleable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null });
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');
  const username = useField('text');
  const password = useField('password');

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
    }
  }, []);

  const handleCreateBlog = async event => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();

    try {
      await blogService.createBlog({
        title: title.value,
        author: author.value,
        url: url.value
      });

      fetchBlogs();
      setNotification({
        message: `a new blog ${title.value} by ${author.value} added`
      });

      title.reset('');
      author.reset('');
      url.reset('');
    } catch (exception) {
      setNotification({ message: 'Error creating new Blog', type: 'error' });
    } finally {
      setTimeout(() => {
        setNotification({ message: null });
      }, 3000);
    }
  };

  const handleBlogUpdate = async blogToUpdate => {
    try {
      console.log(blogToUpdate);
      const updatedBlog = await blogService.updateBlog(blogToUpdate);

      setNotification({ message: `${updatedBlog.title} updated` });
    } catch (exception) {
      setNotification({ message: 'Error updating', type: 'error' });
    } finally {
      setTimeout(() => {
        setNotification({ message: null });
      }, 3000);
    }
  };

  const handleDeleteBlog = async blog => {
    try {
      await blogService.deleteBlog(blog);
      fetchBlogs();

      setNotification({ message: `${blog.title} deleted` });
    } catch (exception) {
      setNotification({ message: 'Error updating', type: 'error' });
    } finally {
      setTimeout(() => {
        setNotification({ message: null });
      }, 3000);
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

      username.reset('');
      password.reset('');
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error' });
    } finally {
      setTimeout(() => {
        setNotification({ message: null });
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const allBlogs = () => {
    // const usersBlog = blogs.filter(
    //   blog => blog.user.username === user.username
    // );
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
      <Notification notification={notification} />

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
            <BlogForm
              handleCreateBlog={handleCreateBlog}
              title={title}
              author={author}
              url={url}
            />
          </Toggleable>

          {allBlogs()}
        </div>
      )}
    </div>
  );
}

export default App;
