import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Car from './Car.jsx';
import CountErr from '../components/CountErr';

const CarList = ({ cars, selectedCar, deleteCarHandler, error, carInfo }) => (
  <WrapperCarList>
    {cars.map(car => (
      <List key={car.name}>
        <Car selectedCar={selectedCar} car={car} handler={carInfo(car.name)} deleteCarHandler={deleteCarHandler} />
        {error.find(elem => elem.name === car.name) ? (
          <CountErr count={error.filter(elem => elem.name === car.name).length / 2} />
        ) : null}
      </List>
    ))}
  </WrapperCarList>
);

CarList.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.object),
  selectedCar: PropTypes.string,
  deleteCarHandler: PropTypes.func,
  carInfo: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.object)
};
const WrapperCarList = styled.div`
  width: 300px;
  padding: 50px 0 10px 20px;
  background-color: #80808099;
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
