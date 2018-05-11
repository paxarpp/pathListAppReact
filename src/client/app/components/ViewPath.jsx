import React from "react";
import PropTypes from "prop-types";

import fildNamePathList from "./fildNamePathList";
import createObjectError from "./createObjectError";

const ViewPath = ({ path, error }) => {
    const matchNames = createObjectError(path, error);
    return <div className="View">
        <h4 className="head">{path.name}</h4>
        <p>
          {fildNamePathList["fuel"]}: {path.fuel}
        </p>
        <p>
          {fildNamePathList["constFuelChange"]}: {path.constFuelChange} л
        </p>
        <p>
          {fildNamePathList["dateBegin"]}: {path.dateBegin}
        </p>
        <p className={!(matchNames.first) && matchNames.path ? "inputError" : null}>
          {fildNamePathList["pathBegin"]}: {path.pathBegin}
        </p>
        <p className={matchNames.first && matchNames.path ? "inputError" : null}>
          {fildNamePathList["pathEnd"]}: {path.pathEnd}
        </p>
        <p>
          {fildNamePathList["milleage"]}: {path.milleage}
        </p>
        <p className={!(matchNames.first) && matchNames.fuel ? "inputError" : null}>
          {fildNamePathList["fuelBegin"]}: {path.fuelBegin} л
        </p>
        <p>
          {fildNamePathList["addFuel"]}: {path.addFuel} л
        </p>
        <p className={matchNames.first && matchNames.fuel ? "inputError" : null}>
          {fildNamePathList["fuelEnd"]}: {path.fuelEnd} л
        </p>
        <p>
          {fildNamePathList["deltaFuel"]}: {path.deltaFuel} л
        </p>
      </div>;
}
export default ViewPath;
