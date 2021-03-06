import React from 'react';
import styled from 'styled-components';
import { Float } from './ButtonNew';

interface IProps {
  length: number;
  page: number;
  stringOnPage: number;
  handlerPagination: (page: number) => void;
}

const pageButton = (handler: (pageNumber: number) => void, pageNumber: number) => {
  return (
    <Float small handlerClick={() => handler(pageNumber)}>
      {pageNumber}
    </Float>
  );
};

const PaginationButton = ({ handlerPagination, length, page, stringOnPage }: IProps) => {
  const pages = length % stringOnPage === 0 ? length / stringOnPage : Math.ceil(length / stringOnPage);
  return (
    <Wrapper>
      {page <= 1 ? null : pageButton(handlerPagination, 1)}
      {page < 5 ? null : <span>...</span>}
      {page - 10 <= 1 ? null : pageButton(handlerPagination, page - 10)}
      {page - 2 <= 1 ? null : pageButton(handlerPagination, page - 2)}
      {page - 1 <= 1 ? null : pageButton(handlerPagination, page - 1)}
      {pages <= 1 ? null : <FloatSelect handlerClick={() => handlerPagination(page)}>{page}</FloatSelect>}
      {page + 1 >= pages ? null : pageButton(handlerPagination, page + 1)}
      {page + 2 >= pages ? null : pageButton(handlerPagination, page + 2)}
      {page + 10 >= pages ? null : pageButton(handlerPagination, page + 10)}
      {page > pages - 4 ? null : <span>...</span>}
      {page + 1 > pages ? null : pageButton(handlerPagination, pages)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

const FloatSelect = styled(Float)`
  font-weight: 600;
`;

export default PaginationButton;
