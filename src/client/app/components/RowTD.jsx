import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

import createObjectError from './createObjectError';
import Icon from './Icon';

const RowTD = ({ path, handler, error, doubleClick, deletePath, selectPath }) => {
  const matchNames = createObjectError(path, error);
  return (
    <WrapTr onClick={path.name !== null ? handler(path) : null} selected={selectPath.dateBegin === path.dateBegin}>
      {path.dateBegin === null ? <td /> : <td>{new Date(path.dateBegin).toLocaleDateString()}</td>}
      <td>{path.fuel}</td>
      <td>
        {path.constFuelChange}
        <SpanExtension>{path.extension === 'true' ? ' прицеп' : ''}</SpanExtension>
      </td>
      <td>
        {path.name !== null ? (
          <Fragment>
            <Span error={!matchNames.first && matchNames.path}>{path.pathBegin}</Span>
            <WrapIcon name="Create" color="green" size="16px" onClick={doubleClick('pathBegin', path.pathBegin)} />
          </Fragment>
        ) : null}
      </td>
      <td>
        {path.name !== null ? (
          <Fragment>
            <Span error={matchNames.first && matchNames.path}>{path.pathEnd}</Span>
            <WrapIcon name="Create" color="green" size="16px" onClick={doubleClick('pathEnd', path.pathEnd)} />
          </Fragment>
        ) : null}
      </td>
      <td>{path.milleage}</td>
      <td>
        {path.name !== null ? (
          <Fragment>
            <Span error={!matchNames.first && matchNames.fuel}>{path.fuelBegin}</Span>
            <WrapIcon name="Create" color="green" size="16px" onClick={doubleClick('fuelBegin', path.fuelBegin)} />
          </Fragment>
        ) : null}
      </td>
      <td>
        {path.name !== null ? (
          <span>
            {path.addFuel}
            <WrapIcon name="Create" color="green" size="16px" onClick={doubleClick('addFuel', path.addFuel)} />
          </span>
        ) : null}
      </td>
      <td>{path.deltaFuel}</td>
      <Td error={matchNames.first && matchNames.fuel}>{path.fuelEnd}</Td>
      <td>{path.name !== null ? <Icon name="Delete" color="red" onClick={deletePath(path)} /> : null}</td>
    </WrapTr>
  );
};
RowTD.propTypes = {
  path: PropTypes.object,
  handler: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.object),
  doubleClick: PropTypes.func,
  deletePath: PropTypes.func,
  selectPath: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
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
const WrapTr = styled.tr`
  background-color: ${props => props.selected && 'antiquewhite'};
`;
const SpanExtension = styled.span`
  font-size: 0.7rem;
  color: #920000;
`;
const tremor = keyframes`
  0%{
transform: translateX(0px);
  }
  33%{
    transform: translateX(3px);
  }
  66%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(-3px);
  }
`;
const isError = props =>
  props.error &&
  css`
    color: red;
    font-weight: 600;
    display: inline-block;
    animation: ${tremor} 0.3s linear infinite;
  `;
const Span = styled.span`
  ${isError};
`;
const Td = styled.td`
  color: ${props => props.error && 'red'};
`;

export default RowTD;
