import React from 'react';
import styled from 'styled-components';
import Car from './Car';
import CountErr from '../components/CountErr';
import { IError, ICar } from './interfaces';

interface IProps {
  cars: ICar[];
  selectedCar: string;
  deleteCarHandler: () => void;
  carInfo: (name: string) => any;
  error: IError[][];
}

const prepareCount = (error: IError[][], car: ICar) => {
  const arr = error
    .filter((el)=> el.find(elem => elem.name === car.name) && el)
    .map(el => el.filter(path => (path.errorFuel || path.errorPath) && path));
  return arr[0] ? arr[0].length : 0;
};

const CarList = ({ cars, selectedCar, deleteCarHandler, error, carInfo }: IProps) => (
  <WrapperCarList>
    {cars.map(car => (
      <List key={car.name}>
        <Car selectedCar={selectedCar} car={car} handler={carInfo(car.name)} deleteCarHandler={deleteCarHandler} />
        <CountErr count={prepareCount(error, car)} />
      </List>
    ))}
  </WrapperCarList>
);

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
