import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { initializeBlogs } from './reducers/blogReducer';
import { logout } from './reducers/authReducer';

import blogService from './services/blogs.js';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Toggleable from './components/Toggleable';
import BlogList from './components/BlogList';

function App(props) {
  const { setNotification, initializeBlogs, logout, user } = props;

  console.log(user);

  const blogFormRef = React.createRef();

  useEffect(() => {
    initializeBlogs();
  }, []);

  const handleCreateBlog = async blog => {
    blogFormRef.current.toggleVisibility();

    try {
      const newBlog = await blogService.createBlog(blog);

      setNotification({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        type: 'success'
      });
    } catch (exception) {
      setNotification({ message: 'Error creating new Blog', type: 'error' });
    }
  };

  // const handleBlogUpdate = async blogToUpdate => {
  //   try {
  //     console.log(blogToUpdate);
  //     const updatedBlog = await blogService.updateBlog(blogToUpdate);

  //     setNotification({
  //       message: `${updatedBlog.title} updated`,
  //       type: 'success'
  //     });
  //   } catch (exception) {
  //     setNotification({ message: 'Error updating', type: 'error' });
  //   }
  // };

  // const handleDeleteBlog = async blog => {
  //   try {
  //     await blogService.deleteBlog(blog);
  //     fetchBlogs();

  //     setNotification({ message: `${blog.title} deleted`, type: 'success' });
  //   } catch (exception) {
  //     setNotification({ message: 'Error updating', type: 'error' });
  //   }
  // };

  // const handleLogin = async event => {
  //   event.preventDefault();

  //   try {
  //     const user = await loginService.login({
  //       username: username.value,
  //       password: password.value
  //     });

  //     console.log(user);

  //     window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
  //     blogService.setToken(user.token);
  //     setUser(user);

  //     resetUsername('');
  //     resetPassword('');

  //     setNotification({
  //       message: `${user.name} logged in`,
  //       type: 'success'
  //     });
  //   } catch (exception) {
  //     setNotification({ message: 'Wrong credentials', type: 'error' });
  //   }
  // };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Notification />

      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>

          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Toggleable>

          <BlogList />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, {
  initializeBlogs,
  logout
})(App);
// export default App;
