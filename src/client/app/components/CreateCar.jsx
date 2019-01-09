import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { saveCar, closeWindow } from '../actions/cars.js';
import Icon from './Icon';
import { Primary } from './ButtonNew';
import InputCarValue from './InputCarValue';
import InputExtension from './InputExtension';
import Header from './header';
import Footer from './footer';
import fildNameCheckRule from './fildNameCheckRule.js';

class CreateCar extends Component {
  state = {
    name: '',
    constFuelChange: '',
    fuel: 'AI',
    extension: 'false',
    constFuelChangeExt: '',
    isWrong: false
  };
  handleSubmit = () => {
    const { name, constFuelChange, fuel, extension, constFuelChangeExt } = this.state;
    const { addDataCar, cars, close } = this.props;
    const car = {
      name,
      constFuelChange,
      fuel,
      extension,
      constFuelChangeExt: extension === 'true' ? constFuelChangeExt : ''
    };
    if (
      car.name === '' ||
      car.name[0] === ' ' ||
      car.constFuelChange === '' ||
      +car.constFuelChange === 0 ||
      (extension === 'true' && car.constFuelChangeExt === '') ||
      (extension === 'true' && +car.constFuelChangeExt === 0) ||
      cars.some(elem => elem.name === car.name)
    ) {
      this.setState(() => ({
        isWrong: true
      }));
    } else {
      addDataCar(car);
      close('isNewCar');
    }
  };
  handleChange = e => {
    const value = e.currentTarget.value;
    const fieldName = e.currentTarget.dataset.fieldName;
    this.setState(
      prev => ({
        ...prev,
        [fieldName]: value
      }),
      () => {
        if (fildNameCheckRule[fieldName].test(this.state[fieldName])) {
          this.setState({
            isWrong: false
          });
        } else {
          this.setState({
            isWrong: fieldName
          });
        }
      }
    );
  };
  render() {
    const { name, fuel, constFuelChange, isWrong, constFuelChangeExt, extension } = this.state;
    return (
      <PopUpWrap>
        <PopUp>
          <WrapHeader>
            <HeaderText>Новая машина</HeaderText>
            <WrapIcon onClick={() => this.props.close('isNewCar')} name="Clear" color="red" />
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
            <Primary handlerClick={this.handleSubmit} disable={isWrong != false}>
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
    addDataCar: car => saveCar(dispatch, car),
    close: isNewCar => closeWindow(dispatch, isNewCar)
  };
};
const mapStateToProps = state => {
  return {
    cars: state.cars
  };
};
CreateCar.propTypes = {
  addDataCar: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  cars: PropTypes.array
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateCar);
