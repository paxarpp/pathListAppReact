import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Path extends Component {
    render() {
       const { path, handler } = this.props;
        return (
            <div  onClick={handler}>
               { path.name } : {path.dateBegin}
            </div>
        )
    }
}