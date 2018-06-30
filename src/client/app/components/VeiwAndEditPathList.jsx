import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { closeWindow } from '../actions/cars.js';
import Header from '../components/header';
import ViewPath from '../components/ViewPath';
import Icon from './Icon';

class VeiwAndEditPathList extends Component {
  render() {
    const { selectPathList, error } = this.props;
    return (
      <PathListView>
        <Header>
          <HeaderText>Выбран путевой лист</HeaderText>
          <WrapIcon onClick={() => this.props.close('selectPathList')} name="Clear" color="red" />
        </Header>
        <ViewPath path={selectPathList} error={error} doubleClick={this.props.doubleClick} />
      </PathListView>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    close: selectPathList => closeWindow(dispatch, selectPathList)
  };
};
VeiwAndEditPathList.propTypes = {
  close: PropTypes.func,
  selectPathList: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  doubleClick: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.object)
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
export default connect(mapStateToProps, mapDispatchToProps)(VeiwAndEditPathList);
