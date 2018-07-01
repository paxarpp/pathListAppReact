import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const Add = ({ color = '#fff', size = 24 }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
  >
    <g id="Bounding_Boxes">
      <g id="ui_x5F_spec_x5F_header_copy_3" display="none" />
      <path fill="none" d="M0,0h24v24H0V0z" />
    </g>
    <g id="Sharp">
      <g id="ui_x5F_spec_x5F_header_copy_4" display="none" />
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
const large = `
  height: 56px;
  width: 56px;
`;
const small = `
  height: 32px;
  width: 32px;
`;
const norm = `
  height: 40px;
  width: 40px;
`;
const pulseStyle = `
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
  background-color: #26a69a;
  background-color: ${props => props.danger && '#ff5454'};
  background-color: ${props => props.second && '#aaa'};
  background-color: ${props => props.disable && '#e5e5e5'};
  border-radius: 50%;
  transition: background-color 0.3s;
  cursor: ${props => !props.disable && 'pointer'};
  vertical-align: middle;
  border: none;
  outline: none;
  ${props => !props.large && !props.small && norm};
  ${props => props.large && large};
  ${props => props.small && small};
  ${props =>
    !props.disable &&
    'box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)'};
  :hover {
    ${props => !props.disable && 'background-color:'} ${props =>
      (props.danger && 'red') || (props.second && '#aab') || '#2bbbad'};
    ${props =>
      !props.disable &&
      'box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2)'};
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
