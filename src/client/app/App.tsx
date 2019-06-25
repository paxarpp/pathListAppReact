import React from 'react';
import styled from 'styled-components';

import Footer from './components/footer';
import Content from './containers/content';
import CarListContainer from './containers/carListContainer';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-size: 22px;
  }
`;

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <div>
        <CarListContainer />
      </div>
      <WrapperContent>
        <Content />
        <Footer>&copy; {new Date().getFullYear()}</Footer>
      </WrapperContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
`;

const WrapperContent = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  width: 100%;
  min-width: 1101px;
`;

export default App;
