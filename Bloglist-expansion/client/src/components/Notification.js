import React from 'react';

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }

  let notificationStyle = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

  return <div style={notificationStyle}>{notification.message}</div>;
};

export default Notification;
