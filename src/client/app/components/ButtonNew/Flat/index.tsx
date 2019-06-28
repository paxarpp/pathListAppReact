import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface IProps {
  handlerClick?: (setupDate: any) => void;
  children?: any;
  large?: boolean;
  second?: boolean;
  danger?: boolean;
  small?: boolean;
  disable?: boolean;
}

const Flat = ({ children, handlerClick, disable, ...props }: IProps) => (
  <Main onClick={disable ? null : handlerClick} {...props} disable={disable}>
    {children}
  </Main>
);

const ripple = keyframes`
  0% {
    background-color: #2bbbad;
    transform: scale(0, 0);
    opacity: 1;
  }
  20% {
    transform: scale(25, 25);
    opacity: 1;
  }
  100% {
    background-color: #2bbbad;
    opacity: 0;
    transform: scale(40, 40);
  }
}
`;
const rippleRed = keyframes`
  0% {
    background-color: red;
    transform: scale(0, 0);
    opacity: 1;
  }
  20% {
    transform: scale(25, 25);
    opacity: 1;
  }
  100% {
    background-color: red;
    opacity: 0;
    transform: scale(40, 40);
  }
}
`;
const rippleSec = keyframes`
  0% {
    background-color: #aab;
    transform: scale(0, 0);
    opacity: 1;
  }
  20% {
    transform: scale(25, 25);
    opacity: 1;
  }
  100% {
    background-color: #aab;
    opacity: 0;
    transform: scale(40, 40);
  }
}
`;
const largeStyle = css`
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  padding: 0 28px;
`;

const smallStyle = css`
  height: 32px;
  line-height: 32px;
  font-size: 13px;
  padding: 0 14px;
`;
const normStyle = css`
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  font-size: 14px;
`;
const disabledBtn = css`
  pointer-events: none;
  background-color: #dfdfdf !important;
  box-shadow: none;
  color: #9f9f9f !important;
  cursor: default;
`;
const Main = styled.button<IProps>`
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 2px;
  display: inline-block;
  ${({ large, small }) => !large && !small && normStyle};
  ${({ large }) => large && largeStyle};
  ${({ small }) => small && smallStyle};
  text-transform: uppercase;
  vertical-align: middle;
  color: #343434;
  background-color: transparent;
  text-align: center;
  letter-spacing: 0.5px;
  cursor: ${({ disable }) => !disable && 'pointer'};
  outline: none;
  ${({ disable }) => disable && disabledBtn};
  :after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  :focus:not(:active)::after {
    animation: ${({ disable, danger, second }) =>
        !disable && danger
          ? rippleRed
          : second
          ? rippleSec
          : ripple}
      1s ease-out;
  }
`;

export default Flat;
