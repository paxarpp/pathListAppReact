import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Table from './Table';

export default class PathListSelectedCar extends Component {
    render() {
        const { selectedCar, pathLists } = this.props;
        return (
            <Table  className="pathListSelectedCar"
                    selectedCar={selectedCar}
                    pathLists={pathLists}
            />
        )
    }
}
