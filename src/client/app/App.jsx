import React from 'react';
import style from './style.css';

import Header from './components/header';
import Footer from './components/footer';
import Content from './containers/content';

const App = () => {
    return (
        <div className="wrapper">
            <Header />
            <Content/>
            <Footer />
        </div>
        )
}
export default App;
