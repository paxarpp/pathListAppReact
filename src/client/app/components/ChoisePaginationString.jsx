import React from 'react';
import PropTypes from 'prop-types';

const ChoisePaginationString = ({ handler }) => (
  <div className="choisePaginationString">
    <select defaultValue={22} onChange={handler}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={22}>22</option>
      <option value={40}>40</option>
    </select>
  </div>
);
ChoisePaginationString.propTypes = {
  handler: PropTypes.func.isRequired
};

export default ChoisePaginationString;
