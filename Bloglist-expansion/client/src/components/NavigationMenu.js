import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Button, Icon } from 'semantic-ui-react';

import { logout } from '../reducers/authReducer';

let NavigationMenu = props => {
  const { user, logout } = props;

  let handleLogout = () => {
    logout();
    props.history.push('/');
  };

  const styles = {
    marginBottom: '20px'
  };

  return (
    <div>
      <Menu style={styles} inverted borderless widths={4}>
        <Menu.Item link>
          <Link to="/">
            <strong>Blog App</strong>
            <Icon style={{ marginLeft: '5px' }} name="book" />
          </Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/">Blogs</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item link>
          {user ? (
            <strong>
              {user.name} logged in
              <Button
                style={{ marginLeft: '5px' }}
                animated
                size="mini"
                color="blue"
                onClick={handleLogout}
              >
                <Button.Content visible>Logout</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </strong>
          ) : (
            <Link to="/">Login</Link>
          )}
        </Menu.Item>
      </Menu>

      {/*

       */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  };
};

NavigationMenu = withRouter(NavigationMenu);

export default connect(mapStateToProps, { logout })(NavigationMenu);
