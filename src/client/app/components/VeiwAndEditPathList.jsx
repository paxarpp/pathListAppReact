import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeWindow } from '../actions/cars.js';
import Button from '../components/Button';
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
      <div className="pathListView">
        <div className="header">
          <h3 className="headerText">Выбран путевой лист</h3>
          <Button handler={this.handleClose} styleButton="clear">
            {String.fromCharCode(8416)}
          </Button>
        </div>
        <ViewPath
          path={selectPathList}
          error={error}
          doubleClick={this.props.doubleClick}
        />
        <div className="footer" />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  VeiwAndEditPathList
);
