import React from 'react';

import fildNamePathList from './fildNamePathList';

const RowTH = () => {
    return (
        <tr>
        <th style={{width: "15%"}}>{fildNamePathList['name']}</th>
        <th style={{width: "10%"}}>{fildNamePathList['dateBegin']}</th>
        <th style={{width: "5%"}}>{fildNamePathList['fuel']}</th>
        <th style={{width: "5%"}}>{fildNamePathList['constFuelChange']}</th>
        <th style={{width: "10%"}}>{fildNamePathList['pathBegin']}</th>
        <th style={{width: "10%"}}>{fildNamePathList['pathEnd']}</th>
        <th style={{width: "10%"}}>{fildNamePathList['milleage']}</th>
        <th style={{width: "10%"}}>{fildNamePathList['ConsumptionFactoryFuel']}</th>
        <th style={{width: "5%"}}>{fildNamePathList['fuelBegin']}</th>
        <th style={{width: "5%"}}>{fildNamePathList['addFuel']}</th>
        <th style={{width: "5%"}}>{fildNamePathList['addFuelWinter']}</th>
        <th style={{width: "10%"}}>{fildNamePathList['fuelEnd']}</th>
    </tr>
    )
}
export default RowTH;
