import React from 'react';
import PropTypes from 'prop-types';

const Count = ({ count, position, text }) => (
  <span className={'counterWrap ' + position}>
    {text}
    <span className="counter">{count}</span>
  </span>
);
Count.propTypes = {
  count: PropTypes.number,
  position: PropTypes.string,
  text: PropTypes.string
};
export default Count;
