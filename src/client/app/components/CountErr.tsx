import React from 'react';
import styled from 'styled-components';

interface IProp {
  count: number;
}

const CountErr = ({ count }: IProp) =>
  count === 0 ? null : (
    <Wrap>
      <Span>{count}</Span>
    </Wrap>
  );

const Wrap = styled('span')`
  overflow: hidden;
  position: absolute;
  left: -18px;
  top: 0;
  color: red;
  font-size: 0.7rem;
  line-height: 2.5rem;
`;
const Span = styled('span')`
  text-align: center;
  padding: 4px 10px;
  border-radius: 50%;
  font-size: 1.5rem;
  background-color: rgba(202, 202, 202, 0.8);
`;

export default CountErr;
