import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Path extends Component {
    render() {
       const { path, handler, selectedCar } = this.props;
        return (
            <div  onClick={handler} className={selectedCar === path.name ? 'selected': null}>
               { path.name } : {path.dateBegin}
            </div>
        )
    }
}