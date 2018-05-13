import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Path from './Path.jsx';
import Button from '../components/Button';
import PaginationButton from '../components/PaginationButton';
import paginationData from '../components/paginationData';
import ChoisePaginationString from '../components/ChoisePaginationString';

export default class PathList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stringOnPage: 10,
      page: 1
    };
  }
  handlerPagination = page => {
    this.setState({
      page: page
    });
  };
  choisePaginationString = e => {
    const value = e.currentTarget.value;
    this.setState({
      stringOnPage: +value
    });
  };
  render() {
    const { pathLists, selectedCar, error } = this.props;
    const { page, stringOnPage } = this.state;
    const dataArr = paginationData(page, stringOnPage, pathLists);
    return (
      <div className="pathList">
        <ChoisePaginationString handler={this.choisePaginationString} />
        <ul>
          <ReactCSSTransitionGroup
            transitionName="anim"
            transitionAppear={false}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            transitionEnter={true}
            transitionLeave={true}
          >
            {dataArr.map(path => {
              return (
                <li
                  key={path.name + path.dateBegin}
                  className={
                    error.filter(
                      elem =>
                        elem.name === path.name &&
                        elem.dateBegin === path.dateBegin
                    ).length > 0
                      ? 'inputError'
                      : null
                  }
                >
                  <Path
                    selectedCar={selectedCar}
                    path={path}
                    handler={this.props.pathInfo(path)}
                  />
                  <Button
                    handler={this.props.deletePathHandler(path)}
                    styleButton="delit"
                  >
                    {String.fromCharCode(10006)}
                  </Button>
                </li>
              );
            })}
          </ReactCSSTransitionGroup>
        </ul>
        <PaginationButton
          length={pathLists.length}
          page={page}
          stringOnPage={stringOnPage}
          handlerPagination={this.handlerPagination}
        />
      </div>
    );
  }
}
