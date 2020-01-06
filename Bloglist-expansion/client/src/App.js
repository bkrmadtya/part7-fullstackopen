import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';

import Notification from './components/Notification';
import NavigationMenu from './components/NavigationMenu';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs/Blogs';
import Blog from './components/Blogs/Blog';
import UserList from './components/Users/UserList';
import User from './components/Users/User';

const App = props => {
  const { initializeBlogs, initializeUsers, users, blogs, user } = props;

  useEffect(() => {
    initializeBlogs();
    initializeUsers();
  }, []);

  const getUserById = id => {
    return users.find(user => user.id === id);
  };

  const getBlogById = id => {
    return blogs.find(blog => blog.id === id);
  };

  return (
    <Container>
      <Router>
        <NavigationMenu />
        <Notification />

        <Route
          exact
          path="/"
          render={() => (user ? <Blogs /> : <LoginForm />)}
        />
        <Route
          exact
          path="/users"
          render={() => (user ? <UserList /> : <LoginForm />)}
        />
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
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  };
};

export default connect(mapStateToProps, {
  initializeBlogs,
  initializeUsers
})(App);
