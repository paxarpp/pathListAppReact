import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { saveCar, closeWindow } from '../actions/cars';
import Icon from './Icon';
import { Primary } from './ButtonNew';
import InputCarValue from './InputCarValue';
import InputExtension from './InputExtension';
import Header from './header';
import Footer from './footer';
import fildNameCheckRule from './fildNameCheckRule';
import { ICar, IWindowId } from './interfaces';
import { createSelector } from 'reselect';

interface IProps {
  addDataCar: (car: ICar) => void;
  carsName: string[];
  close: (s: string) => void;
}
interface IState {
  name: string;
  constFuelChange: number;
  fuel: string;
  extension: boolean;
  constFuelChangeExt: number | null;
  isWrong: boolean | string;
}

class CreateCar extends Component<IProps, IState> {
  state = {
    name: '',
    constFuelChange: 0,
    fuel: 'AI',
    extension: false,
    constFuelChangeExt: null,
    isWrong: false,
  };

  public handleSubmit = () => {
    const {
      name,
      constFuelChange,
      fuel,
      extension,
      constFuelChangeExt,
    } = this.state;
    const { addDataCar, carsName, close } = this.props;
    const isDubble = carsName.some(elem => elem === name);
    const car = {
      name,
      constFuelChange,
      fuel,
      extension,
      constFuelChangeExt: extension ? constFuelChangeExt : null,
    };
    if (
      car.name === '' ||
      car.name[0] === ' ' ||
      !car.constFuelChange ||
      +car.constFuelChange === 0 ||
      (extension && !car.constFuelChangeExt) ||
      (extension && +car.constFuelChangeExt === 0) ||
      isDubble
    ) {
      this.setState(() => ({
        isWrong: true,
      }));
    } else {
      addDataCar(car);
      close('isNewCar');
    }
  };

  public handleChange = (e: any) => {
    const value = e.currentTarget.value;
    const fieldName: string = e.currentTarget.dataset.fieldName;
    this.setState(
      prev => ({
        ...prev,
        [fieldName]: value,
      }),
      this.cbError(fieldName)
    );
  };

  public close = () => {
    const { close } = this.props;
    close('isNewCar');
  };

  private cbError(fieldName: string): () => void {
    return () => {
      if (fildNameCheckRule[fieldName].test(this.state[fieldName])) {
        this.setState({
          isWrong: false,
        });
      } else {
        this.setState({
          isWrong: fieldName,
        });
      }
    };
  }

  public render() {
    const {
      name,
      fuel,
      constFuelChange,
      isWrong,
      constFuelChangeExt,
      extension,
    } = this.state;
    return (
      <PopUpWrap>
        <PopUp>
          <WrapHeader>
            <HeaderText>Новая машина</HeaderText>
            <WrapIcon onClick={this.close} name="Clear" color="red" />
          </WrapHeader>
          <PopUpContent>
            <InputCarValue
              name={name}
              fuel={fuel}
              isWrong={isWrong}
              handleChange={this.handleChange}
              constFuelChange={constFuelChange}
            />
            <InputExtension
              extension={extension}
              isWrong={isWrong}
              handleChange={this.handleChange}
              constFuelChangeExt={constFuelChangeExt}
            />
          </PopUpContent>
          {isWrong && <HeadError>ошибка введеных данных</HeadError>}
          <Footer>
            <Primary
              handlerClick={this.handleSubmit}
              disable={isWrong !== false}
            >
              Сохранить
            </Primary>
          </Footer>
        </PopUp>
      </PopUpWrap>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addDataCar: (car: ICar) => dispatch(saveCar(car)),
    close: (isNewCar: IWindowId) => dispatch(closeWindow(isNewCar)),
  };
};
const mapStateToProps = state => {
  const selectorCarsName = createSelector(
    () => state.cars.map((car: ICar): string => car.name),
    names => [...names]
  );
  return {
    carsName: selectorCarsName(state),
  };
};

const HeaderText = styled.h2`
  text-align: center;
`;

const WrapHeader = styled(Header)`
  position: relative;
`;

const WrapIcon = styled(Icon)`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const PopUp = styled.div`
  padding: 0;
  box-shadow: 3px 3px 10px 1px grey;
  position: fixed;
  top: 5%;
  left: 30%;
  box-sizing: border-box;
  background-color: rgba(202, 202, 202, 0.8);
  & input,
  & label,
  & select {
    box-sizing: border-box;
  }
`;

const PopUpWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(202, 202, 202, 0.5);
  z-index: 999;
`;

const PopUpContent = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: 470px;
  transition: all 0.3s linear;
`;

const HeadError = styled.h3`
  color: red;
  margin: 5px 0 2px 0;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCar);
