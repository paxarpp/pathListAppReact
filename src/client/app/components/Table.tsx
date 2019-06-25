import React from 'react';
import styled from 'styled-components';
import RowTD from './RowTD';
import RowTH from './RowTH';
import PaginationButton from '../components/PaginationButton';
import ChoisePaginationString from '../components/ChoisePaginationString';
import Count from '../components/countPathList';
import { IPath, IError, ICar } from './interfaces'

interface IProps {
  error: IError[][];
  page: number;
  stringOnPage: number;
  length: number;
  tempArr: any[];
  reverse: boolean;
  name: string;
  choisePaginationString: (e: any) => void;
  handlerTableSelect: (p: IPath) => () => void;
  handlerTableSort: (name: any) => void;
  handlerPagination: (page: number) => void;
  deletePath: (p: IPath) => () => void;
  pathLists: IPath[];
  selectPath: IPath;
  doubleClick: () => void;
};

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
}: IProps) => (
  <WrapperPathListSelectedCar>
    <ChoisePaginationString handler={choisePaginationString} />
    <WrapTable>
      <thead>
        <RowTH handlerTable={handlerTableSort} reverse={reverse} name={name} />
      </thead>
      <tbody>
        {(tempArr as (IPath & IError& ICar)[]).map((path, indx) => (
          <RowTD
            path={path}
            key={path.dateBegin + indx}
            handler={handlerTableSelect}
            doubleClick={doubleClick}
            deletePath={deletePath}
            selectPath={selectPath}
          />
        ))}
      </tbody>
    </WrapTable>
    <PaginationButton
      length={length}
      page={page}
      stringOnPage={stringOnPage}
      handlerPagination={handlerPagination}
    />
    {pathLists.length ? (
      <Count count={pathLists.length} position="bottom" />
    ) : null}
  </WrapperPathListSelectedCar>
);

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
