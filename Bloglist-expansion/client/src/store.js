import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer';
import authReducer from './reducers/authReducer';
import blogReducer from './reducers/blogReducer';

const reducer = combineReducers({
  user: authReducer,
  blogs: blogReducer,
  notification: notificationReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
