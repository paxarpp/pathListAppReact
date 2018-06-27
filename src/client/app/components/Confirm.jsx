import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';
import styled from 'styled-components';

const Confirm = ({ handler }) => (
  <PopUpConfirm>
    <p>Уверены ?</p>
    <LeftIcon onClick={() => handler(true)} color="green" name="Done" />
    <RightIcon onClick={() => handler(false)} color="red" name="Clear" />
  </PopUpConfirm>
);

Confirm.propTypes = {
  handler: PropTypes.func.isRequired
};
const PopUpConfirm = styled.div`
  width: 140px;
  height: 60px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px 1px grey;
  position: absolute;
  top: 45%;
  right: 30%;
  background-color: #fff;
  z-index: 999;
  > p {
    margin: 0 1rem;
  }
`;
const animHover = `
  translate: opacity 0.3s;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;
const LeftIcon = styled(Icon)`
  margin-left: 10px;
  ${animHover};
`;
const RightIcon = styled(Icon)`
  margin-left: 70px;
  ${animHover};
`;
export default Confirm;
