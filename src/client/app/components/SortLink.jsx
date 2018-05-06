import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button';

export default class SortLink extends Component {


    render() {
        const { name, nameCell, reverse } = this.props;
        return (
            name === nameCell ? (
                <Button handler={null}
                    styleButton="sortView">
                    {reverse ? String.fromCharCode(9660) : String.fromCharCode(9650)}
                </Button>
            ) : null
        )
    }
}