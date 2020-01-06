import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Toggleable = props => {
  const [formVisible, setFormVisible] = useState(false);

  Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  };

  const toggleVisibility = () => {
    setFormVisible(!formVisible);
  };

  const style = {
    margin: '10px 0'
  };

  const visibleElement = () => {
    return (
      <div>
        {formVisible && props.children}
        <Button
          id="create_cancel_btn"
          size="mini"
          style={style}
          onClick={toggleVisibility}
          color={formVisible ? 'red' : 'green'}
        >
          {formVisible ? 'Cancle' : props.buttonLabel}
        </Button>
      </div>
    );
  };
  return visibleElement();
};

export default Toggleable;
