import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Car extends Component {
    render() {
       const { car, handler } = this.props;
        return (
            <div onClick={handler}>
               { car.name }
            </div>
        )
    }
}