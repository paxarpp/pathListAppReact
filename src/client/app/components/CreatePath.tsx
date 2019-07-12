import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import { savePath, checkError } from '../actions/pathLists';
import { closeWindow } from '../actions/cars';
import { Primary } from './ButtonNew';
import Datepicker from './Datepicker';
import Icon from './Icon';
import RadioButton from './RadioButton';
import Input from './Input';
import Header from './header';
import Footer from './footer';
import calculateFieldPath from './calculateFieldPath';
import fildNamePathList from './fildNamePathList';
import fildNameCheckRule from './fildNameCheckRule';
import { IPathBase, ICar, IWindowId } from './interfaces';

interface IchangeExt {
  changeExt: boolean;
}
interface IProps {
  addDataPath: (path: IPathBase) => void;
  pathLists: IPathBase;
  close: (nameWindow: string) => void;
  chError: () => void;
  cars: ICar[];
}
interface IState {
  name: string;
  fuel: string;
  dateBegin: string;
  pathBegin: number;
  pathEnd: number;
  milleage: number;
  fuelBegin: number;
  fuelEnd: number;
  addFuel: number;
  deltaFuel: number;
  addFuelWinter: number;
  constFuelChange: number;
  ConsumptionFactoryFuel: number;
  isWrong: string | boolean;
  isWrongDuble: boolean;
  columnView: boolean;
  extension: boolean;
  constFuelChangeExt: number | null;
  datepickerOpen: boolean;
}

class CreatePath extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: '',
      fuel: '',
      dateBegin: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${new Date()
          .getDate()
          .toString()
          .padStart(2, '0')}`,
      pathBegin: null,
      pathEnd: null,
      milleage: 0,
      fuelBegin: null,
      fuelEnd: null,
      addFuel: null,
      deltaFuel: 0,
      addFuelWinter: 0,
      constFuelChange: null,
      ConsumptionFactoryFuel: null,
      isWrong: false,
      isWrongDuble: false,
      columnView: true,
      extension: false,
      constFuelChangeExt: null,
      datepickerOpen: false,
    };
  }

  public handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      constFuelChange,
      constFuelChangeExt,
      extension,
    } = this.state;
    const { addDataPath, pathLists, close, chError } = this.props;
    const path = {
      ...this.state,
      constFuelChange: extension ? constFuelChangeExt : constFuelChange,
    };
    if (path.dateBegin === '') {
      this.setState({
        isWrong: 'dateBegin'
      });
    } else {
      if (
        pathLists[path.name] &&
        pathLists[path.name].some(elem => elem.dateBegin === path.dateBegin)
      ) {
        this.setState({
          isWrongDuble: true
        });
      } else if (path.milleage > 0 && path.fuelEnd > 0) {
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

  public handleChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      value,
      dataset: { fieldName }
    } = e.currentTarget;
    const { cars } = this.props;
    this.setState(prev => ({
      ...prev,
      [fieldName]: value,
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
    if (this.props.pathLists[value] && this.props.pathLists[value].length !== 0) {
      this.setState(prev => ({
        ...prev,
        pathBegin: this.props.pathLists[prev.name].sort((a, b) => {
          if (a.dateBegin > b.dateBegin) {
            return -1;
          } else if (a.dateBegin < b.dateBegin) {
            return 1;
          } else {
            return 0;
          }
        })[0].pathEnd,
        fuelBegin: this.props.pathLists[prev.name].sort((a, b) => {
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

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        prev.extension ?
          Math.round(
            ((+prev.milleage * +prev.constFuelChangeExt) / 100) * 100
          ) / 100
          : Math.round(((+prev.milleage * +prev.constFuelChange) / 100) * 100) /
          100
    }));
    this.setState(prev => ({
      ...prev,
      fuelEnd:
        Math.round(
          (+prev.fuelBegin +
            +prev.addFuel +
            +prev.addFuelWinter -
            +prev.ConsumptionFactoryFuel) *
          100
        ) / 100
    }));
    this.setState(prev => ({
      ...prev,
      deltaFuel:
        Math.round(
          (+prev.fuelBegin +
            +prev.addFuel +
            +prev.addFuelWinter -
            +prev.fuelEnd) *
          100
        ) / 100
    }));
  };
  public handleClose = (e: React.MouseEvent<HTMLElement, "onClick">) => {
    const { close } = this.props;
    e.preventDefault();
    close('isNewPath');
  };
  public render() {
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
      constFuelChangeExt,
      datepickerOpen
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
              <WrapSelect
                data-field-name={'name'}
                value={name}
                onChange={this.handleChangeName}
              >
                <option disabled />
                {cars.map(car => {
                  return <option key={car.name}>{car.name}</option>;
                })}
              </WrapSelect>
              <FuelChangeExt changeExt={constFuelChangeExt > 0}>
                <InputHeader>поездка с прицепом ?</InputHeader>
                <label>
                  Да
                  <RadioButton
                    checked={extension}
                    name={'extension'}
                    data-field-name={'extension'}
                    type={'radio'}
                    onChange={this.handleChange}
                    value={true}
                  />
                </label>
                <label>
                  Нет
                  <RadioButton
                    checked={!extension}
                    name={'extension'}
                    data-field-name={'extension'}
                    type={'radio'}
                    onChange={this.handleChange}
                    value={false}
                  />
                </label>
              </FuelChangeExt>
              <div>
                <InputHeader>выберите дату начала путевки</InputHeader>
                <WrapSpan
                  onClick={() => this.setState({ datepickerOpen: true })}
                >
                  {dateBegin}
                </WrapSpan>
                {datepickerOpen && (
                  <Datepicker
                    handlerClose={() =>
                      this.setState({ datepickerOpen: false })
                    }
                    handlerComplite={setupDate => () =>
                      this.setState({
                        datepickerOpen: false,
                        dateBegin: `${setupDate.year}-${(setupDate.month + 1)
                          .toString()
                          .padStart(
                            2,
                            '0'
                          )}-${setupDate.day.toString().padStart(2, '0')}`
                      })}
                  />
                )}
              </div>
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
              <ResultHeader error={isWrong === 'milleage'}>
                Пробег составил: {milleage} км
              </ResultHeader>
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
              <InputHeader>
                введите заправленное количество топлива, л
              </InputHeader>
              <Input
                data-field-name={'addFuel'}
                type={'number'}
                handler={this.handleChange}
                placeholder={'топливо, заправка'}
                value={addFuel}
                step={'0.01'}
                min={'0'}
              />
              <ResultHeader error={isWrong === 'fuelEnd'}>
                конечное количество топлива {fuelEnd} л
              </ResultHeader>
              <ResultHeader>
                {fildNamePathList['deltaFuel']}: {deltaFuel} л
              </ResultHeader>
            </Row>
            {isWrong && <InputError>ошибка</InputError>}
            {isWrongDuble && <InputError>на эту дату лист уже есть</InputError>}
          </ColumnView>
          <Footer>
            <Primary
              handlerClick={this.handleSubmit}
              disable={isWrong != false}
            >
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
    addDataPath: path => dispatch(savePath(path)),
    close: (nameWindow: IWindowId) => dispatch(closeWindow(nameWindow)),
    chError: () => dispatch(checkError())
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
const WrapIconV = styled(Icon)`
  position: absolute;
  top: 35px;
  right: 5px;
`;
const error = props =>
  props.error &&
  css`
    outline: 1px solid red;
    opacity: 0.7;
    transition: opacity 0.5s ease-in;
  `;
const WrapInput = styled(Input)`
  ${error};
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
const WrapSpan = styled.span`
  display: inline-block;
  width: 100%;
  margin-bottom: 5px;
  border-bottom: 1px solid #9e9e9e;
  transition: border-bottom 0.3s linear;
  :hover {
    cursor: pointer;
    border-bottom: 1px solid #26a69a;
  }
`;
const errorHeadResult = props =>
  props.error &&
  css`
    color: red;
  `;
const ResultHeader = styled.h4`
  margin: 5px 0 2px 0;
  ${errorHeadResult};
`;
const ColumnViewRow = props =>
  !props.view &&
  css`
    width: 795px;
    display: flex;
  `;
const ColumnView = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: 470px;
  transition: all 0.3s linear;
  ${ColumnViewRow};
`;
const ifRow = props =>
  !props.view &&
  css`
    flex: 1;
    padding: 5px;
  `;
const Row = styled.div`
  ${ifRow};
  select {
    width: 100%;
    font-size: 1.5rem;
  }
`;
const WrapSelect = styled.select`
  width: 100%;
  font-size: 1.5rem;
`;
const FuelChangeExt = styled.div`
  display: ${({ changeExt }: IchangeExt) => (changeExt ? 'block' : 'none')};
  background-color: #80808080;
`;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePath);
