import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import fildNamePathList from './fildNamePathList';
import createObjectError from './createObjectError';

export default class ViewPath extends PureComponent {
  render() {
    const { path, error, doubleClick } = this.props;
    const matchNames = createObjectError(path, error);
    return path.name === null || path.name === undefined ? (
      <div className="emptyList" />
    ) : (
      <div className="View">
        <h4 className="head">{path.name}</h4>
        <p>
          {fildNamePathList['fuel']}: {path.fuel}
        </p>
        <p>
          {fildNamePathList['constFuelChange']}: {path.constFuelChange} л
        </p>
        <p>
          {fildNamePathList['dateBegin']}: {path.dateBegin}
        </p>
        <p
          onDoubleClick={doubleClick('pathBegin', path.pathBegin)}
          className={!matchNames.first && matchNames.path ? 'inputError' : null}
        >
          <span className="editable">
            {fildNamePathList['pathBegin']}: {path.pathBegin} км
          </span>
        </p>
        <p
          onDoubleClick={doubleClick('pathEnd', path.pathEnd)}
          className={matchNames.first && matchNames.path ? 'inputError' : null}
        >
          <span className="editable">
            {fildNamePathList['pathEnd']}: {path.pathEnd} км
          </span>
        </p>
        <p>
          {fildNamePathList['milleage']}: {path.milleage} км
        </p>
        <p
          onDoubleClick={doubleClick('fuelBegin', path.fuelBegin)}
          className={!matchNames.first && matchNames.fuel ? 'inputError' : null}
        >
          <span className="editable">
            {fildNamePathList['fuelBegin']}: {path.fuelBegin} л
          </span>
        </p>
        <p onDoubleClick={doubleClick('addFuel', path.addFuel)}>
          <span className="editable">
            {fildNamePathList['addFuel']}: {path.addFuel} л
          </span>
        </p>
        <p>
          {fildNamePathList['deltaFuel']}: {path.deltaFuel} л
        </p>
        <p
          className={matchNames.first && matchNames.fuel ? 'inputError' : null}
        >
          {fildNamePathList['fuelEnd']}: {path.fuelEnd} л
        </p>
      </div>
    );
  }
}
