import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { closeWindow } from '../actions/cars';
import Header from '../components/header';
import ViewPath from '../components/ViewPath';
import Icon from './Icon';
import { IPath, IError, ICar } from './interfaces';

interface IProps {
  close: (name: string) => void;
  selectPathList: IError & IPath & ICar;
  doubleClick: (name: string, vvalue: number) => () => void;
  error: IError[][];
};

const VeiwAndEditPathList = ({ selectPathList, error, close, doubleClick }: IProps) => (
  <PathListView>
    <Header>
      <HeaderText>Выбран путевой лист</HeaderText>
      <WrapIcon
        onClick={() => close('selectPathList')}
        name="Clear"
        color="red"
      />
    </Header>
    <ViewPath path={selectPathList} error={error} doubleClick={doubleClick} />
  </PathListView>
);

const mapStateToProps = state => {
  return {
    error: state.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    close: selectPathList => dispatch(closeWindow(selectPathList))
  };
};

const HeaderText = styled.h2`
  text-align: center;
`;
const PathListView = styled.div`
  padding: 0;
  box-shadow: 3px 3px 10px 1px grey;
  flex: 1;
  width: 320px;
  position: absolute;
  bottom: 50px;
  left: -320px;
  background-color: rgb(200, 200, 200);
`;
const WrapIcon = styled(Icon)`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VeiwAndEditPathList);
