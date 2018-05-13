import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RowTD from './RowTD';
import RowTH from './RowTH';
import PaginationButton from '../components/PaginationButton';
import ChoisePaginationString from '../components/ChoisePaginationString';

export default class Table extends Component {
  render() {
    const { page, stringOnPage, length, tempArr, reverse, name, choisePaginationString, error, handlerTableSelect, handlerTableSort, handlerPagination } = this.props;
    return <div className="pathListSelectedCar">
    <ChoisePaginationString handler={choisePaginationString}/>
        <table className="table">
          <thead>
          <RowTH handlerTable={handlerTableSort} reverse={reverse} name={name} />
          </thead>
          <tbody>
            {tempArr.map((path, indx) => {
            return <RowTD path={path} key={path.dateBegin + indx} handler={handlerTableSelect} error={error} doubleClick={this.props.doubleClick} />;
            })}
          </tbody>
        </table>
        <PaginationButton length={length} page={page} stringOnPage={stringOnPage} handlerPagination={handlerPagination} />
      </div>;
  }
}
