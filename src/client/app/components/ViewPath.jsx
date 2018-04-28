import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

import fildNamePathList from './fildNamePathList';
import Button from '../components/Button';

export default class ViewPath extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabledField: true,
            dateBegin: this.props.path.dateBegin,
            name: this.props.path.name,
            fuel: this.props.path.fuel,
            constFuelChange: this.props.path.constFuelChange,
            ConsumptionFactoryFuel: this.props.path.ConsumptionFactoryFuel,
            pathBegin: this.props.path.pathBegin,
            pathEnd: this.props.path.pathEnd,
            milleage: this.props.path.milleage,
            fuelBegin: this.props.path.fuelBegin,
            fuelEnd: this.props.path.fuelEnd,
            addFuel: this.props.path.addFuel,
            deltaFuel: this.props.path.deltaFuel,
        }
    }

    handleEdit = (name) => () => {
        const { disabledField } = this.state;
        ReactDom.findDOMNode(this.refs[name]).disabled = false
    }
    handleChange = (e) => {
        const { addData } = this.props;
        const value = e.currentTarget.value;
        const fieldName = e.currentTarget.dataset.fieldName;
        const { pathEnd, pathBegin, fuelBegin, fuelEnd, addFuel } = this.state;
        this.setState(prev => ({
            ...prev,
            [fieldName]: value,
        }), () => { addData(this.state) })
        this.setState(prev => ({
            milleage: +prev.pathEnd - +prev.pathBegin,
            deltaFuel: (( +prev.fuelBegin + +prev.addFuel )- +prev.fuelEnd),
        }), () => { addData(this.state) })
    }

    render() {
        const { path } = this.props;
        const { disabledField } = this.state;
        return (
            <div className="View" >
                {
                    <Fragment>
                        <label>{path.name}</label>
                        <label>{fildNamePathList['fuel']}: {path.fuel}</label>
                        <label>{fildNamePathList['constFuelChange']}: {path.constFuelChange} л</label>
                        <label>{fildNamePathList['dateBegin']}: {path.dateBegin}</label>
                    </Fragment>
                }
                {
                    Object.keys(path).filter(elem => {
                        return (
                            elem !== 'name' &&
                            elem !== 'fuel' && 
                            elem !== 'constFuelChange' && 
                            elem !== 'ConsumptionFactoryFuel' &&
                            elem !== 'dateBegin' &&
                            elem !== 'deltaFuel'
                        )
                    }).map(elem => {
                        return (
                            <Fragment key={elem}>
                                <label>{fildNamePathList[elem]}</label>
                                <div>
                                    <input
                                        data-field-name={elem}
                                        type={'text'}
                                        onChange={this.handleChange}
                                        placeholder={fildNamePathList[elem]}
                                        defaultValue={path[elem]}
                                        disabled={disabledField}
                                        ref={elem}
                                    />
                                    <Button handler={this.handleEdit(elem)} styleButton="edit">{String.fromCharCode(9998)}</Button>
                                </div>
                            </Fragment>
                        )
                    })
                }
                {
                    <Fragment>
                        <label>{fildNamePathList['deltaFuel']}: {path.deltaFuel} л</label>
                        <label>{fildNamePathList['ConsumptionFactoryFuel']}: {path.ConsumptionFactoryFuel} л</label>
                    </Fragment>
                }
            </div>
        )
    }
}
