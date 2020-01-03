import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Toggleable = React.forwardRef((props, ref) => {
  const [formVisible, setFormVisible] = useState(false);

  Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  };

  const toggleVisibility = () => {
    setFormVisible(!formVisible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  const visibleElement = () => {
    return (
      <div>
        {formVisible && props.children}
        <button onClick={toggleVisibility}>
          {formVisible ? 'Cancle' : props.buttonLabel}
        </button>
      </div>
    );
  };
  return visibleElement();
});

export default Toggleable;
