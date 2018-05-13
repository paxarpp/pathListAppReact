import React from 'react';
import PropTypes from 'prop-types';

const Path = ({ path, handler, selectedCar }) => {
  return (
    <div
      onClick={handler}
      className={selectedCar === path.name ? 'selected' : null}
    >
      {path.name} : {path.dateBegin}
    </div>
  );
};
export default Path;
