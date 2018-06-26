import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { saveCar, closeWindow } from '../actions/cars.js';
import Button from './Button';
import { Primary } from './ButtonNew';
import Header from './header';
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
    if (car.name === '' || car.constFuelChange === '') {
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
      <div className="popUpWrapp">
        <div className="popUp">
          <Header className="header">
            <HeaderText>Новая машина</HeaderText>
            <Button handler={this.handleClose} styleButton="delit">
              {String.fromCharCode(10006)}
            </Button>
          </Header>
          <div className="popUpContent">
            <h4 className="inputHeader">введите название автомобиля</h4>
            <input
              className={isWrong === 'name' ? 'inputErrorCheck' : null}
              data-field-name={'name'}
              type={'text'}
              onChange={this.handleChange}
              placeholder={'название'}
              value={name}
            />
            <h4 className="inputHeader">введите паспортный расход топлива</h4>
            <input
              className={isWrong === 'constFuelChange' ? 'inputErrorCheck' : null}
              data-field-name={'constFuelChange'}
              type={'number'}
              onChange={this.handleChange}
              placeholder={'расход по паспорту на 100 км'}
              value={constFuelChange}
              step={'0.01'}
              min={'0'}
            />
            <h4 className="inputHeader">выберите тип топлива</h4>
            <label>
              Бензин
              <input
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
              <input
                checked={this.state.fuel === 'DT'}
                name={'fuel'}
                data-field-name={'fuel'}
                type={'radio'}
                onChange={this.handleChange}
                value={'DT'}
              />
            </label>
            <h4 className="inputHeader">возможено добавление прицепа ?</h4>
            <label>
              Да
              <input
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
              <input
                checked={this.state.extension === 'false'}
                name={'extension'}
                data-field-name={'extension'}
                type={'radio'}
                onChange={this.handleChange}
                value={'false'}
              />
            </label>
            {extension === 'true' ? (
              <input
                className={isWrong === 'constFuelChangeExt' ? 'inputErrorCheck' : null}
                data-field-name={'constFuelChangeExt'}
                type={'number'}
                onChange={this.handleChange}
                placeholder={'расход по паспорту на 100 км с прицепом'}
                value={constFuelChangeExt}
                step={'0.01'}
                min={'0'}
              />
            ) : null}
          </div>
          {isWrong && <h3 className="inputError">ошибка введеных данных</h3>}
          <div className="footer">
            <Primary handlerClick={this.handleSubmit} disable={isWrong != false}>
              Сохранить
            </Primary>
          </div>
        </div>
      </div>
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
  margin-left: auto;
`;
export default connect(mapStateToProps, mapDispatchToProps)(CreateCar);
