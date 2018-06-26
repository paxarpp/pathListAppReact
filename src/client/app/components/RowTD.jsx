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
      <td
        className={!matchNames.first && matchNames.path ? 'inputError' : null}
        onDoubleClick={path.name !== null ? doubleClick('pathBegin', path.pathBegin) : null}
      >
        {path.name !== null ? (
          <span className="editableTd">
            {path.pathBegin}
            <WrapIcon name="Create" color="green" size="16px" />
          </span>
        ) : null}
      </td>
      <td
        className={matchNames.first && matchNames.path ? 'inputError' : null}
        onDoubleClick={path.name !== null ? doubleClick('pathEnd', path.pathEnd) : null}
      >
        {path.name !== null ? (
          <span className="editableTd">
            {path.pathEnd}
            <WrapIcon name="Create" color="green" size="16px" />
          </span>
        ) : null}
      </td>
      <td>{path.milleage}</td>
      <td
        className={!matchNames.first && matchNames.fuel ? 'inputError' : null}
        onDoubleClick={path.name !== null ? doubleClick('fuelBegin', path.fuelBegin) : null}
      >
        {path.name !== null ? (
          <span className="editableTd">
            {path.fuelBegin}
            <WrapIcon name="Create" color="green" size="16px" />
          </span>
        ) : null}
      </td>
      <td onDoubleClick={path.name !== null ? doubleClick('addFuel', path.addFuel) : null}>
        {path.name !== null ? (
          <span className="editableTd">
            {path.addFuel}
            <WrapIcon name="Create" color="green" size="16px" />
          </span>
        ) : (
          <span style={{ opacity: '0' }}>{'-'}</span>
        )}
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
`;
export default RowTD;
