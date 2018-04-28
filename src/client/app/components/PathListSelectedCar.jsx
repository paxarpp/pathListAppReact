import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import Button from '../components/Button';

export default class PathListSelectedCar extends Component {
    render() {
        const { selectedCar, pathLists } = this.props;
        return (
            <div className="pathListSelectedCar" >
                {
                pathLists.filter(path => {
                    return (path.name === selectedCar)
                }).map( path =>{ return (
                <Card path={path} key={path.dateBegin}/>
                )})
                }
            </div>
        )
    }
}
