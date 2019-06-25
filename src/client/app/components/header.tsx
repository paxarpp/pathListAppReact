import React from 'react';
import styled from 'styled-components';

const Header = ({ children }: any) => <Wrap>{children}</Wrap>;

const Wrap = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  min-height: 50px;
  background-color: #2bbbad7a;
  justify-content: center;
`;

export default Header;
