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
                    <Fragment>
                        <label>{fildNamePathList['name']}: {path.name}</label>
                        <label>{fildNamePathList['fuel']}: {path.fuel}</label>
                        <label>{fildNamePathList['constFuelChange']}: {path.constFuelChange} л</label>
                    </Fragment>
                }
                {
                    Object.keys(path).filter(elem => {
                        return(
                            elem !== 'name' && elem !== 'fuel' && elem !== 'constFuelChange' && elem !== 'ConsumptionFactoryFuel'
                        )
                    }).map(elem => {
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
                                    <Button handler={this.handleEdit} styleButton="edit">{String.fromCharCode(9998)}</Button>
                                </div>
                            </Fragment>
                        )
                    })
                }
                 {
                    <Fragment>
                        <label>{fildNamePathList['ConsumptionFactoryFuel']}: {path.ConsumptionFactoryFuel} л</label>
                    </Fragment>
                }
            </div>
        )
    }
}
