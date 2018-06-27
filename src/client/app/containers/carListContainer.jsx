import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CarList from '../components/CarList';
import { Primary } from '../components/ButtonNew';
import Icon from '../components/Icon';
import Header from '../components/header';
import Footer from '../components/footer';
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
  render() {
    const { cars, selectedCar, pathLists, error } = this.props;
    const { popUpConfirm } = this.state;
    return (
      <WrapperCarListContainer>
        <Header className="header">
          <h3>Список Автомобилей</h3>
        </Header>
        {popUpConfirm && <Confirm handler={this.deleteCarConfirm} />}
        <CarList
          selectedCar={selectedCar}
          pathLists={pathLists}
          cars={cars}
          deleteCarHandler={this.deleteCar}
          carInfo={name => () => this.props.carInfo(name)}
          error={error}
        />
        <Footer>
          <Primary handlerClick={() => this.props.addCar()}>
            <Icon name="Add" />авто
          </Primary>

          <Primary handlerClick={() => this.props.addPath()}>
            <Icon name="Add" />лист
          </Primary>
        </Footer>
      </WrapperCarListContainer>
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
const WrapperCarListContainer = styled.div`
  padding: 0;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 320px;
  display: flex;
  flex-flow: column nowrap;
`;
export default connect(mapStateToProps, mapDispatchToProps)(CarListContainer);
