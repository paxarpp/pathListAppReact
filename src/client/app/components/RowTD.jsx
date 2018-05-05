import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fildNamePathList from './fildNamePathList';

export default class RowTD extends Component {
    render() {
        const { path } = this.props;
        return (
            <tr>
                <td>{path.name}</td>
                <td>{path.dateBegin}</td>
                <td>{path.fuel}</td>
                <td>{path.constFuelChange}</td>
                <td>{path.pathBegin}</td>
                <td>{path.pathEnd}</td>
                <td>{path.milleage}</td>
                <td>{path.ConsumptionFactoryFuel}</td>
                <td>{path.fuelBegin}</td>
                <td>{path.addFuel}</td>
                <td>{path.addFuelWinter}</td>
                <td>{path.fuelEnd}</td>
            </tr>
        )
    }
}






















