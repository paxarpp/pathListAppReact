import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      name: ''
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
    if (status) {
      deleteCar(name);
      chError();
    }
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
  render() {
    const { cars, selectedCar, pathLists, error } = this.props;
    const { popUpConfirm } = this.state;
    return (
      <div className="carListContainer">
        <div className="header">
          <h3>Список Автомобилей</h3>
        </div>
        {popUpConfirm && <Confirm handler={this.deleteCarConfirm} />}
        <CarList
          selectedCar={selectedCar}
          pathLists={pathLists}
          cars={cars}
          deleteCarHandler={this.deleteCar}
          carInfo={this.carInfo}
          error={error}
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
CarListContainer.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.object),
  pathLists: PropTypes.object,
  selectedCar: PropTypes.object,
  deleteCar: PropTypes.func,
  chError: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.object),
  carInfo: PropTypes.func,
  addCar: PropTypes.func,
  addPath: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(CarListContainer);
