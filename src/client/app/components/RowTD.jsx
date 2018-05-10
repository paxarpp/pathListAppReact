import React from 'react';
import PropTypes from 'prop-types';

const RowTD = ({ path, handler, error }) => {
    return (
        <tr onClick={handler(path)}>
            <td>{path.name}</td>
            <td>{path.dateBegin}</td>
            <td>{path.fuel}</td>
            <td>{path.constFuelChange}</td>
            <td className={error.filter(elem=>(
                elem.name === path.name && elem.dateBegin === path.dateBegin && !(elem.first) && !(elem.errorFuel)
                )).length>0 ? "inputError" : null}
            >
            {path.pathBegin}</td>
            <td className={error.filter(elem=>(
                elem.name === path.name && elem.dateBegin === path.dateBegin && elem.first  && !(elem.errorFuel)
                )).length>0 ? "inputError" : null}
            >
            {path.pathEnd}</td>
            <td>{path.milleage}</td>
            <td className={error.filter(elem=>(
                elem.name === path.name && elem.dateBegin === path.dateBegin && !(elem.first)  && elem.errorFuel
                )).length>0 ? "inputError" : null}
            >
            {path.fuelBegin}</td>
            <td>{path.addFuel}</td>
            <td className={error.filter(elem=>(
                elem.name === path.name && elem.dateBegin === path.dateBegin && elem.first && elem.errorFuel
                )).length>0 ? "inputError" : null}
            >
            {path.fuelEnd}</td>
            <td>{path.deltaFuel}</td>
        </tr>
    )
}
export default RowTD;






















