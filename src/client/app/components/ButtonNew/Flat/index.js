import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

const Flat = ({ children, handlerClick, disable, ...props }) => (
  <Main onClick={disable ? null : handlerClick} {...props} disable={disable}>
    {children}
  </Main>
);

Flat.propTypes = {
  handlerClick: PropTypes.func || PropTypes.bool,
  children: PropTypes.any,
  large: PropTypes.bool,
  second: PropTypes.bool,
  danger: PropTypes.bool,
  small: PropTypes.bool,
  disable: PropTypes.bool
};
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
const disabledBtn = css`
  pointer-events: none;
  background-color: #dfdfdf !important;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #9f9f9f !important;
  cursor: default;
`;
const Main = styled.button`
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
  -webkit-tap-highlight-color: transparent;
  color: #343434;
  background-color: transparent;
  text-align: center;
  letter-spacing: 0.5px;
  cursor: ${props => !props.disable && 'pointer'};
  outline: none;
  ${props => props.disable && disabledBtn};
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
    animation: ${props => (!props.disable && props.danger ? rippleRed : props.second ? rippleSec : ripple)} 1s ease-out;
  }
`;

export default Flat;
