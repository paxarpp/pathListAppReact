import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Table from "../components/Table";
import paginationData from "../components/paginationData";
import { infoPathToName } from "../actions/pathLists.js";
class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stringOnPage: 10,
      page: 1,
      pathListsCar: this.props.pathLists,
      reverse: false,
      name: ""
    };
  }
  handlerPagination = page => {
    this.setState({ page });
  };
  handlerTableSelect = select => {
      const { pathInfo } = this.props;
      pathInfo(select);
  };
  componentWillReceiveProps({ pathLists }) {
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
            } else return 0;
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
            } else return 0;
          }),
          reverse: !reverse,
          name
        });
      }
    }
  };
  choisePaginationString = (e) => {
    const value = e.currentTarget.value;
    this.setState({
        stringOnPage: +value,
    })
  }
  render() {
    const { page, stringOnPage, pathListsCar, reverse, name } = this.state;
    const dataArr = paginationData(page, stringOnPage, pathListsCar);
    return (
        dataArr.length === 0 ? null :
        <Table
        error={this.props.error}
        name={name}
        reverse={reverse}
        page={page}
        stringOnPage={stringOnPage}
        length={pathListsCar.length}
        tempArr={dataArr}
        handlerP={this.handlerPagination}
        handlerTableSort={this.handlerTableSort}
        handlerTableSelect={this.handlerTableSelect}
        choisePaginationString={this.choisePaginationString}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
      error: state.error,
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        pathInfo: (path) => infoPathToName(dispatch, path),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);