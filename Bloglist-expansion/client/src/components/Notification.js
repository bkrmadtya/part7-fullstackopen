import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };
  return (
    notification.visibility && <div style={style}>{notification.message}</div>
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);
