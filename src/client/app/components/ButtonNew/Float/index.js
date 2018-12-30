import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { ifNotDisabled, ifNotDisabledHover } from '../constants';

const Add = ({ color = '#fff', size = 24 }) => (
  <svg x="0px" y="0px" width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <g>
      <path fill="none" d="M0,0h24v24H0V0z" />
    </g>
    <g>
      <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
    </g>
  </svg>
);

const ButtonFloat = ({ children, handlerClick, disable, ...props }) => (
  <Main onClick={disable ? null : handlerClick} {...props} disable={disable}>
    {children ? children : <Add />}
  </Main>
);

Add.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ButtonFloat.propTypes = {
  handlerClick: PropTypes.func,
  children: PropTypes.any,
  large: PropTypes.bool,
  second: PropTypes.bool,
  danger: PropTypes.bool,
  pulse: PropTypes.bool,
  small: PropTypes.bool,
  disable: PropTypes.bool
};

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 0;
    -webkit-transform: scale(1.5);
            transform: scale(1.5);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.5);
            transform: scale(1.5);
  }
`;

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
  height: 56px;
  width: 56px;
`;

const small = css`
  height: 32px;
  width: 32px;
`;

const norm = css`
  height: 40px;
  width: 40px;
`;

const pulseStyle = css`
  overflow: visible;
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: inherit;
    border-radius: inherit;
    -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
    transition: opacity 0.3s, -webkit-transform 0.3s;
    transition: opacity 0.3s, transform 0.3s;
    transition: opacity 0.3s, transform 0.3s, -webkit-transform 0.3s;
    animation: ${pulseAnimation} 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;
    z-index: -1;
  }
`;

const Main = styled.button`
  position: relative;
  overflow: hidden;
  display: inline-block;
  color: #fff;
  overflow: hidden;
  z-index: 1;
  padding: 0;
  background-color: ${props =>
    props.danger ? '#ff5454' : props.second ? '#aaa' : props.disable ? '#e5e5e5' : '#26a69a'};
  border-radius: 50%;
  transition: background-color 0.3s;
  vertical-align: middle;
  border: none;
  outline: none;
  ${props => !props.large && !props.small && norm};
  ${props => props.large && large};
  ${props => props.small && small};
  ${ifNotDisabled};
  :hover {
    ${ifNotDisabledHover};
  }
  ${props => props.pulse && pulseStyle};
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

export default ButtonFloat;
