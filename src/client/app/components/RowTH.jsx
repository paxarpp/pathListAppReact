import React, { Component } from 'react';

import fildNamePathList from './fildNamePathList';

export default class RowTH extends Component {
    handler = e => {
        const { handlerTable } = this.props;
        handlerTable(e.target.dataset.fieldName)
    }
    render() {
        return (
            <tr onClick={this.handler}>
                <th style={{ width: "15%" }}>{fildNamePathList['name']}</th>
                <th data-field-name={'dateBegin'} style={{ width: "10%" }}>{fildNamePathList['dateBegin']}</th>
                <th style={{ width: "5%" }}>{fildNamePathList['fuel']}</th>
                <th style={{ width: "5%" }}>{fildNamePathList['constFuelChange']}</th>
                <th data-field-name={'pathBegin'} style={{ width: "10%" }}>{fildNamePathList['pathBegin']}</th>
                <th data-field-name={'pathEnd'} style={{ width: "10%" }}>{fildNamePathList['pathEnd']}</th>
                <th data-field-name={'milleage'} style={{ width: "10%" }}>{fildNamePathList['milleage']}</th>
                <th data-field-name={'ConsumptionFactoryFuel'} style={{ width: "10%" }}>{fildNamePathList['ConsumptionFactoryFuel']}</th>
                <th data-field-name={'fuelBegin'} style={{ width: "5%" }}>{fildNamePathList['fuelBegin']}</th>
                <th data-field-name={'addFuel'} style={{ width: "5%" }}>{fildNamePathList['addFuel']}</th>
                <th data-field-name={'addFuelWinter'} style={{ width: "5%" }}>{fildNamePathList['addFuelWinter']}</th>
                <th data-field-name={'fuelEnd'} style={{ width: "10%" }}>{fildNamePathList['fuelEnd']}</th>
            </tr>
        )
    }

}

