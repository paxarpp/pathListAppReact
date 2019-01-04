import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Car from './Car.jsx';
import CountErr from '../components/CountErr';

const prepareCount = (error, car) => {
  const arr = error
    .filter(el => el.find(elem => elem.name === car.name) && el)
    .map(el => el.filter(path => (path.errorFuel || path.errorPath) && path));
  return arr[0] ? arr[0].length : 0;
};

const CarList = ({ cars, selectedCar, deleteCarHandler, error, carInfo }) => (
  <WrapperCarList>
    {cars.map(car => (
      <List key={car.name}>
        <Car selectedCar={selectedCar} car={car} handler={carInfo(car.name)} deleteCarHandler={deleteCarHandler} />
        <CountErr count={prepareCount(error, car)} />
      </List>
    ))}
  </WrapperCarList>
);

CarList.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.object),
  selectedCar: PropTypes.string,
  deleteCarHandler: PropTypes.func,
  carInfo: PropTypes.func,
  error: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.object,
        first: PropTypes.bool,
        last: PropTypes.bool,
        errorPath: PropTypes.bool,
        errorFuel: PropTypes.bool
      })
    )
  )
};
const WrapperCarList = styled.div`
  width: 300px;
  padding: 50px 0 10px 20px;
  background-color: #abf2eb7a;
  flex: 1;
`;
const List = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  height: 2.5rem;
  position: relative;
  :hover {
    text-shadow: 1px 1px 5px grey;
    transform: scale(1.01);
    transition: all 0.2s linear;
    cursor: pointer;
  }
`;
export default CarList;
