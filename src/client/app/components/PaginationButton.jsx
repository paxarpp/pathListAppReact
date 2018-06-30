import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Float } from './ButtonNew';

const PaginationButton = ({ handlerPagination, length, page, stringOnPage }) => {
  const pages = length % stringOnPage === 0 ? length / stringOnPage : Math.ceil(length / stringOnPage);
  return (
    <Wrapper>
      {page <= 1 ? null : (
        <Float small handlerClick={() => handlerPagination(1)}>
          1
        </Float>
      )}
      {page < 5 ? null : <span>...</span>}
      {page - 10 <= 1 ? null : (
        <Float small handlerClick={() => handlerPagination(page - 10)}>
          {page - 10}
        </Float>
      )}
      {page - 2 <= 1 ? null : (
        <Float small handlerClick={() => handlerPagination(page - 2)}>
          {page - 2}
        </Float>
      )}
      {page - 1 <= 1 ? null : (
        <Float small handlerClick={() => handlerPagination(page - 1)}>
          {page - 1}
        </Float>
      )}
      {pages <= 1 ? null : <FloatSelect handlerClick={() => handlerPagination(page)}>{page}</FloatSelect>}
      {page + 1 >= pages ? null : (
        <Float small handlerClick={() => handlerPagination(page + 1)}>
          {page + 1}
        </Float>
      )}
      {page + 2 >= pages ? null : (
        <Float small handlerClick={() => handlerPagination(page + 2)}>
          {page + 2}
        </Float>
      )}
      {page + 10 >= pages ? null : (
        <Float small handlerClick={() => handlerPagination(page + 10)}>
          {page + 10}
        </Float>
      )}
      {page > pages - 4 ? null : <span>...</span>}
      {page + 1 > pages ? null : (
        <Float small handlerClick={() => handlerPagination(pages)}>
          {pages}
        </Float>
      )}
    </Wrapper>
  );
};
PaginationButton.propTypes = {
  length: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  stringOnPage: PropTypes.number.isRequired,
  handlerPagination: PropTypes.func.isRequired
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
