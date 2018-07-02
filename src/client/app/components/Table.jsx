import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RowTD from './RowTD';
import RowTH from './RowTH';
import PaginationButton from '../components/PaginationButton';
import ChoisePaginationString from '../components/ChoisePaginationString';
import Count from '../components/countPathList';

const Table = ({
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
  selectPath,
  doubleClick
}) => (
  <WrapperPathListSelectedCar>
    <ChoisePaginationString handler={choisePaginationString} />
    <WrapTable>
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
              doubleClick={doubleClick}
              deletePath={deletePath}
              selectPath={selectPath}
            />
          );
        })}
      </tbody>
    </WrapTable>
    <PaginationButton length={length} page={page} stringOnPage={stringOnPage} handlerPagination={handlerPagination} />
    {pathLists.length ? <Count count={pathLists.length} position="bottom" /> : null}
  </WrapperPathListSelectedCar>
);
Table.propTypes = {
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
  selectPath: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  doubleClick: PropTypes.func
};
const WrapperPathListSelectedCar = styled.div`
  position: relative;
  z-index: 0;
`;
const WrapTable = styled.table`
  border: 1px solid grey;
  border-collapse: collapse;
  tr > td:first-child {
    border-left: 1px solid #fff;
  }
  tr > td:last-child {
    border-left: none;
  }
  tr > td:nth-last-child(2) {
    border-right: none;
  }
  thead > tr {
    background-color: #2bbbad7a;
    height: 82px;
  }
  tbody > tr {
    height: 34px;
    transition: all 0.3s linear;
  }
  tbody > tr:hover {
    background-color: #2bbbad7a;
  }
  th,
  td {
    border: 1px solid grey;
    text-align: center;
    position: relative;
  }
  th {
    cursor: pointer;
    position: relative;
  }
`;
export default Table;
