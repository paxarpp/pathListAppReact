import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import fildNamePathList from './fildNamePathList';
import Icon from './Icon';
import { IPath, IError, ICar } from './interfaces';

interface IProps {
  path: IPath & ICar & IError;
  doubleClick: (name: string, vvalue: number) => void;
  error: IError[][];
};

class ViewPath extends PureComponent<IProps> {
  render() {
    const { path, doubleClick } = this.props;
    return path.name === null || path.name === undefined ? (
      <EmptyList />
    ) : (
      <View>
        <Head>{path.name}</Head>
        <Head_ext>{path.extension ? 'с прицепом' : ''}</Head_ext>
        <p>
          {fildNamePathList['fuel']}: {path.fuel}
        </p>
        <p>
          {fildNamePathList['constFuelChange']}: {path.constFuelChange} л
        </p>
        <p>
          {fildNamePathList['dateBegin']}:{' '}
          {new Date(path.dateBegin).toLocaleDateString()}
        </p>
        <Paragraph error={path.first && path.errorPath}>
          <span>
            {fildNamePathList['pathBegin']}: {path.pathBegin} км
            <WrapIcon
              name="Create"
              color="green"
              size="16px"
              onClick={doubleClick('pathBegin', path.pathBegin)}
            />
          </span>
        </Paragraph>
        <Paragraph error={path.last && path.errorPath}>
          <span>
            {fildNamePathList['pathEnd']}: {path.pathEnd} км
            <WrapIcon
              name="Create"
              color="green"
              size="16px"
              onClick={doubleClick('pathEnd', path.pathEnd)}
            />
          </span>
        </Paragraph>
        <p>
          {fildNamePathList['milleage']}: {path.milleage} км
        </p>
        <Paragraph error={path.first && path.errorFuel}>
          <span>
            {fildNamePathList['fuelBegin']}: {path.fuelBegin} л
            <WrapIcon
              name="Create"
              color="green"
              size="16px"
              onClick={doubleClick('fuelBegin', path.fuelBegin)}
            />
          </span>
        </Paragraph>
        <p>
          <span>
            {fildNamePathList['addFuel']}: {path.addFuel} л
            <WrapIcon
              name="Create"
              color="green"
              size="16px"
              onClick={doubleClick('addFuel', path.addFuel)}
            />
          </span>
        </p>
        <p>
          {fildNamePathList['deltaFuel']}: {path.deltaFuel} л
        </p>
        <Paragraph error={path.last && path.errorFuel}>
          {fildNamePathList['fuelEnd']}: {path.fuelEnd} л
        </Paragraph>
      </View>
    );
  }
}

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
const WrapIcon = styled(Icon)`
  margin-left: 2rem;
  transition: transform 0.2s linear;
  :hover {
    transform: scale(1.1);
  }
`;
const isError = ({ error }) =>
  error &&
  css`
    color: red;
    font-weight: 600;
    text-align: center;
  `;
const Paragraph = styled.p`
  ${isError};
`;

export default ViewPath;
