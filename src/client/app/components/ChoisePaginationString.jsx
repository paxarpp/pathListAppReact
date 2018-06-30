import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ChoisePaginationString = ({ handler }) => (
  <Wrap>
    <select defaultValue={22} onChange={handler}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={22}>22</option>
      <option value={40}>40</option>
    </select>
  </Wrap>
);
ChoisePaginationString.propTypes = {
  handler: PropTypes.func.isRequired
};
const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  select {
    background-color: #00000000;
  }
`;

export default ChoisePaginationString;
