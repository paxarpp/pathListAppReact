import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { closeWindow } from '../actions/cars.js';
import Button from '../components/Button';
import Header from '../components/header';
import Footer from '../components/footer';
import ViewPath from '../components/ViewPath';

class VeiwAndEditPathList extends Component {
  handleClose = e => {
    const { close } = this.props;
    e.preventDefault();
    close('selectPathList');
  };
  render() {
    const { selectPathList, error } = this.props;
    return (
      <PathListView>
        <Header>
          <HeaderText>Выбран путевой лист</HeaderText>
          <Button handler={this.handleClose} styleButton="delit">
            {String.fromCharCode(10006)}
          </Button>
        </Header>
        <ViewPath path={selectPathList} error={error} doubleClick={this.props.doubleClick} />
        <Footer />
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
  selectPathList: PropTypes.func,
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
  bottom: 0;
  left: -320px;
  background-color: rgb(200, 200, 200);
`;
export default connect(mapStateToProps, mapDispatchToProps)(VeiwAndEditPathList);
