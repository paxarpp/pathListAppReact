import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { savePath, checkError } from '../actions/pathLists.js';
import { closeWindow } from '../actions/cars.js';
import { Primary } from './ButtonNew';
import Icon from './Icon';
import Input from './Input';
import Header from './header';
import Footer from './footer';
import calculateFieldPath from './calculateFieldPath';
import fildNamePathList from './fildNamePathList';
import fildNameCheckRule from './fildNameCheckRule.js';

class CreatePath extends Component {
  state = {
    name: '',
    fuel: '',
    dateBegin: '',
    pathBegin: '',
    pathEnd: '',
    milleage: 0,
    fuelBegin: '',
    fuelEnd: '',
    addFuel: '',
    deltaFuel: 0,
    addFuelWinter: 0,
    constFuelChange: '',
    ConsumptionFactoryFuel: '',
    isWrong: false,
    isWrongDuble: false,
    columnView: true,
    extension: 'false',
    constFuelChangeExt: ''
  };
  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      dateBegin,
      pathBegin,
      pathEnd,
      milleage,
      fuelBegin,
      fuelEnd,
      addFuel,
      deltaFuel,
      fuel,
      constFuelChange,
      constFuelChangeExt,
      extension,
      ConsumptionFactoryFuel,
      addFuelWinter
    } = this.state;

    const { addDataPath, pathLists, close, chError } = this.props;
    const path = {
      name,
      dateBegin,
      pathBegin,
      pathEnd,
      milleage,
      fuelBegin,
      fuelEnd,
      addFuel,
      deltaFuel,
      fuel,
      constFuelChange: extension === 'true' ? constFuelChangeExt : constFuelChange,
      extension,
      ConsumptionFactoryFuel,
      addFuelWinter
    };
    if (path.dateBegin === '') {
      this.setState({
        isWrong: 'dateBegin'
      });
    } else {
      if (
        pathLists.some(elem => {
          return elem.name === path.name && elem.dateBegin === path.dateBegin;
        })
      ) {
        this.setState({
          isWrongDuble: true
        });
      } else if (path.milleage >= 0 && path.fuelEnd >= 0) {
        if (path.name) {
          addDataPath(calculateFieldPath(path));
          close('isNewPath');
          chError();
        }
      } else {
        if (path.milleage < 0) {
          this.setState({
            isWrong: 'milleage'
          });
        } else {
          this.setState({
            isWrong: 'fuelEnd'
          });
        }
      }
    }
  };
  handleChangeName = e => {
    const value = e.currentTarget.value;
    const fieldName = e.currentTarget.dataset.fieldName;
    const { cars } = this.props;
    this.setState(prev => ({
      ...prev,
      [fieldName]: value
    }));
    this.setState(prev => ({
      ...prev,
      fuel: cars.filter(car => {
        return car.name === value;
      })[0].fuel,
      constFuelChange: cars.filter(car => {
        return car.name === value;
      })[0].constFuelChange,
      constFuelChangeExt: cars.filter(car => {
        return car.name === value;
      })[0].constFuelChangeExt
    }));

    if (this.props.pathLists.filter(elem => elem.name === value).length !== 0) {
      this.setState(prev => ({
        ...prev,
        pathBegin: this.props.pathLists
          .filter(elem => {
            return elem.name === prev.name;
          })
          .sort((a, b) => {
            if (a.dateBegin > b.dateBegin) {
              return -1;
            } else if (a.dateBegin < b.dateBegin) {
              return 1;
            } else {
              return 0;
            }
          })[0].pathEnd,
        fuelBegin: this.props.pathLists
          .filter(elem => {
            return elem.name === prev.name;
          })
          .sort((a, b) => {
            if (a.dateBegin > b.dateBegin) {
              return -1;
            } else if (a.dateBegin < b.dateBegin) {
              return 1;
            } else {
              return 0;
            }
          })[0].fuelEnd
      }));
    } else {
      this.setState(prev => ({
        ...prev,
        pathBegin: 0,
        fuelBegin: 0
      }));
    }
  };
  handleChange = e => {
    const value = e.currentTarget.value;
    const fieldName = e.currentTarget.dataset.fieldName;
    this.setState(
      prev => ({
        ...prev,
        [fieldName]: value,
        isWrongDuble: false
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
    this.setState(prev => ({
      ...prev,
      milleage: Math.round((+prev.pathEnd - +prev.pathBegin) * 100) / 100
    }));
    this.setState(prev => ({
      ...prev,
      ConsumptionFactoryFuel:
        prev.extension === 'true'
          ? Math.round(+prev.milleage * +prev.constFuelChangeExt / 100 * 100) / 100
          : Math.round(+prev.milleage * +prev.constFuelChange / 100 * 100) / 100
    }));
    this.setState(prev => ({
      ...prev,
      fuelEnd:
        Math.round((+prev.fuelBegin + +prev.addFuel + +prev.addFuelWinter - +prev.ConsumptionFactoryFuel) * 100) / 100
    }));
    this.setState(prev => ({
      ...prev,
      deltaFuel: Math.round((+prev.fuelBegin + +prev.addFuel + +prev.addFuelWinter - +prev.fuelEnd) * 100) / 100
    }));
  };
  handleClose = e => {
    const { close } = this.props;
    e.preventDefault();
    close('isNewPath');
  };
  render() {
    const { cars } = this.props;
    const {
      name,
      dateBegin,
      pathBegin,
      pathEnd,
      milleage,
      fuelBegin,
      fuelEnd,
      addFuel,
      deltaFuel,
      isWrong,
      columnView,
      isWrongDuble,
      extension,
      constFuelChangeExt
    } = this.state;
    return (
      <PopUpWrap>
        <PopUp>
          <WrapHeader>
            <HeaderText>Новый лист</HeaderText>
            <WrapIcon onClick={this.handleClose} name="Clear" color="red" />
            <WrapIconV
              onClick={() => this.setState({ columnView: !columnView })}
              name={columnView ? 'RightArrow' : 'LeftArrow'}
              color="black"
            />
          </WrapHeader>
          <ColumnView view={columnView}>
            <Row view={columnView}>
              <InputHeader>выберите автомобиль</InputHeader>
              <select data-field-name={'name'} value={name} onChange={this.handleChangeName}>
                <option disabled />
                {cars.map(car => {
                  return <option key={car.name}>{car.name}</option>;
                })}
              </select>
              <div className={constFuelChangeExt > 0 ? 'extensionChoise' : 'extensionChoiseNone'}>
                <InputHeader>поездка с прицепом ?</InputHeader>
                <label>
                  Да
                  <input
                    checked={extension === 'true'}
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
                    checked={extension === 'false'}
                    name={'extension'}
                    data-field-name={'extension'}
                    type={'radio'}
                    onChange={this.handleChange}
                    value={'false'}
                  />
                </label>
              </div>
              <InputHeader>выберите дату начала путевки</InputHeader>
              <WrapInput
                error={isWrong === 'dateBegin'}
                data-field-name={'dateBegin'}
                type={'date'}
                handler={this.handleChange}
                placeholder={'начало'}
                value={dateBegin}
              />
              <InputHeader>введите начальный пробег, км</InputHeader>
              <WrapInput
                error={isWrong === 'pathBegin'}
                data-field-name={'pathBegin'}
                type={'number'}
                handler={this.handleChange}
                placeholder={'пробег, начало'}
                value={pathBegin}
                step={'1'}
                min={'0'}
              />
              <InputHeader>введите конечный пробег, км</InputHeader>
              <WrapInput
                error={isWrong === 'pathEnd'}
                data-field-name={'pathEnd'}
                type={'number'}
                handler={this.handleChange}
                placeholder={'пробег, конец'}
                value={pathEnd}
                step={'1'}
                min={'0'}
              />
              <ResultHeader error={isWrong === 'milleage'}>Пробег составил: {milleage} км</ResultHeader>
            </Row>
            <Row view={columnView}>
              <InputHeader>введите начальное количество топлива, л</InputHeader>
              <WrapInput
                error={isWrong === 'fuelBegin'}
                data-field-name={'fuelBegin'}
                type={'number'}
                handler={this.handleChange}
                placeholder={'топливо, начало'}
                value={fuelBegin}
                step={'0.01'}
                min={'0'}
              />
              <InputHeader>введите заправленное количество топлива, л</InputHeader>
              <Input
                data-field-name={'addFuel'}
                type={'number'}
                handler={this.handleChange}
                placeholder={'топливо, заправка'}
                value={addFuel}
                step={'0.01'}
                min={'0'}
              />
              <ResultHeader error={isWrong === 'fuelEnd'}>конечное количество топлива {fuelEnd} л</ResultHeader>
              <ResultHeader>
                {fildNamePathList['deltaFuel']}: {deltaFuel} л
              </ResultHeader>
            </Row>
            {isWrong && <InputError>ошибка</InputError>}
            {isWrongDuble && <InputError>на эту дату лист уже есть</InputError>}
          </ColumnView>
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
const mapStateToProps = state => {
  return {
    pathLists: state.pathLists,
    cars: state.cars
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addDataPath: path => savePath(dispatch, path),
    close: isNewPath => closeWindow(dispatch, isNewPath),
    chError: () => checkError(dispatch)
  };
};
CreatePath.propTypes = {
  addDataPath: PropTypes.func.isRequired,
  pathLists: PropTypes.arrayOf(PropTypes.object).isRequired,
  close: PropTypes.func.isRequired,
  chError: PropTypes.func.isRequired,
  cars: PropTypes.arrayOf(PropTypes.object).isRequired
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
const WrapIconV = styled(Icon)`
  position: absolute;
  top: 35px;
  right: 5px;
`;
const error = `
  outline: 1px solid red;
  opacity: 0.7;
  transition: opacity 0.5s ease-in;
`;
const WrapInput = styled(Input)`
  ${props => props.error && error};
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
const InputError = styled.h3`
  color: red;
  font-weight: 600;
  text-align: center;
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
const errorHeadResult = `
  color: red;
`;
const ResultHeader = styled.h4`
  margin: 5px 0 2px 0;
  border-bottom: 1px solid #00000080;
  ${props => props.error && errorHeadResult};
`;
const ColumnViewRow = `
  width: 795px;
  display: flex;
`;
const ColumnView = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: 470px;
  transition: all 0.3s linear;
  ${props => !props.view && ColumnViewRow};
`;
const Row = styled.div`
  ${props => !props.view && 'flex: 1;'};
  ${props => !props.view && 'padding: 5px;'};
`;
export default connect(mapStateToProps, mapDispatchToProps)(CreatePath);
