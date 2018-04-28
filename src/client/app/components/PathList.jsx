import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import Path from './Path.jsx';
import Button from '../components/Button';

export default class PathList extends Component {
    handler=(path)=>()=>{
        const { deletePathHandler } = this.props;
        deletePathHandler(path);
    }
    handlerInfo=(path)=>()=>{
        const { pathInfo } = this.props;
        pathInfo(path);
    }
    render() {
        const { pathLists, selectedCar } = this.props;
        return (
            <div className="pathList" >
                <ul>
                <ReactCSSTransitionGroup transitionName="anim" transitionAppear={false} transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionEnter={true} transitionLeave={true}>
                    {pathLists.map(path => {
                        return (
                            <li key={path.name+ path.dateBegin}>
                                <Path 
                                    selectedCar={selectedCar}
                                    path={path}
                                    handler={this.handlerInfo(path)}/>
                                <Button handler={this.handler(path)} styleButton="delit">{String.fromCharCode(10006)}</Button>
                            </li>
                        )
                    })}
                </ReactCSSTransitionGroup>
                </ul>
            </div>
        )
    }
}
