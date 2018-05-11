import React from 'react';
import PropTypes from 'prop-types';

import createObjectError from "./createObjectError";

const RowTD = ({ path, handler, error }) => {
    const matchNames = createObjectError(path, error);
    return (
        <tr onClick={handler(path)}>
            <td>{path.name}</td>
            <td>{path.dateBegin}</td>
            <td>{path.fuel}</td>
            <td>{path.constFuelChange}</td>
            <td className={!(matchNames.first) && matchNames.path ? "inputError" : null}>
            {path.pathBegin}</td>
            <td className={matchNames.first && matchNames.path ? "inputError" : null}>
            {path.pathEnd}</td>
            <td>{path.milleage}</td>
            <td className={!(matchNames.first) && matchNames.fuel ? "inputError" : null}>
            {path.fuelBegin}</td>
            <td>{path.addFuel}</td>
            <td className={matchNames.first && matchNames.fuel ? "inputError" : null}>
            {path.fuelEnd}</td>
            <td>{path.deltaFuel}</td>
        </tr>
    )
}
export default RowTD;






















