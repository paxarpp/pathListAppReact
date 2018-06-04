import React from 'react';
import PropTypes from 'prop-types';

const CountErr = ({ count }) => (
  <span className="counterWrapError">
    <span className="counter">{count}</span>
  </span>
);
CountErr.propTypes = {
  count: PropTypes.number
};
export default CountErr;
