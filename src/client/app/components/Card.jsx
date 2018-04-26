import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fildNamePathList from './fildNamePathList'

export default class Card extends Component {
    render() {
        const { path } = this.props;
        return (
            <div className="cardPathList">
                <h3> {path.name}</h3>
                <p>{fildNamePathList['constFuelChange']}: {path.constFuelChange} л</p>
                <p>{fildNamePathList['dateBegin']}: {path.dateBegin}</p>
                <p>{fildNamePathList['milleage']}: {path.milleage} км</p>
                <p>{fildNamePathList['fuelBegin']}: {path.fuelBegin} л</p>
                <p>{fildNamePathList['fuelEnd']}: {path.fuelEnd} л</p>
                <p>{fildNamePathList['addFuel']}: {path.addFuel} л</p>
                <p>{fildNamePathList['deltaFuel']}: {path.deltaFuel} л</p>
            </div>
        )
    }
}