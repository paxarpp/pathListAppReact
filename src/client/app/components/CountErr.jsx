import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CountErr = ({ count }) =>
  count === 0 ? null : (
    <Wrap>
      <Span>{count}</Span>
    </Wrap>
  );
CountErr.propTypes = {
  count: PropTypes.number
};
const Wrap = styled.span`
  overflow: hidden;
  position: absolute;
  left: -18px;
  top: 0;
  color: red;
  font-size: 0.7rem;
  line-height: 2.5rem;
`;
const Span = styled.span`
  text-align: center;
  padding: 4px 10px;
  border-radius: 50%;
  font-size: 1.5rem;
  background-color: rgba(202, 202, 202, 0.8);
`;
export default CountErr;
