import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { saveCar, closeWindow } from '../actions/cars.js';
import Icon from './Icon';
import Input from './Input';
import { Primary } from './ButtonNew';
import RadioButton from './RadioButton';
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
  handleSubmit = e => {
    e.preventDefault();
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
      car.constFuelChange === '' ||
      +car.constFuelChange === 0 ||
      (extension && +constFuelChangeExt === 0)
    ) {
      this.setState(() => ({
        isWrong: true
      }));
    } else {
      if (cars.some(elem => elem.name === car.name)) {
        this.setState(() => ({
          isWrong: true
        }));
      } else {
        addDataCar(car);
        close('isNewCar');
      }
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

  handleClose = e => {
    const { close } = this.props;
    e.preventDefault();
    close('isNewCar');
  };

  render() {
    const { name, constFuelChange, isWrong, constFuelChangeExt, extension } = this.state;
    return (
      <PopUpWrap>
        <PopUp>
          <WrapHeader>
            <HeaderText>Новая машина</HeaderText>
            <WrapIcon onClick={this.handleClose} name="Clear" color="red" />
          </WrapHeader>
          <PopUpContent>
            <InputHeader>введите название автомобиля</InputHeader>
            <WrapInput
              error={isWrong === 'name'}
              data-field-name={'name'}
              type={'text'}
              handler={this.handleChange}
              placeholder={'название'}
              value={name}
            />
            <InputHeader>введите паспортный расход топлива</InputHeader>
            <Input
              error={isWrong === 'constFuelChange'}
              data-field-name={'constFuelChange'}
              type={'number'}
              handler={this.handleChange}
              placeholder={'расход по паспорту на 100 км'}
              value={constFuelChange}
              step={'0.01'}
              min={'0'}
            />
            <InputHeader>выберите тип топлива</InputHeader>
            <label>
              Бензин
              <RadioButton
                checked={this.state.fuel === 'AI'}
                name={'fuel'}
                data-field-name={'fuel'}
                type={'radio'}
                onChange={this.handleChange}
                value={'AI'}
              />
            </label>
            <label>
              Дизель
              <RadioButton
                checked={this.state.fuel === 'DT'}
                name={'fuel'}
                data-field-name={'fuel'}
                type={'radio'}
                onChange={this.handleChange}
                value={'DT'}
              />
            </label>
            <InputHeader>возможено добавление прицепа ?</InputHeader>
            <label>
              Да
              <RadioButton
                checked={this.state.extension === 'true'}
                name={'extension'}
                data-field-name={'extension'}
                type={'radio'}
                onChange={this.handleChange}
                value={'true'}
              />
            </label>
            <label>
              Нет
              <RadioButton
                checked={this.state.extension === 'false'}
                name={'extension'}
                data-field-name={'extension'}
                type={'radio'}
                onChange={this.handleChange}
                value={'false'}
              />
            </label>
            {extension === 'true' ? (
              <Input
                error={isWrong === 'constFuelChangeExt'}
                data-field-name={'constFuelChangeExt'}
                type={'number'}
                handler={this.handleChange}
                placeholder={'расход по паспорту на 100 км с прицепом'}
                value={constFuelChangeExt}
                step={'0.01'}
                min={'0'}
              />
            ) : null}
          </PopUpContent>
          {isWrong && <h3 className="inputError">ошибка введеных данных</h3>}
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
  align-text: center;
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
const InputHeader = styled.h4`
  margin: 5px 0 2px 0;
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
const error = `
  outline: 1px solid red;
  opacity: 0.7;
  transition: opacity 0.5s ease-in;
`;
const WrapInput = styled(Input)`
  ${props => props.error && error};
`;
export default connect(mapStateToProps, mapDispatchToProps)(CreateCar);
