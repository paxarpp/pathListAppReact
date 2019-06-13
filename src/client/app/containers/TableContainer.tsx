import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '../components/Table';
import paginationData from '../components/paginationData';
import prepareNullstringForTable from '../components/prepareNullstringForTable';
import {
  infoPathToName,
  deletePathToName,
  checkError
} from '../actions/pathLists';
import { IPath, IError } from '../components/interfaces';

interface IProps {
  error: IError[][];
  pathLists: IPath[];
  selectPathList: IPath | boolean | string;
  doubleClick: () => void;
  pathInfo: (path: IPath) => void;
  deletePath: (path: IPath) => void;
  chError: () => void;
}

interface IState {
  stringOnPage: number;
  page: number;
  pathListsCar: IPath[];
  reverse: boolean;
  name: string;
}

class TableContainer extends Component<IProps, IState> {
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
    const { pathListsCar } = this.state;
    const prevValue = pathListsCar.length === 0 ? null : pathListsCar[0].name;
    const newValue = pathLists.length === 0 ? null : pathLists[0].name;
    if (prevValue !== newValue || pathListsCar.length !== pathLists.length) {
      this.setState(prev => ({
        ...prev,
        pathListsCar: pathLists
      }));
    }
  }
  handlerTableSort = name => {
    if (name) {
      const { reverse, pathListsCar } = this.state;
      const _rev = reverse ? -1 : 1;

      this.setState({
        pathListsCar: pathListsCar.slice().sort(this._sorting(name, _rev)),
        reverse: !reverse,
        name
      });
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

  _sorting = (name, rev) => (a, b) => {
    if (b[name] > a[name]) {
      return 1 * rev;
    } else if (b[name] < a[name]) {
      return -1 * rev;
    } else {
      return 0;
    }
  };

  handlerTableSelect = path => () => {
    this.props.pathInfo(path);
  };

  hendlerPagination = page => {
    this.setState({ page });
  };

  render() {
    const { page, stringOnPage, pathListsCar, reverse, name } = this.state;
    const dataArr = prepareNullstringForTable(
      paginationData(page, stringOnPage, pathListsCar),
      stringOnPage
    );
    return dataArr.length === 0 ? null : (
      <Table
        error={this.props.error}
        name={name}
        reverse={reverse}
        page={page}
        stringOnPage={stringOnPage}
        length={pathListsCar.length}
        tempArr={dataArr}
        handlerPagination={this.hendlerPagination}
        handlerTableSort={this.handlerTableSort}
        handlerTableSelect={this.handlerTableSelect}
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
    pathInfo: path => dispatch(infoPathToName(path)),
    deletePath: name => dispatch(deletePathToName(name)),
    chError: () => dispatch(checkError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);
