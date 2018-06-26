import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { savePath, checkError } from '../actions/pathLists.js';
import { closeWindow } from '../actions/cars.js';
import Button from './Button';
import { Primary } from './ButtonNew';
import Icon from './Icon';
import Header from './header';
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
  handleChangeView = () => {
    const { columnView } = this.state;
    this.setState({
      columnView: !columnView
    });
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
      <div className="popUpWrapp">
        <div className="popUp">
          <WrapHeader className="header">
            <HeaderText>Новый лист</HeaderText>
            <WrapIcon onClick={this.handleClose} name="Clear" color="red" />
            <Button handler={this.handleChangeView} styleButton="switchView">
              {columnView ? String.fromCharCode(9654) : String.fromCharCode(9660)}
            </Button>
          </WrapHeader>
          <div className={columnView ? 'popUpContent' : 'popUpContentRow'}>
            <div className={columnView ? null : 'row'}>
              <h4 className="inputHeader">выберите автомобиль</h4>
              <select data-field-name={'name'} value={name} onChange={this.handleChangeName}>
                <option disabled />
                {cars.map(car => {
                  return <option key={car.name}>{car.name}</option>;
                })}
              </select>
              <div className={constFuelChangeExt > 0 ? 'extensionChoise' : 'extensionChoiseNone'}>
                <h4 className="inputHeader">поездка с прицепом ?</h4>
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
              <h4 className="inputHeader">выберите дату начала путевки</h4>
              <input
                className={isWrong === 'dateBegin' ? 'inputErrorCheck' : null}
                data-field-name={'dateBegin'}
                type={'date'}
                onChange={this.handleChange}
                placeholder={'начало'}
                value={dateBegin}
              />
              <h4 className="inputHeader">введите начальный пробег, км</h4>
              <input
                className={isWrong === 'pathBegin' ? 'inputErrorCheck' : null}
                data-field-name={'pathBegin'}
                type={'number'}
                onChange={this.handleChange}
                placeholder={'пробег, начало'}
                value={pathBegin}
                step={'1'}
                min={'0'}
              />
              <h4 className="inputHeader">введите конечный пробег, км</h4>
              <input
                className={isWrong === 'pathEnd' ? 'inputErrorCheck' : null}
                data-field-name={'pathEnd'}
                type={'number'}
                onChange={this.handleChange}
                placeholder={'пробег, конец'}
                value={pathEnd}
                step={'1'}
                min={'0'}
              />
              <h4 className={isWrong === 'milleage' ? 'inputErrorCheck' : 'resultHeader'}>
                Пробег составил: {milleage} км
              </h4>
            </div>
            <div className={columnView ? null : 'row'}>
              <h4 className="inputHeader">введите начальное количество топлива, л</h4>
              <input
                className={isWrong === 'fuelBegin' ? 'inputErrorCheck' : null}
                data-field-name={'fuelBegin'}
                type={'number'}
                onChange={this.handleChange}
                placeholder={'топливо, начало'}
                value={fuelBegin}
                step={'0.01'}
                min={'0'}
              />
              <h4 className="inputHeader">введите заправленное количество топлива, л</h4>
              <input
                data-field-name={'addFuel'}
                type={'number'}
                onChange={this.handleChange}
                placeholder={'топливо, заправка'}
                value={addFuel}
                step={'0.01'}
                min={'0'}
              />
              <h4 className={isWrong === 'fuelEnd' ? 'inputErrorCheck' : 'inputHeader'}>
                конечное количество топлива {fuelEnd} л
              </h4>
              <h4 className="resultHeader">
                {fildNamePathList['deltaFuel']}: {deltaFuel} л
              </h4>
            </div>
            {isWrong && <h3 className="inputError">ошибка</h3>}
            {isWrongDuble && <h3 className="inputError">на эту дату лист уже есть</h3>}
          </div>
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
  margin-left: auto;
`;
const WrapHeader = styled(Header)`
  position: relative;
`;
const WrapIcon = styled(Icon)`
  position: absolute;
  top: 5px;
  right: 5px;
`;
export default connect(mapStateToProps, mapDispatchToProps)(CreatePath);
