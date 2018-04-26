import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CarList from '../components/CarList';
import Button from '../components/Button';

import { deleteCarToName, addNewCar, infoCarToName } from '../actions/cars.js';
class CarListContainer extends Component {
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
       const { cars } = this.props;
        
   return (
            <div className="carListContainer">
                <div className="header">
                    <h3>Список Автомобилей</h3>
                </div> 
                <CarList cars={cars} deleteCarHandler={this.deleteCar} carInfo={this.carInfo} />
                <div className="footer">
                    <Button handler={this.handlerAddCar} styleButton="submit">Добавить авто</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cars: state.cars
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteCar: (name) => deleteCarToName(dispatch, name),
        carInfo: (name) => infoCarToName(dispatch, name),
        addCar: () => addNewCar(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarListContainer);