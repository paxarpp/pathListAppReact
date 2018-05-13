import React from 'react';
import PropTypes from 'prop-types';

const Car = ({ car, handler, selectedCar }) => {
  return (
    <div
      onClick={handler}
      className={selectedCar === car.name ? 'selected' : ''}
    >
      {car.name}
    </div>
  );
};
export default Car;
