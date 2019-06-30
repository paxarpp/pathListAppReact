import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CarList from '../components/CarList';
import { Primary } from '../components/ButtonNew';
import Icon from '../components/Icon';
import Header from '../components/header';
import Footer from '../components/footer';
import Confirm from '../components/Confirm';
import {
  deleteCarToName,
  addNewCar,
  infoCarToName,
  saveToLocalStorageAction,
} from '../actions/cars';
import { checkError, addNewPath } from '../actions/pathLists';

interface IProps {
  cars: [];
  pathLists: [];
  selectedCar: string;
  deleteCar: () => void;
  saveToLocalStorage: () => void;
  chError: () => void;
  error: [];
  carInfo: () => void;
  addCar: () => void;
  addPath: () => void;
}
class CarListContainer extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      popUpConfirm: false,
      name: '',
    };
  }

  componentDidUpdate() {
    const { cars, pathLists, saveToLocalStorage } = this.props;
    saveToLocalStorage({ cars, pathLists });
  }

  deleteCar = name => () => {
    this.setState({
      popUpConfirm: true,
      name,
    });
  };

  deleteCarConfirm = status => {
    const { deleteCar, chError } = this.props;
    const { name } = this.state;
    this.setState({
      popUpConfirm: false,
      name: '',
    });
    if (status) {
      deleteCar(name);
      chError();
    }
  };

  render() {
    const { cars, selectedCar, error } = this.props;
    const { popUpConfirm } = this.state;
    return (
      <WrapperCarListContainer>
        <Header>
          <h3>Список Автомобилей</h3>
        </Header>
        {popUpConfirm && <Confirm handler={this.deleteCarConfirm} />}
        <CarList
          selectedCar={selectedCar}
          cars={cars}
          deleteCarHandler={this.deleteCar}
          carInfo={name => () => this.props.carInfo(name)}
          error={error}
        />
        <Footer>
          <Primary handlerClick={() => this.props.addCar()}>
            <Icon name="Add" />
            авто
          </Primary>
          <Primary handlerClick={() => this.props.addPath()}>
            <Icon name="Add" />
            лист
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
    error: state.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteCar: name => dispatch(deleteCarToName(name)),
    carInfo: name => dispatch(infoCarToName(name)),
    addCar: () => dispatch(addNewCar()),
    chError: () => dispatch(checkError()),
    addPath: () => dispatch(addNewPath()),
    saveToLocalStorage: obj => dispatch(saveToLocalStorageAction(obj)),
  };
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarListContainer);
