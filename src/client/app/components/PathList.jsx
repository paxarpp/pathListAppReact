import React, { Component } from 'react';
import PropTypes from 'prop-types';


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
        const { pathLists } = this.props;
        return (
            <div className="pathList" >
                <ul>
                    {pathLists.map(path => {
                        return (
                            <li key={path.name+ path.dateBegin}>
                                <Path path={path} handler={this.handlerInfo(path)}/>
                                <Button handler={this.handler(path)} styleButton="delit">{String.fromCharCode(10006)}</Button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
