import React from "react";
import PropTypes from "prop-types";

import fildNamePathList from "./fildNamePathList";

const ViewPath = ({ path, error }) => {
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
        <p className={error.filter(elem=>(
            elem.name === path.name && elem.dateBegin === path.dateBegin && !(elem.first) && !(elem.errorFuel)
        )).length>0 ? "inputError" : null}>
          {fildNamePathList["pathBegin"]}: {path.pathBegin}
        </p>
        <p className={error.filter(elem=>(
            elem.name === path.name && elem.dateBegin === path.dateBegin && elem.first  && !(elem.errorFuel)
        )).length>0 ? "inputError" : null}>
          {fildNamePathList["pathEnd"]}: {path.pathEnd}
        </p>
        <p>
          {fildNamePathList["milleage"]}: {path.milleage}
        </p>
        <p className={error.filter(elem=>(
            elem.name === path.name && elem.dateBegin === path.dateBegin && !(elem.first)  && elem.errorFuel
        )).length>0 ? "inputError" : null}>
          {fildNamePathList["fuelBegin"]}: {path.fuelBegin} л
        </p>
        <p>
          {fildNamePathList["addFuel"]}: {path.addFuel} л
        </p>
        <p className={error.filter(elem=>(
            elem.name === path.name && elem.dateBegin === path.dateBegin && elem.first && elem.errorFuel
        )).length>0 ? "inputError" : null}>
          {fildNamePathList["fuelEnd"]}: {path.fuelEnd} л
        </p>
        <p>
          {fildNamePathList["deltaFuel"]}: {path.deltaFuel} л
        </p>
      </div>;
}
export default ViewPath;
