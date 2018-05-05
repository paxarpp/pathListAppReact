import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fildNamePathList from './fildNamePathList';
import RowTD from './RowTD';

export default class Table extends Component {
    render() {
        const { selectedCar, pathLists } = this.props;
        return (
            <table className="pathListSelectedCar">
                <thead>
                    <tr>
                        <th data-field-name={'name'}>{fildNamePathList['name']}</th>
                        <th data-field-name={'dateBegin'}>{fildNamePathList['dateBegin']}</th>
                        <th data-field-name={'fuel'}>{fildNamePathList['fuel']}</th>
                        <th data-field-name={'constFuelChange'}>{fildNamePathList['constFuelChange']}</th>
                        <th data-field-name={'pathBegin'}>{fildNamePathList['pathBegin']}</th>
                        <th data-field-name={'pathEnd'}>{fildNamePathList['pathEnd']}</th>
                        <th data-field-name={'milleage'}>{fildNamePathList['milleage']}</th>
                        <th data-field-name={'ConsumptionFactoryFuel'}>{fildNamePathList['ConsumptionFactoryFuel']}</th>
                        <th data-field-name={'fuelBegin'}>{fildNamePathList['fuelBegin']}</th>
                        <th data-field-name={'addFuel'}>{fildNamePathList['addFuel']}</th>
                        <th data-field-name={'addFuelWinter'}>{fildNamePathList['addFuelWinter']}</th>
                        <th data-field-name={'fuelEnd'}>{fildNamePathList['fuelEnd']}</th>
                    </tr>
                </thead>
                <tbody>
                {
                    pathLists.filter(path => {
                        return (path.name === selectedCar)
                    }).map( path =>{ return (
                    <RowTD path={path} key={path.dateBegin}/>
                    )})
                }
                </tbody>

            </table>
        )
    }
}
