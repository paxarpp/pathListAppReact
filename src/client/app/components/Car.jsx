import React from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button';

const Car = ({ car, handler, selectedCar, deleteCarHandler }) => {
  return (
    <div onClick={handler} className={selectedCar === car.name ? 'selected' : ''}>
      {car.name}
      <Button handler={deleteCarHandler(car.name)} styleButton="delit">
        {String.fromCharCode(10006)}
      </Button>
    </div>
  );
};
Car.propTypes = {
  car: PropTypes.object,
  selectedCar: PropTypes.string,
  handler: PropTypes.func,
  deleteCarHandler: PropTypes.func
};

export default Car;
