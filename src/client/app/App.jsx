import React from 'react';
import style from './style.css';
import styled from 'styled-components';

import Footer from './components/footer';
import Content from './containers/content';
import CarListContainer from './containers/carListContainer';

const App = () => {
  return (
    <Wrapper>
      <div>
        <CarListContainer />
      </div>
      <WrapperContent>
        <Content />
        <Footer />
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
`;

export default App;
