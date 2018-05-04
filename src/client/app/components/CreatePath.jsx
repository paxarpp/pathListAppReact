import React, { Component } from 'react';
import { connect } from 'react-redux';

import { savePath } from '../actions/pathLists.js';
import { closeWindow } from '../actions/cars.js';
import Button from './Button';
import calculateFieldPath from './calculateFieldPath';
import fildNamePathList from './fildNamePathList';
import fildNameCheckRule from './fildNameCheckRule.js';
class CreatePath extends Component {
    state = {
        name: '',
        fuel: '',
        dateBegin: '',
        pathBegin: '',
        pathEnd: '',
        milleage: 0,
        fuelBegin: '',
        fuelEnd: '',
        addFuel: '',
        deltaFuel: 0,
        addFuelWinter: '',
        constFuelChange: '',
        ConsumptionFactoryFuel: '',
        isWrong: false,
        isWrongDuble: false,
        columnView: true
    }
    handleSubmit = e => {
        e.preventDefault()
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
            fuel,
            constFuelChange,
            ConsumptionFactoryFuel,
            addFuelWinter,
            isWrong } = this.state;

        const { addDataPath, pathLists, close } = this.props;
        const path = {
            name,
            dateBegin,
            pathBegin,
            pathEnd,
            milleage,
            fuelBegin,
            fuelEnd,
            addFuel,
            deltaFuel,
            fuel,
            constFuelChange,
            ConsumptionFactoryFuel,
            addFuelWinter
        }
        const { cars } = this.props;       
        if (path.dateBegin === '') {
            this.setState(() => ({
                isWrong: 'dateBegin',
            }))
        } else {
            if (pathLists.some(elem => {
                return (elem.name === path.name && elem.dateBegin === path.dateBegin)
            })) {
                this.setState(() => ({
                    isWrongDuble: true,
                }))
            } else {
                if(path.name){
                    addDataPath(calculateFieldPath(path));
                    close('isNewPath');
                }
            }
        }
    }
    handleChangeName = e => {
        const value = e.currentTarget.value;
        const fieldName = e.currentTarget.dataset.fieldName;
        const { cars } = this.props; 
            this.setState(prev => ({
                ...prev,
                [fieldName]: value,
            }))   
            this.setState(prev => ({
                ...prev,
                fuel: cars.filter(car => {return car.name === value})[0].fuel,
                constFuelChange: cars.filter(car => {return car.name === value})[0].constFuelChange,
            }))
    }
    handleChange = e => {
        const value = e.currentTarget.value;
        const fieldName = e.currentTarget.dataset.fieldName;
        const { pathEnd, pathBegin,fuelBegin, fuelEnd, addFuel, addFuelWinter } = this.state;
        this.setState(prev => ({
            ...prev,
            [fieldName]: value,
            isWrongDuble: false,
        }), () => {
            const { isWrong } = this.state;
            if (fildNameCheckRule[fieldName].test(this.state[fieldName])) {         
                this.setState({
                    isWrong: false
                })          
            } else {
                this.setState({
                    isWrong: fieldName
                })
            }
        })
        this.setState(prev => ({
            ...prev,
            milleage: +prev.pathEnd - +prev.pathBegin,
        }))
        this.setState(prev => ({
            ...prev,
            ConsumptionFactoryFuel: Math.round((+prev.milleage * +prev.constFuelChange / 100) * 100) / 100
        }))
        this.setState(prev => ({
            ...prev,
            fuelEnd: Math.round(((+prev.fuelBegin + +prev.addFuel + +prev.addFuelWinter) - +prev.ConsumptionFactoryFuel) * 100 ) / 100,
        }))
        this.setState(prev => ({
            ...prev,
            deltaFuel: Math.round(((+prev.fuelBegin + +prev.addFuel + +prev.addFuelWinter) - +prev.fuelEnd) * 100 ) / 100,
        }))
    }
    handleClose = e => {
        const { close } = this.props
        e.preventDefault();
        close('isNewPath');
    }
    handleChangeView = e => {
        const { columnView } = this.state;
        this.setState({
            columnView: !columnView
        })
    }
    render() {
        const { cars } = this.props;
        const {
            name,
            fuel,
            dateBegin,
            pathBegin,
            pathEnd,
            milleage,
            fuelBegin,
            fuelEnd,
            addFuel,
            deltaFuel,
            addFuelWinter,
            isWrong,
            columnView,
            isWrongDuble } = this.state;
        return (
            <div className="popUpWrapp">
                <div className="popUp">
                    <div className="header">
                        <h2 className="headerText">Новый лист</h2>
                        <Button handler={this.handleClose} styleButton="delit">{String.fromCharCode(10006)}</Button>
                        <Button handler={this.handleChangeView} 
                                styleButton="switchView">
                                {columnView ? String.fromCharCode(9654) : String.fromCharCode(9660)}
                        </Button>
                    </div>
                    <div className={ columnView ? "popUpContent" : "popUpContentRow" }>
                    <div className={ columnView ? null : 'row' }>
                        <h4 className="inputHeader">выберите автомобиль</h4>
                        <select
                            data-field-name={'name'}
                            value={name}
                            onChange={this.handleChangeName}
                        >
                            <option></option>
                            {cars.map(car => {
                                return (
                                    <option key={car.name}>
                                        {car.name}
                                    </option>
                                )
                            })}
                        </select>
                        <h4 className="inputHeader">выберите дату начала путевки</h4>
                        <input
                            className={isWrong==='dateBegin' ? 'inputErrorCheck': null}
                            data-field-name={'dateBegin'}
                            type={'date'}
                            onChange={this.handleChange}
                            placeholder={'начало'}
                            value={dateBegin}
                        />
                        <h4 className="inputHeader">введите начальный пробег, км</h4>
                        <input
                            className={isWrong==='pathBegin' ? 'inputErrorCheck': null}
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
                            className={isWrong==='pathEnd' ? 'inputErrorCheck': null}
                            data-field-name={'pathEnd'}
                            type={'number'}
                            onChange={this.handleChange}
                            placeholder={'пробег, конец'}
                            value={pathEnd}
                            step={'1'}
                            min={'0'}
                        />
                        <h4 className="resultHeader">Пробег составил: {milleage} км</h4>
                        </div>
                        <div className={ columnView ? null : 'row' }>
                        <h4 className="inputHeader">введите начальное количество топлива, л</h4>
                        <input
                            className={isWrong==='fuelBegin' ? 'inputErrorCheck': null}
                            data-field-name={'fuelBegin'}
                            type={'number'}
                            onChange={this.handleChange}
                            placeholder={'топливо, начало'}
                            value={fuelBegin}
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
                        { fuel === 'DT' ? <h4 className="inputHeader">введите заправленное ЗИМНЕЕ топливо, л</h4> : null }
                        { fuel === 'DT' ? <input
                            data-field-name={'addFuelWinter'}
                            type={'number'}
                            onChange={this.handleChange}
                            placeholder={'топливо, заправка ЗИМА'}
                            value={addFuelWinter}
                            step={'0.01'}
                            min={'0'}
                        /> : null }
                        <h4 className="inputHeader">конечное количество топлива { fuelEnd } л</h4>
                        <h4 className="resultHeader">{fildNamePathList['deltaFuel']}: {deltaFuel} л</h4>
                    </div>
                    {isWrong && <h3 className="inputError">ошибка</h3>}
                    {isWrongDuble && <h3 className="inputError">на эту дату лист уже есть</h3>}
                    </div>
                    <div className="footer">
                        <Button handler={ isWrong === false ? this.handleSubmit : null } styleButton={ isWrong === false ? "submit" : "disableButton" }>Сохранить</Button>
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
        close: (isNewPath) => closeWindow(dispatch, isNewPath),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePath);
