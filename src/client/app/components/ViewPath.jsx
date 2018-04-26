import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import fildNamePathList from './fildNamePathList';
import Button from '../components/Button';

export default class ViewPath extends Component {

    render() {
        const { path } = this.props;
        return (
            <div className="View" >
                {
                    Object.keys(path).map(elem => {
                        return (
                            <Fragment key={elem}>
                                <label>{fildNamePathList[elem]}</label>
                                <div>
                                <input
                                    data-field-name={elem}
                                    type={'text'}
                                    // onChange={this.handleChange}
                                    placeholder={fildNamePathList[elem]}
                                    defaultValue={path[elem]}
                                    disabled
                                    />
                                    <Button handler={this.handleClose} styleButton="edit">{String.fromCharCode(9998)}</Button>
                                </div>
                            </Fragment>
                        )
                    })
                }
            </div>
        )
    }
}
