import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveCar, closeWindow } from '../actions/cars.js';
import Button from '../components/Button';
class CreateCar extends Component {
    state = {
        carName: '',
        constFuel: '',
        typeFuel: 'AI',
        isWrong: false
    }
    handleSubmit = e => {
        e.preventDefault()
        const { carName, constFuel, typeFuel, isWrong } = this.state;
        const { addDataCar, cars } = this.props;
        const car = {
            name: carName,
            constFuelChange: constFuel,
            fuel: typeFuel
        }
        if (car.name === '') {
            this.setState(() => ({
                isWrong: true,
            }))
        } else {
            if (cars.some(elem => elem.name === car.name)) {
                this.setState(() => ({
                    isWrong: true,
                }))
            } else {
                addDataCar(car)
            }
        }
    }
    handleChange = e => {
        const value = e.currentTarget.value
        const fieldName = e.currentTarget.dataset.fieldName
        this.setState(prev => ({
            ...prev,
            [fieldName]: value,
        }))
    }
    handleClose = e => {
        const { close } = this.props
        e.preventDefault()
        close()
    }

    render() {
        const { carName, constFuel, typeFuel, isWrong } = this.state
        return (
            <div className="popUpWrapp">
                <div className="popUp">
                    <div className="header">
                        <h2 className="headerText">Новая машина</h2>
                        <Button handler={this.handleClose} styleButton="delit">{String.fromCharCode(10006)}</Button>
                    </div>
                    <div className="popUpContent">
                        <h4 className="inputHeader">введите название автомобиля</h4>
                        <input
                            data-field-name={'carName'}
                            type={'text'}
                            onChange={this.handleChange}
                            placeholder={'название'}
                            value={carName}
                        />
                        <h4 className="inputHeader">введите паспортный расход топлива</h4>
                        <input
                            data-field-name={'constFuel'}
                            type={'number'}
                            onChange={this.handleChange}
                            placeholder={'расход по паспорту на 100 км'}
                            value={constFuel}
                            step={'0.01'}
                            min={'0'}
                        />
                        <h4 className="inputHeader">выберите тип топлива</h4>
                        <label>Бензин
                        <input
                                checked={this.state.typeFuel === 'AI'}
                                name={"typeFuel"}
                                data-field-name={'typeFuel'}
                                type={'radio'}
                                onChange={this.handleChange}
                                value={"AI"}
                            />
                        </label>
                        <label>Дизель
                        <input
                                checked={this.state.typeFuel === 'DT'}
                                name={"typeFuel"}
                                data-field-name={'typeFuel'}
                                type={'radio'}
                                onChange={this.handleChange}
                                value={"DT"}
                            />
                        </label>
                    </div>
                    {isWrong && <h3 className="inputError">введите правильно название авто</h3>}
                    <div className="footer">
                        <Button handler={this.handleSubmit} styleButton="submit">Сохранить</Button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addDataCar: (car) => saveCar(dispatch, car),
        close: () => closeWindow(dispatch)
    }
}
const mapStateToProps = (state) => {
    return {
        cars: state.cars,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCar);
