import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fildNamePathList from './fildNamePathList';
import RowTD from './RowTD';
import PaginationButton from '../components/PaginationButton';

export default class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stringOnPage: 10,
            page: 1,
        }
    }
    handlerPagination = (page) => {
        this.setState({
            page: page,
        })
    }
    render() {
        const { selectedCar, pathLists } = this.props;
        const { page, stringOnPage } = this.state;

        const tempArr = pathLists.filter((elem, idx) => {
            if (idx >= (page - 1) * stringOnPage && idx <= (page * stringOnPage) - 1) {
                return elem
            }
        })
        return (
            <div className="pathListSelectedCar">
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{width: "15%"}}>{fildNamePathList['name']}</th>
                            <th style={{width: "10%"}}>{fildNamePathList['dateBegin']}</th>
                            <th style={{width: "5%"}}>{fildNamePathList['fuel']}</th>
                            <th style={{width: "5%"}}>{fildNamePathList['constFuelChange']}</th>
                            <th style={{width: "10%"}}>{fildNamePathList['pathBegin']}</th>
                            <th style={{width: "10%"}}>{fildNamePathList['pathEnd']}</th>
                            <th style={{width: "10%"}}>{fildNamePathList['milleage']}</th>
                            <th style={{width: "10%"}}>{fildNamePathList['ConsumptionFactoryFuel']}</th>
                            <th style={{width: "5%"}}>{fildNamePathList['fuelBegin']}</th>
                            <th style={{width: "5%"}}>{fildNamePathList['addFuel']}</th>
                            <th style={{width: "5%"}}>{fildNamePathList['addFuelWinter']}</th>
                            <th style={{width: "10%"}}>{fildNamePathList['fuelEnd']}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tempArr.filter(path => {
                                return (path.name === selectedCar)
                            }).map(path => {
                                return (
                                    <RowTD path={path} key={path.dateBegin} />
                                )
                            })
                        }
                    </tbody>
                </table>
                <PaginationButton
                    length={pathLists.filter(path => {
                        return (path.name === selectedCar)
                    }).length}
                    page={page}
                    stringOnPage={stringOnPage}
                    handlerPagination={this.handlerPagination} />
            </div>

        )
    }
}
