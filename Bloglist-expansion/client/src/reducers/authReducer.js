import loginService from '../services/login';
import blogService from '../services/blogs';

import { setNotification } from './notificationReducer';

const getUser = () => {
  const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
  if (loggedUserJson) {
    const user = JSON.parse(loggedUserJson);
    blogService.setToken(user.token);

    return user;
  } else {
    return null;
  }
};

const authReducer = (state = getUser(), action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...action.payload };
    case 'LOG_OUT':
      return null;
    default:
      return state;
  }
};

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);

      dispatch({ type: 'LOG_IN', payload: user });

      dispatch(
        setNotification({ message: `${user.name} logged in!`, type: 'success' })
      );
    } catch (e) {
      dispatch(
        setNotification({ message: `Wrong credentials`, type: 'error' })
      );
    }
  };
};

export const logout = () => {
  return dispatch => {
    console.log('logout action called');
    window.localStorage.clear();

    dispatch({ type: 'LOG_OUT' });
  };
};

export default authReducer;
