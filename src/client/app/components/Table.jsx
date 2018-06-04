import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RowTD from './RowTD';
import RowTH from './RowTH';
import PaginationButton from '../components/PaginationButton';
import ChoisePaginationString from '../components/ChoisePaginationString';
import Count from '../components/countPathList';

export default class Table extends Component {
  render() {
    const {
      page,
      stringOnPage,
      length,
      tempArr,
      reverse,
      name,
      choisePaginationString,
      error,
      handlerTableSelect,
      handlerTableSort,
      handlerPagination,
      deletePath,
      pathLists,
      selectPath
    } = this.props;
    return (
      <div className="pathListSelectedCar">
        <ChoisePaginationString handler={choisePaginationString} />
        <table className="table">
          <thead>
            <RowTH handlerTable={handlerTableSort} reverse={reverse} name={name} />
          </thead>
          <tbody>
            {tempArr.map((path, indx) => {
              return (
                <RowTD
                  path={path}
                  key={path.dateBegin + indx}
                  handler={handlerTableSelect}
                  error={error}
                  doubleClick={this.props.doubleClick}
                  deletePath={deletePath}
                  selectPath={selectPath}
                />
              );
            })}
          </tbody>
        </table>
        <PaginationButton
          length={length}
          page={page}
          stringOnPage={stringOnPage}
          handlerPagination={handlerPagination}
        />
        {pathLists.length ? <Count count={pathLists.length} position="top" /> : null}
        {error.length ? <Count text={'ошибок: '} count={error.length / 2} position="bottom" /> : null}
      </div>
    );
  }
}
Table.propTypes = {
  error: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
  stringOnPage: PropTypes.number,
  length: PropTypes.number,
  tempArr: PropTypes.array,
  reverse: PropTypes.bool,
  name: PropTypes.string,
  choisePaginationString: PropTypes.func,
  handlerTableSelect: PropTypes.func,
  handlerTableSort: PropTypes.func,
  handlerPagination: PropTypes.func,
  deletePath: PropTypes.func,
  pathLists: PropTypes.arrayOf(PropTypes.object),
  selectPath: PropTypes.func,
  doubleClick: PropTypes.func
};
