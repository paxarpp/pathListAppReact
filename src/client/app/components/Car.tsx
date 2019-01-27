import React from 'react';
import styled, { css } from 'styled-components';
import { ICar } from './interfaces';
import Icon from './Icon';

interface IProp {
  car: ICar;
  selectedCar: string;
  handler: (h: any) => any;
  deleteCarHandler: (name: string) => any;
};

interface WrapProp {
  isSelectedCar: boolean;
};

const Car = ({ car, handler, selectedCar, deleteCarHandler }: IProp) => (
  <Wrap onClick={handler} isSelectedCar={selectedCar === car.name}>
    {car.name}
    <Icon name="Delete" color="red" onClick={deleteCarHandler(car.name)} />
  </Wrap>
);

const selected = css`
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
  ${(props: WrapProp) => props.isSelectedCar && selected};
`;

export default Car;
