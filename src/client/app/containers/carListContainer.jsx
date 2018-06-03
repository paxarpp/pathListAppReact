import React, { Component } from 'react';
import { connect } from 'react-redux';

import CarList from '../components/CarList';
import Button from '../components/Button';
import Confirm from '../components/Confirm';

import { deleteCarToName, addNewCar, infoCarToName } from '../actions/cars.js';
import { checkError, addNewPath } from '../actions/pathLists.js';
import saveToLocalStorage from '../components/saveToLocalStorage.js';
class CarListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpConfirm: false,
      name: '',
      minView: false
    };
  }
  componentDidUpdate() {
    const { cars, pathLists } = this.props;
    saveToLocalStorage(cars, pathLists);
  }
  deleteCar = name => () => {
    this.setState({
      popUpConfirm: true,
      name
    });
  };
  deleteCarConfirm = status => {
    const { deleteCar, chError } = this.props;
    const { name } = this.state;
    this.setState({
      popUpConfirm: false,
      name: ''
    });
    status ? deleteCar(name) : null;
    status ? chError() : null;
  };
  carInfo = name => () => {
    const { carInfo } = this.props;
    carInfo(name);
  };
  handlerAddCar = () => {
    const { addCar } = this.props;
    addCar();
  };
  handlerAddPath = () => {
    const { addPath } = this.props;
    addPath();
  };
  handleChangeView = () => {
    const { minView } = this.state;
    this.setState({
      minView: !minView
    });
  };
  render() {
    const { cars, selectedCar, pathLists } = this.props;
    const { popUpConfirm, minView } = this.state;
    return (
      <div className={minView ? 'carListContainerMinimal' : 'carListContainer'}>
        <div className="header">
          <h3>{minView ? null : 'Список Автомобилей'}</h3>
          <Button handler={this.handleChangeView} styleButton={minView ? 'switchMin' : 'switchView'}>
            {minView ? String.fromCharCode(9654) : String.fromCharCode(9668)}
          </Button>
        </div>
        {popUpConfirm && <Confirm handler={this.deleteCarConfirm} />}
        <CarList
          selectedCar={selectedCar}
          pathLists={pathLists}
          cars={cars}
          deleteCarHandler={this.deleteCar}
          carInfo={this.carInfo}
        />
        <div className="footer">
          <Button handler={this.handlerAddCar} styleButton="submit">
            Добавить авто
          </Button>

          <Button handler={this.handlerAddPath} styleButton="submit">
            Добавить лист
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cars: state.cars,
    pathLists: state.pathLists,
    selectedCar: state.selectedCar,
    error: state.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteCar: name => deleteCarToName(dispatch, name),
    carInfo: name => infoCarToName(dispatch, name),
    addCar: () => addNewCar(dispatch),
    chError: () => checkError(dispatch),
    addPath: () => addNewPath(dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CarListContainer);
