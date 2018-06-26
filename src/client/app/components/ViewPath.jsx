import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import fildNamePathList from './fildNamePathList';
import createObjectError from './createObjectError';
import Icon from './Icon';

class ViewPath extends PureComponent {
  render() {
    const { path, error, doubleClick } = this.props;
    const matchNames = createObjectError(path, error);
    return path.name === null || path.name === undefined ? (
      <EmptyList />
    ) : (
      <View>
        <Head>{path.name}</Head>
        <Head_ext>{path.extension === 'true' ? 'с прицепом' : ''}</Head_ext>
        <p>
          {fildNamePathList['fuel']}: {path.fuel}
        </p>
        <p>
          {fildNamePathList['constFuelChange']}: {path.constFuelChange} л
        </p>
        <p>
          {fildNamePathList['dateBegin']}: {new Date(path.dateBegin).toLocaleDateString()}
        </p>
        <p
          onDoubleClick={doubleClick('pathBegin', path.pathBegin)}
          className={!matchNames.first && matchNames.path ? 'inputError' : null}
        >
          <span className="editable">
            {fildNamePathList['pathBegin']}: {path.pathBegin} км
            <Icon name="Create" color="green" size="16px" />
          </span>
        </p>
        <p
          onDoubleClick={doubleClick('pathEnd', path.pathEnd)}
          className={matchNames.first && matchNames.path ? 'inputError' : null}
        >
          <span className="editable">
            {fildNamePathList['pathEnd']}: {path.pathEnd} км
            <Icon name="Create" color="green" size="16px" />
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
            <Icon name="Create" color="green" size="16px" />
          </span>
        </p>
        <p onDoubleClick={doubleClick('addFuel', path.addFuel)}>
          <span className="editable">
            {fildNamePathList['addFuel']}: {path.addFuel} л
            <Icon name="Create" color="green" size="16px" />
          </span>
        </p>
        <p>
          {fildNamePathList['deltaFuel']}: {path.deltaFuel} л
        </p>
        <p className={matchNames.first && matchNames.fuel ? 'inputError' : null}>
          {fildNamePathList['fuelEnd']}: {path.fuelEnd} л
        </p>
      </View>
    );
  }
}
ViewPath.propTypes = {
  path: PropTypes.object,
  doubleClick: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.object)
};
const View = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  padding: 0 2px;
  position: relative;
  p {
    margin: 0 0 5px 5px;
  }
`;
const Head_ext = styled.h6`
  position: absolute;
  top: -15%;
  left: 2%;
  color: #a30000;
  font-size: 1rem;
`;
const EmptyList = styled.div`
  height: 21.2rem;
`;
const Head = styled.h4`
  margin: 0 0 5px 5px;
`;
export default ViewPath;
