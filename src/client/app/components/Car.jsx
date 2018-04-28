import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Car extends Component {
    render() {
       const { car, handler, selectedCar } = this.props;
        return (
            <div onClick={handler} className={selectedCar === car.name ? 'selected': ''}>
               { car.name }
            </div>
        )
    }
}