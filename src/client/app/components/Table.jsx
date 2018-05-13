import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RowTD from './RowTD';
import RowTH from './RowTH';
import PaginationButton from '../components/PaginationButton';
import ChoisePaginationString from '../components/ChoisePaginationString';

export default class Table extends Component {
  handlerPagination = page => {
    const { handlerP } = this.props;
    handlerP(page);
  };
  handlerTable = name => {
    const { handlerTableSort } = this.props;
    handlerTableSort(name);
  };
  handlerSelect = select => () => {
      const { handlerTableSelect } = this.props;
      handlerTableSelect(select);
  };
  render() {
    const { page, stringOnPage, length, tempArr, reverse, name, choisePaginationString, error } = this.props;
    return <div className="pathListSelectedCar">
    <ChoisePaginationString handler={choisePaginationString}/>
        <table className="table">
          <thead>
            <RowTH handlerTable={this.handlerTable} reverse={reverse} name={name} />
          </thead>
          <tbody>
            {tempArr.map(path => {
            return <RowTD path={path} key={path.dateBegin} handler={this.handlerSelect} error={error} doubleClick={this.props.doubleClick} />;
            })}
          </tbody>
        </table>
        <PaginationButton length={length} page={page} stringOnPage={stringOnPage} handlerPagination={this.handlerPagination} />
      </div>;
  }
}
