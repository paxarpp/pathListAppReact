import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../components/Table';
import paginationData from '../components/paginationData';
import prepareNullstringForTable from '../components/prepareNullstringForTable';
import { infoPathToName, deletePathToName, checkError } from '../actions/pathLists.js';
class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stringOnPage: 22,
      page: 1,
      pathListsCar: this.props.pathLists,
      reverse: false,
      name: ''
    };
  }
  UNSAFE_componentWillReceiveProps({ pathLists }) {
    const prevValue = this.state.pathListsCar.length === 0 ? null : this.state.pathListsCar[0].name;
    const newValue = pathLists.length === 0 ? null : pathLists[0].name;
    if (prevValue !== newValue || this.state.pathListsCar.length !== pathLists.length) {
      this.setState(prev => ({
        ...prev,
        pathListsCar: pathLists
      }));
    }
  }
  handlerTableSort = name => {
    if (name) {
      const { reverse } = this.state;
      if (reverse) {
        const { pathListsCar } = this.state;
        this.setState({
          pathListsCar: pathListsCar.slice().sort((a, b) => {
            if (b[name] > a[name]) {
              return 1;
            } else if (b[name] < a[name]) {
              return -1;
            } else {
              return 0;
            }
          }),
          reverse: !reverse,
          name
        });
      } else {
        const { pathListsCar } = this.state;
        this.setState({
          pathListsCar: pathListsCar.slice().sort((a, b) => {
            if (b[name] > a[name]) {
              return -1;
            } else if (b[name] < a[name]) {
              return 1;
            } else {
              return 0;
            }
          }),
          reverse: !reverse,
          name
        });
      }
    }
  };
  choisePaginationString = e => {
    const value = e.currentTarget.value;
    this.setState({
      stringOnPage: +value
    });
  };
  deletePath = path => () => {
    const { deletePath, chError } = this.props;
    deletePath(path);
    chError();
  };
  render() {
    const { page, stringOnPage, pathListsCar, reverse, name } = this.state;
    const dataArr = prepareNullstringForTable(paginationData(page, stringOnPage, pathListsCar), stringOnPage);
    return dataArr.length === 0 ? null : (
      <Table
        error={this.props.error}
        name={name}
        reverse={reverse}
        page={page}
        stringOnPage={stringOnPage}
        length={pathListsCar.length}
        tempArr={dataArr}
        handlerPagination={page => {
          this.setState({ page });
        }}
        handlerTableSort={this.handlerTableSort}
        handlerTableSelect={path => () => this.props.pathInfo(path)}
        choisePaginationString={this.choisePaginationString}
        doubleClick={this.props.doubleClick}
        deletePath={this.deletePath}
        pathLists={this.props.pathLists}
        selectPath={this.props.selectPathList}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.error,
    selectPathList: state.selectPathList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    pathInfo: path => infoPathToName(dispatch, path),
    deletePath: name => deletePathToName(dispatch, name),
    chError: () => checkError(dispatch)
  };
};
TableContainer.propTypes = {
  error: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.object,
        first: PropTypes.bool,
        last: PropTypes.bool,
        errorPath: PropTypes.bool,
        errorFuel: PropTypes.bool
      })
    )
  ),
  pathLists: PropTypes.array,
  selectPathList: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  doubleClick: PropTypes.func,
  pathInfo: PropTypes.func,
  deletePath: PropTypes.func,
  chError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
