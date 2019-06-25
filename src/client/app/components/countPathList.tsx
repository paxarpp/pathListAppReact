import React from 'react';
import styled, { css } from 'styled-components';

interface IProps {
  count?: number;
  position?: string;
  text?: string;
}

interface IisPosition {
  position: string;
}

const Count = ({ count, position, text }: IProps) => (
  <CounterWrap position={position}>
    {text}
    <Span>{count}</Span>
  </CounterWrap>
);

const isPosition = (props: IisPosition)=>
  props.position === 'top'
    ? css`
        right: 96px;
        top: 60px;
      `
    : css`
        right: 10px;
        bottom: -30px;
      `;

const CounterWrap = styled.span`
  overflow: hidden;
  position: absolute;
  ${isPosition};
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

export default Count;
