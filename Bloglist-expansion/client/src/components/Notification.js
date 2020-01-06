import React from 'react';
import { connect } from 'react-redux';
import { Transition, Segment } from 'semantic-ui-react';

const Notification = ({ notification }) => {
  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    padding: '10px',
    margin: '10px 0'
  };
  return (
    notification.visibility && (
      <Transition
        as={Segment}
        duration={200}
        divided
        size="huge"
        verticalAlign="middle"
      >
        <Segment textAlign="center" color={style.color} style={style}>
          {notification.message}
        </Segment>
      </Transition>
    )
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);
