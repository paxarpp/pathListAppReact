import React from 'react';
import PropTypes from 'prop-types';

import createObjectError from './createObjectError';
import Button from '../components/Button';

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
        {path.name !== null ? <span className="editableTd">{path.pathBegin}</span> : null}
      </td>
      <td
        className={matchNames.first && matchNames.path ? 'inputError' : null}
        onDoubleClick={path.name !== null ? doubleClick('pathEnd', path.pathEnd) : null}
      >
        {path.name !== null ? <span className="editableTd">{path.pathEnd}</span> : null}
      </td>
      <td>{path.milleage}</td>
      <td
        className={!matchNames.first && matchNames.fuel ? 'inputError' : null}
        onDoubleClick={path.name !== null ? doubleClick('fuelBegin', path.fuelBegin) : null}
      >
        {path.name !== null ? <span className="editableTd">{path.fuelBegin}</span> : null}
      </td>
      <td onDoubleClick={path.name !== null ? doubleClick('addFuel', path.addFuel) : null}>
        {path.name !== null ? (
          <span className="editableTd">{path.addFuel}</span>
        ) : (
          <span style={{ opacity: '0' }}>{'-'}</span>
        )}
      </td>
      <td>{path.deltaFuel}</td>
      <td className={matchNames.first && matchNames.fuel ? 'inputError' : null}>{path.fuelEnd}</td>
      <td>
        {path.name !== null ? (
          <Button handler={deletePath(path)} styleButton="delit">
            {String.fromCharCode(10006)}
          </Button>
        ) : null}
      </td>
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
export default RowTD;
