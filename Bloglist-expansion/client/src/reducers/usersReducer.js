import userServices from '../services/users';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return [...action.payload];
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async dispatch => {
    const allUsers = await userServices.getAllUsers();

    dispatch({
      type: 'INIT_USERS',
      payload: allUsers
    });
  };
};

export default reducer;
