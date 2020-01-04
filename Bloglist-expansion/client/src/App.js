import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { initializeBlogs } from './reducers/blogReducer';
import { logout } from './reducers/authReducer';
import { initializeUsers } from './reducers/usersReducer';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs/Blogs';
import Blog from './components/Blogs/Blog';
import UserList from './components/Users/UserList';
import User from './components/Users/User';

function App(props) {
  const {
    initializeBlogs,
    initializeUsers,
    logout,
    user,
    users,
    blogs
  } = props;

  useEffect(() => {
    initializeBlogs();
    initializeUsers();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const getUserById = id => {
    return users.find(user => user.id === id);
  };

  const getBlogById = id => {
    return blogs.find(blog => blog.id === id);
  };

  const styles = {
    nav: {
      padding: 5,
      background: '#CCC'
    },
    link: {
      paddingRight: 5
    }
  };

  return (
    <div>
      <Notification />

      <Router>
        <div style={styles.nav}>
          <Link style={styles.link} to="/">
            blogs
          </Link>
          <Link style={styles.link} to="/users">
            users
          </Link>
          {user && (
            <span>
              <strong>
                {user.name} logged in{' '}
                <button onClick={handleLogout}>Logout</button>
              </strong>
            </span>
          )}
        </div>
        <h2>blog app</h2>

        <Route
          exact
          path="/"
          render={() => (user ? <Blogs /> : <LoginForm />)}
        />
        <Route exact path="/users" render={() => <UserList />} />
        <Route
          exact
          path="/users/:id"
          render={({ match }) => <User user={getUserById(match.params.id)} />}
        />
        <Route
          exact
          path="/blogs/:id"
          render={({ match }) => <Blog blog={getBlogById(match.params.id)} />}
        />
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  };
};

export default connect(mapStateToProps, {
  initializeBlogs,
  initializeUsers,
  logout
})(App);
