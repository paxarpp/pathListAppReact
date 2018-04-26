import React, { Component } from 'react';
import { connect } from 'react-redux';

import { savePath } from '../actions/pathLists.js';
import { closeWindow } from '../actions/cars.js';
import Button from '../components/Button';
class CreatePath extends Component {
    state = {
        carName: '',
        dateBegin: '',
        pathBegin: '',
        pathEnd: '',
        milleage: 0,
        fuelBegin: '',
        fuelEnd: '',
        addFuel: '',
        deltaFuel: 0,
        isWrong: false
    }
    handleSubmit = e => {
        e.preventDefault()
        const { 
            carName,
            dateBegin,
            pathBegin,
            pathEnd,
            milleage,
            fuelBegin,
            fuelEnd,
            addFuel,
            deltaFuel,
            isWrong } = this.state;
        const { addDataPath, pathLists } = this.props;
        const path = {
            name: carName,
            dateBegin,
            pathBegin,
            pathEnd,
            milleage,
            fuelBegin,
            fuelEnd,
            addFuel,
            deltaFuel,
        }
        if ( path.name === '' ){
            this.setState(() => ({
                isWrong: true,
            }))
        } else {
            if (pathLists.some(elem =>{ 
                return ( elem.name === path.name && elem.dateBegin === path.dateBegin )
             })) 
            {
                this.setState(() => ({
                    isWrong: true,
                }))
            } else {
                addDataPath(path)
            }
        }
    }
    handleChange = e => {
        const value = e.currentTarget.value
        const fieldName = e.currentTarget.dataset.fieldName
        this.setState(prev => ({
            ...prev,
            [fieldName]: value,
            isWrong: false
        }))  
        const { pathEnd, pathBegin } = this.state;
        this.setState(prev => ({
            milleage:  prev.pathEnd-prev.pathBegin
        }))       
        const { fuelBegin, fuelEnd, addFuel } = this.state;
        this.setState(prev => ({ 
            deltaFuel: (+prev.fuelBegin + +prev.addFuel - +prev.fuelEnd)
        }))       
    }
    handleClose = e => {
        const { close } = this.props
        e.preventDefault()
        close()
    }
    render() {
        const { cars } = this.props;
        const { 
                carName,
                dateBegin,
                pathBegin,
                pathEnd,
                milleage,
                fuelBegin,
                fuelEnd,
                addFuel,
                deltaFuel,
                isWrong } = this.state
        return (
            <div className="popUpWrapp">
                <div className="popUp">
                    <div className="header">
                        <h2 className="headerText">Новый лист</h2>
                        <Button handler={this.handleClose} styleButton="delit">{String.fromCharCode(10006)}</Button>
                    </div>
                    <div className="popUpContent">
                        <h4 className="inputHeader">выберите автомобиль</h4>
                        <select
                          data-field-name={'carName'}
                          value={carName}
                          onChange={this.handleChange}
                        >
                        <option></option>
                            {cars.map(car => {
                                return (
                                    <option
                                        key={car.name}
                                      >
                                      {car.name}
                                    </option>
                                )
                            } )}
                        </select>
                        <h4 className="inputHeader">выберите дату начала путевки</h4>
                        <input
                            data-field-name={'dateBegin'}
                            type={'date'}
                            onChange={this.handleChange}
                            placeholder={'начало'}
                            value={dateBegin}
                        />
                        <h4 className="inputHeader">введите начальный пробег, км</h4>
                        <input
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
                            data-field-name={'pathEnd'}
                            type={'number'}
                            onChange={this.handleChange}
                            placeholder={'пробег, конец'}
                            value={pathEnd}
                            step={'1'}
                            min={'0'}
                        />
                        <h4 className="resultHeader">Пробег составил: {milleage} км</h4>
                        <h4 className="inputHeader">введите начальное количество топлива, л</h4>
                        <input
                            data-field-name={'fuelBegin'}
                            type={'number'}
                            onChange={this.handleChange}
                            placeholder={'топливо, начало'}
                            value={fuelBegin}
                            step={'0.01'}
                            min={'0'}
                        />
                        <h4 className="inputHeader">введите конечное количество топлива, л</h4>
                        <input
                            data-field-name={'fuelEnd'}
                            type={'number'}
                            onChange={this.handleChange}
                            placeholder={'топливо, конец'}
                            value={fuelEnd}
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
                        <h4 className="resultHeader">расход топлива составил: {deltaFuel} л</h4>
                    </div>
                    {isWrong && <h3 className="inputError">ошибка</h3>}
                    <div className="footer">
                        <Button handler={this.handleSubmit} styleButton="submit">Сохранить</Button>
                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        pathLists: state.pathLists,
        cars: state.cars
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addDataPath: (path) => savePath(dispatch, path),
        close: () => closeWindow(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePath);
