import React from 'react';
import { connect } from 'react-redux';

import { login } from '../reducers/authReducer';

import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, username, password }) => {
  LoginForm.prototype = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username <input placeholder="username" {...username}></input>
      </div>
      <div>
        password <input placeholder="password" {...password}></input>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default connect(null, { login })(LoginForm);
