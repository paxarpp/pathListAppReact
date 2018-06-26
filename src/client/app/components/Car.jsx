import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';
import Icon from './Icon';

const Car = ({ car, handler, selectedCar, deleteCarHandler }) => (
  <Wrap onClick={handler} selectedCar={selectedCar} name={car.name}>
    {car.name}
    <Button handler={deleteCarHandler(car.name)} styleButton="delit">
      <Icon name="Delete" color="red" />
    </Button>
  </Wrap>
);
Car.propTypes = {
  car: PropTypes.object,
  selectedCar: PropTypes.string,
  handler: PropTypes.func,
  deleteCarHandler: PropTypes.func
};
const selected = `
  background-color: #fff;
  width: 100%;
  border-radius: 20px 0 0 20px;
  position: relative;
  transition: background-color 0.2s;
  :after {
    content: '';
    position: absolute;
    top: -10px;
    right: 0;
    border: 5px solid transparent;
    border-right: 5px solid #fff;
    border-bottom: 5px solid #fff;
  }
  :before {
    content: '';
    border: 5px solid transparent;
    border-top: 5px solid #fff;
    border-right: 5px solid #fff;
    position: absolute;
    bottom: -10px;
    right: 0;
  }
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-left: 1rem;
  ${props => props.selectedCar === props.name && selected};
`;
export default Car;
