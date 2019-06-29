import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ifNotDisabled, ifNotDisabledHover } from '../constants';

interface IProps {
  handlerClick?: (e: any) => void | null;
  children?: any;
  large?: boolean;
  second?: boolean;
  danger?: boolean;
  small?: boolean;
  disable?: boolean;
};
const ButtonMain = ({ children, handlerClick, disable, ...props }: IProps) => (
  <Main onClick={disable ? null : handlerClick} {...props} disable={disable}>
    {children}
  </Main>
);

const ripple = keyframes`
  0% {
    transform: scale(0, 0);
    opacity: 1;
  }
  20% {
    transform: scale(25, 25);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
}
`;
const large = css`
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  padding: 0 28px;
`;

const small = css`
  height: 32px;
  line-height: 32px;
  font-size: 13px;
  padding: 0 14px;
`;
const norm = css`
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  font-size: 14px;
`;

const Main = styled.button<IProps>`
  margin: 5px;
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 2px;
  display: inline-block;
  ${props => !props.large && !props.small && norm};
  ${props => props.large && large};
  ${props => props.small && small};
  text-transform: uppercase;
  vertical-align: middle;
  text-decoration: none;
  color: #fff;
  background-color: ${props =>
    props.danger ? '#ff5454' : props.second ? '#aaa' : props.disable ? '#e5e5e5' : '#26a69a'};
  text-align: center;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease-out;
  outline: none;
  ${ifNotDisabled};
  :hover {
    ${ifNotDisabledHover};
  }
  :after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  :focus:not(:active)::after {
    animation: ${props => !props.disable && ripple} 1s ease-out;
  }
`;

export default ButtonMain;
