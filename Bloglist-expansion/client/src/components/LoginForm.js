import React from 'react';
import { connect } from 'react-redux';

import { login } from '../reducers/authReducer';

import { useField } from '../hooks';

const LoginForm = ({ login }) => {
  const [username, resetUsername] = useField('text');
  const [password, resetPassword] = useField('password');

  const handleLogin = e => {
    e.preventDefault();
    login(username.value, password.value);

    resetUsername('');
    resetPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>
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
    </div>
  );
};

export default connect(null, { login })(LoginForm);
