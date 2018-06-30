import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from './Icon';

const PopUpInput = ({ coordX, coordy, value, onChange, handlerConf }) => {
  const left = coordX - 150;
  const top = coordy - 60;
  return (
    <Wrapper top={top} left={left}>
      <Input type="number" defaultValue={value} min={'0'} onChange={onChange} />
      <WrapIcon onClick={handlerConf(true)} name="Done" color="green" />
      <WrapIcon onClick={handlerConf(false)} name="Clear" color="red" />
    </Wrapper>
  );
};
PopUpInput.propTypes = {
  coordX: PropTypes.number.isRequired,
  coordy: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  handlerConf: PropTypes.func.isRequired
};
const WrapIcon = styled(Icon)`
  margin: 0 10px;
`;
const Wrapper = styled.div`
  position: fixed;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  display: flex;
  flex-flow: row wrap;
  box-shadow: 2px 2px 10px 1px #00000080;
  height: 60px;
  width: 150px;
  border-radius: 20px 20px 0 20px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 1rem;
  padding: 4px;
  box-sizing: border-box;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid grey;
  width: 80%;
  font-size: 1.5rem;
  text-align: center;
`;
export default PopUpInput;
