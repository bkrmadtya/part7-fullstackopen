import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer';
import authReducer from './reducers/authReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  login: authReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
