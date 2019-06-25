import React from 'react';
import styled from 'styled-components';

interface IBase {
  children: any;
  active: boolean;
};
interface IProps extends IBase {
  handlerClick: () => void;
};
const ButtonFloat = ({ children, handlerClick, active, ...props }: IProps) => (
  <Main onClick={handlerClick} {...props} active={active}>
    {children}
  </Main>
);
const Main = styled.button<IBase>`
  position: relative;
  overflow: hidden;
  display: inline-block;
  color: ${props => (props.active ? 'white' : 'black')};
  overflow: hidden;
  z-index: 1;
  padding: 0;
  background-color: ${props => (props.active ? '#26a69a' : 'transparent')};
  border-radius: 50%;
  transition: background-color 0.3s;
  cursor: pointer;
  vertical-align: middle;
  border: none;
  outline: none;
  height: 40px;
  width: 40px;
  :hover {
    background-color: ${props => (props.active ? '#2bbbad' : 'transparent')};
  }
  :focus:active {
    background-color: ${props => !props.active && '#2bbbad'};
  }
`;

export default ButtonFloat;
