import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

export default class PathListSelectedCar extends Component {
    render() {
        const { pathListSelectedCar } = this.props;
        return (
            <div className="pathListSelectedCar" >
                {pathListSelectedCar.map(path => {
                        return (
                            <Fragment key={path.dateBegin}>
                                <Card path = {path}/>
                            </Fragment>
                        )
                    })}
            </div>
        )
    }
}