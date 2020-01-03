const initialState = {};

const authReducer = (state = '', action) => {
  switch (action.type) {
    case 'LOGIN':
      return state;
    default:
      return state;
  }
};

export const login = () => {
  console.log('LOGIN REDUCER');
  return dispatch => {
    dispatch({ type: 'LOGIN' });
  };
};

export default authReducer;
