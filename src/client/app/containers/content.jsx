import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateCar from '../components/CreateCar';
import CreatePath from '../components/CreatePath';
import TableContainer from './TableContainer';
import VeiwAndEditPathList from '../components/VeiwAndEditPathList';
import PopUpInput from '../components/PopUpInput';
import { loadLocalStorage } from '../actions/cars';
import { checkError, saveUpdateData } from '../actions/pathLists';

class Content extends Component {
  state = {
    coordX: null,
    coordY: null,
    field: null,
    value: null
  };
  doubleClick = (field, value) => event => {
    const coordX = event.clientX;
    const coordY = event.clientY;
    this.setState({
      coordX: coordX,
      coordY: coordY,
      field: field,
      value: value
    });
  };
  handlerConf = status => e => {
    if (status) {
      const { saveUpdate } = this.props;
      const { field, value } = this.state;
      const result = {
        [field]: value
      };
      saveUpdate(result);
      this.clearClick(e);
    } else {
      this.clearClick(e);
    }
  };
  clearClick = event => {
    event.preventDefault();
    this.setState({
      coordX: null,
      coordY: null,
      field: null,
      value: null
    });
  };
  onChange = e => {
    this.setState({
      value: Math.round(+e.currentTarget.value * 100) / 100
    });
  };
  componentDidMount() {
    const { load, chError } = this.props;
    load();
    chError();
  }
  render() {
    const { isNewCar, isNewPath, selectedCar, selectPathList, pathLists } = this.props;
    const { field } = this.state;
    return (
      <div className="container" onContextMenu={this.clearClick}>
        {isNewCar && <CreateCar />}
        {isNewPath && <CreatePath />}
        {selectPathList && <VeiwAndEditPathList selectPathList={selectPathList} doubleClick={this.doubleClick} />}
        <TableContainer
          className="pathListSelectedCar"
          doubleClick={this.doubleClick}
          pathLists={pathLists.filter(path => path.name === selectedCar)}
        />
        {field && (
          <PopUpInput
            coordX={this.state.coordX}
            coordy={this.state.coordY}
            onChange={this.onChange}
            handlerConf={this.handlerConf}
            value={this.state.value}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isNewCar: state.isNewCar,
    isNewPath: state.isNewPath,
    selectedCar: state.selectedCar,
    selectPathList: state.selectPathList,
    pathLists: state.pathLists
  };
};
const mapDispatchToProps = dispatch => {
  return {
    load: () => loadLocalStorage(dispatch),
    chError: () => checkError(dispatch),
    saveUpdate: result => saveUpdateData(dispatch, result)
  };
};
Content.propTypes = {
  isNewCar: PropTypes.bool,
  isNewPath: PropTypes.bool,
  selectedCar: PropTypes.string,
  pathLists: PropTypes.array,
  selectPathList: PropTypes.object,
  saveUpdate: PropTypes.func,
  load: PropTypes.func,
  chError: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);
