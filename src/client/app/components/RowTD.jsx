import React from 'react';
import PropTypes from 'prop-types';

const RowTD = ({ path, handler }) => {
    return (
        <tr onClick={handler(path)}>
            <td>{path.name}</td>
            <td>{path.dateBegin}</td>
            <td>{path.fuel}</td>
            <td>{path.constFuelChange}</td>
            <td>{path.pathBegin}</td>
            <td>{path.pathEnd}</td>
            <td>{path.milleage}</td>
            <td>{path.fuelBegin}</td>
            <td>{path.addFuel}</td>
            <td>{path.fuelEnd}</td>
            <td>{path.deltaFuel}</td>
        </tr>
    )
}
export default RowTD;






















