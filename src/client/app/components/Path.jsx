import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Path extends Component {
    render() {
       const { path } = this.props;
        return (
            <div>
               { path.name } : {path.dateBegin}
            </div>
        )
    }
}