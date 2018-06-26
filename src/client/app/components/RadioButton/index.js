import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RadioButton = ({ children, name, ...props }) => (
  <Label>
    <Input {...props} type="radio" name={name} />
    <Span>{children}</Span>
  </Label>
);

RadioButton.propTypes = {
  children: PropTypes.string,
  name: PropTypes.string.isRequired
};
const Label = styled.label`
  font-size: 0.8rem;
  color: #9e9e9e;
`;
const Input = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  box-sizing: border-box;
  padding: 0;
  :checked + span:after {
    border: 2px solid #26a69a;
  }
  :not(:checked) + span:after {
    transform: scale(0);
  }
  :checked + span:after,
  :checked + span:before {
    background-color: ${props => !props.gap && '#26a69a'};
    transform: scale(1.02);
    border-radius: 50%;
  }
  :not(:checked) + span:before,
  :not(:checked) + span:after {
    border: 2px solid #5a5a5a;
  }
  :checked + span:before {
    border: ${props => (props.gap ? '2px solid #26a69a' : '2px solid transparent')};
  }
  :checked + span:after {
    background-color: ${props => props.gap && '#26a69a'};
    transform: ${props => (props.gap ? 'scale(0.5)' : 'scale(1.02)')};
  }
  :disabled:not(:checked) + span:before,
  :disabled:checked + span:before {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.42);
  }
  :disabled + span {
    color: rgba(0, 0, 0, 0.42);
  }
  :disabled:checked + span:after {
    background-color: rgba(0, 0, 0, 0.42);
    border-color: #949494;
    ${props => props.gap && 'border: none'};
  }
  :disabled:checked + span:before {
    border: ${props => props.gap && '2px solid rgba(0, 0, 0, 0.42)'};
  }
`;
const Span = styled.span`
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  font-size: 1rem;
  transition: 0.28s ease;
  user-select: none;
  :before,
  :after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    margin: 4px;
    width: 16px;
    height: 16px;
    z-index: 0;
    transition: 0.28s ease;
    border-radius: 50%;
    box-sizing: border-box;
  }
`;

export default RadioButton;
