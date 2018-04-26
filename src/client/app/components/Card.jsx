import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
    render() {
        const { path } = this.props;
        return (
            <div className="cardPathList">
                <h3> {path.name}</h3>
                <p> паспортный расход: {path.constFuelChange} л</p>
                <p> дата: {path.dateBegin}</p>
                <p> пробег: {path.milleage} км</p>
                <p>топливо в начале: {path.fuelBegin} л</p>
                <p> топливо в конце: {path.fuelEnd} л</p>
                <p> заправлено: {path.addFuel} л</p>
                <p> расход по листу: {path.deltaFuel} л</p>
            </div>
        )
    }
}