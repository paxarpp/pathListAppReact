import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createSelector } from 'reselect';
import CreateCar from '../components/CreateCar';
import CreatePath from '../components/CreatePath';
import TableContainer from './TableContainer';
import VeiwAndEditPathList from '../components/VeiwAndEditPathList';
import PopUpInput from '../components/PopUpInput';
import { initLoad } from '../actions/cars';
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
      coordX,
      coordY,
      field,
      value
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
    }
    this.clearClick(e);
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
    const value = Math.round(+e.currentTarget.value * 100) / 100;
    this.setState({ value });
  };

  componentDidMount() {
    const { load, chError } = this.props;
    load();
    chError();
  }

  render() {
    const { isNewCar, isNewPath, selectPathList, pathLists } = this.props;
    const { field } = this.state;
    return (
      <Container onContextMenu={this.clearClick}>
        {isNewCar && <CreateCar />}
        {isNewPath && <CreatePath />}
        {selectPathList && (
          <VeiwAndEditPathList
            selectPathList={selectPathList}
            doubleClick={this.doubleClick}
          />
        )}
        <TableContainer doubleClick={this.doubleClick} pathLists={pathLists} />
        {field && (
          <PopUpInput
            coordX={this.state.coordX}
            coordy={this.state.coordY}
            onChange={this.onChange}
            handlerConf={this.handlerConf}
            value={this.state.value}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const pathList = state => state.pathLists;
  const selectedCar = state => state.selectedCar;
  const pathLists = createSelector(
    pathList,
    selectedCar,
    (list, car) => (list[car] ? list[car] : [])
  );
  return {
    isNewCar: state.isNewCar,
    isNewPath: state.isNewPath,
    selectPathList: state.selectPathList,
    pathLists: pathLists(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(initLoad()),
    chError: () => dispatch(checkError()),
    saveUpdate: result => {
      dispatch(saveUpdateData(result));
      dispatch(checkError());
    }
  };
};

Content.propTypes = {
  isNewCar: PropTypes.bool,
  isNewPath: PropTypes.bool,
  selectedCar: PropTypes.array,
  pathLists: PropTypes.array,
  selectPathList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object
  ]),
  saveUpdate: PropTypes.func,
  load: PropTypes.func,
  chError: PropTypes.func
};
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row wrap;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
