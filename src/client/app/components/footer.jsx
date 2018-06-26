import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return <Wrap>&copy; {new Date().getFullYear()}</Wrap>;
};
const Wrap = styled.footer`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  min-height: 50px;
  background-color: grey;
  justify-content: center;
`;
export default Footer;
