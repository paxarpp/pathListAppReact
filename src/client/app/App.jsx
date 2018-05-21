import React from 'react';
import style from './style.css';

import Header from './components/header';
import Footer from './components/footer';
import Content from './containers/content';
import CarListContainer from './containers/carListContainer';

const App = () => {
  return (
    <div className="wrapper">
      <div className="wrapperMenu">
      <CarListContainer />
      </div>
      <div className="wrapperContent">
        <Content />
        <Footer />
      </div>
    </div>
  );
};
export default App;
