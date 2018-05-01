import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CarList from '../components/CarList';
import Button from '../components/Button';

import { deleteCarToName, addNewCar, infoCarToName } from '../actions/cars.js';
import saveToLocalStorage from '../components/saveToLocalStorage.js'
class CarListContainer extends Component {
    componentDidUpdate(){
        const { cars, pathLists } = this.props;
        saveToLocalStorage(cars, pathLists);
    }
    deleteCar = (name) => {
        const { deleteCar } = this.props;
        deleteCar(name);
    }
    carInfo = (name) => {
        const { carInfo } = this.props;
        carInfo(name);
    }
    handlerAddCar = () => {
        const { addCar } = this.props;
        addCar();
    }
    render() {
        const { cars, selectedCar, pathLists } = this.props;   
        return (
                <div className="carListContainer">
                    <div className="header">
                        <h3>Список Автомобилей</h3>
                    </div> 
                    <CarList 
                        selectedCar={selectedCar}
                        pathLists={pathLists}
                        cars={cars} 
                        deleteCarHandler={this.deleteCar} 
                        carInfo={this.carInfo} />
                    <div className="footer">
                        <Button handler={this.handlerAddCar} styleButton="submit">Добавить авто</Button>
                    </div>
                </div>
                )
    }
}
const mapStateToProps = (state) => {
    return {
        cars: state.cars,
        pathLists: state.pathLists,
        selectedCar: state.selectedCar
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteCar: (name) => deleteCarToName(dispatch, name),
        carInfo: (name) => infoCarToName(dispatch, name),
        addCar: () => addNewCar(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarListContainer);