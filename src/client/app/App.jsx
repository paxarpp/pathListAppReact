import React, { Component } from 'react';
import style from './style.css';

import Header from './components/header';
import Footer from './components/footer';
import Content from './containers/content';


export default class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Header />
                <Content/>
                <Footer />
            </div>)
    }
}
