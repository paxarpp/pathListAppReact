import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Header = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};
Header.propTypes = {
  children: PropTypes.any
};
const Wrap = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  min-height: 50px;
  background-color: #2bbbad7a;
  justify-content: center;
`;
export default Header;
