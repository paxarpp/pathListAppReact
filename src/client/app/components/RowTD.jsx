import React from 'react';
import PropTypes from 'prop-types';

import createObjectError from "./createObjectError";

const RowTD = ({ path, handler, error, doubleClick }) => {
  const matchNames = createObjectError(path, error);
  return (
    <tr onClick={handler(path)}>
      <td>{path.name}</td>
      <td>{path.dateBegin}</td>
      <td>{path.fuel}</td>
      <td>{path.constFuelChange}</td>
      <td
        className={!matchNames.first && matchNames.path ? "inputError" : null}
        onDoubleClick={doubleClick("pathBegin", path.pathBegin)}
      >
        <span className="editableTd">
        {path.pathBegin}
        </span>
      </td>
      <td
        className={matchNames.first && matchNames.path ? "inputError" : null}
        onDoubleClick={doubleClick("pathEnd", path.pathEnd)}
      >
        <span className="editableTd">
        {path.pathEnd}
        </span>
      </td>
      <td>{path.milleage}</td>
      <td
        className={!matchNames.first && matchNames.fuel ? "inputError" : null}
        onDoubleClick={doubleClick("fuelBegin", path.fuelBegin)}
      >
        <span className="editableTd">
        {path.fuelBegin}
        </span>
      </td>
      <td onDoubleClick={doubleClick("fuelBegin", path.fuelBegin)}>
        <span>
        {path.addFuel}
        </span>
      </td>
      <td className={matchNames.first && matchNames.fuel ? "inputError" : null}>
        {path.fuelEnd}
      </td>
      <td>{path.deltaFuel}</td>
    </tr>
  );
};
export default RowTD;






















