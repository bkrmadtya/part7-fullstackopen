import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';

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

      <Form size="tiny" onSubmit={handleLogin}>
        <Form.Field>
          <label>Username</label>
          <input
            id="username"
            placeholder="username"
            {...username}
            autoComplete="on"
          ></input>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            id="password"
            placeholder="password"
            {...password}
            autoComplete="on"
          ></input>
        </Form.Field>
        <Button id="login-btn" size="tiny" type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default connect(null, { login })(LoginForm);
