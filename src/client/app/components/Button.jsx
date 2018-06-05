import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ handler, styleButton, children }) => {
  return (
    <a onClick={handler} className={styleButton}>
      {children}
    </a>
  );
};
Button.propTypes = {
  handler: PropTypes.func,
  styleButton: PropTypes.string,
  children: PropTypes.string
};
export default Button;
