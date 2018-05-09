import React from "react";
import PropTypes from "prop-types";

import fildNamePathList from "./fildNamePathList";

const ViewPath = ({ path }) => {
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
        <p>
          {fildNamePathList["pathBegin"]}: {path.pathBegin}
        </p>
        <p>
          {fildNamePathList["pathEnd"]}: {path.pathEnd}
        </p>
        <p>
          {fildNamePathList["milleage"]}: {path.milleage}
        </p>
        <p>
          {fildNamePathList["fuelBegin"]}: {path.fuelBegin} л
        </p>
        <p>
          {fildNamePathList["addFuel"]}: {path.addFuel} л
        </p>
        <p>
          {fildNamePathList["fuelEnd"]}: {path.fuelEnd} л
        </p>
        <p>
          {fildNamePathList["deltaFuel"]}: {path.deltaFuel} л
        </p>
      </div>;
}
export default ViewPath;
