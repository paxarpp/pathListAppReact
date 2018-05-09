import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CarList from '../components/CarList';
import Button from '../components/Button';
import Confirm from '../components/Confirm';

import { deleteCarToName, addNewCar, infoCarToName } from '../actions/cars.js';
import saveToLocalStorage from '../components/saveToLocalStorage.js'
class CarListContainer extends Component {
constructor(props){
    super(props);
    this.state={
        popUpConfirm: false,
        name: '',
    }
}

    componentDidUpdate(){
        const { cars, pathLists } = this.props;
        saveToLocalStorage(cars, pathLists);
    }
    deleteCar = (name) => {  
        this.setState({
            popUpConfirm: true,
            name
        })
    }
    deleteCarConfirm = (status) => {
        const { deleteCar } = this.props;
        const { name } = this.state;
        this.setState({
            popUpConfirm: false,
            name: '',
        })
        status ? deleteCar(name): null;
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