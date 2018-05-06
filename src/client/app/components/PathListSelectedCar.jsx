import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import TableContainer from '../containers/TableContainer';

export default class PathListSelectedCar extends Component {
    render() {
        const { selectedCar, pathLists } = this.props;
        return (
            <TableContainer  className="pathListSelectedCar"
                    pathLists={pathLists.filter(path => (path.name === selectedCar))}
            />
        )
    }
}
