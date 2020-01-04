const initialNotification = {
  message: '',
  type: '',
  visibility: false
};

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'TOGGLE_NOTIFICATION':
      return { ...action.payload };
    default:
      return state;
  }
};

export const setNotification = notification => {
  return dispatch => {
    dispatch(displayNotification(notification));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 2000);
  };
};

const displayNotification = notification => {
  return {
    type: 'TOGGLE_NOTIFICATION',
    payload: { ...notification, visibility: true }
  };
};

const clearNotification = () => {
  return {
    type: 'TOGGLE_NOTIFICATION',
    payload: {
      message: '',
      type: '',
      visibility: false
    }
  };
};

export default notificationReducer;
