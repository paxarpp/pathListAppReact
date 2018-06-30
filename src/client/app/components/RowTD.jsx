import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import createObjectError from './createObjectError';
import Icon from './Icon';

const RowTD = ({ path, handler, error, doubleClick, deletePath, selectPath }) => {
  const matchNames = createObjectError(path, error);
  return (
    <tr
      onClick={path.name !== null ? handler(path) : null}
      className={selectPath.dateBegin === path.dateBegin ? 'selectTableRow' : null}
    >
      {path.dateBegin === null ? <td /> : <td>{new Date(path.dateBegin).toLocaleDateString()}</td>}
      <td>{path.fuel}</td>
      <td>
        {path.constFuelChange}
        <span className="extension">{path.extension === 'true' ? ' прицеп' : ''}</span>
      </td>
      <td className={!matchNames.first && matchNames.path ? 'inputError' : null}>
        {path.name !== null ? (
          <span className="editableTd">
            {path.pathBegin}
            <WrapIcon name="Create" color="green" size="16px" onClick={doubleClick('pathBegin', path.pathBegin)} />
          </span>
        ) : null}
      </td>
      <td className={matchNames.first && matchNames.path ? 'inputError' : null}>
        {path.name !== null ? (
          <span className="editableTd">
            {path.pathEnd}
            <WrapIcon name="Create" color="green" size="16px" onClick={doubleClick('pathEnd', path.pathEnd)} />
          </span>
        ) : null}
      </td>
      <td>{path.milleage}</td>
      <td className={!matchNames.first && matchNames.fuel ? 'inputError' : null}>
        {path.name !== null ? (
          <span className="editableTd">
            {path.fuelBegin}
            <WrapIcon name="Create" color="green" size="16px" onClick={doubleClick('fuelBegin', path.fuelBegin)} />
          </span>
        ) : null}
      </td>
      <td>
        {path.name !== null ? (
          <span className="editableTd">
            {path.addFuel}
            <WrapIcon name="Create" color="green" size="16px" onClick={doubleClick('addFuel', path.addFuel)} />
          </span>
        ) : null}
      </td>
      <td>{path.deltaFuel}</td>
      <td className={matchNames.first && matchNames.fuel ? 'inputError' : null}>{path.fuelEnd}</td>
      <td>{path.name !== null ? <Icon name="Delete" color="red" onClick={deletePath(path)} /> : null}</td>
    </tr>
  );
};
RowTD.propTypes = {
  path: PropTypes.object,
  handler: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.object),
  doubleClick: PropTypes.func,
  deletePath: PropTypes.func,
  selectPath: PropTypes.object
};
const WrapIcon = styled(Icon)`
  position: absolute;
  top: 2px;
  right: 2px;
  transition: transform 0.2s linear;
  :hover {
    transform: scale(1.1);
  }
`;
export default RowTD;
