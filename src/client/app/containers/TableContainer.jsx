import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from '../components/Table'

export default class TableContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stringOnPage: 10,
            page: 1,
        }
    }
    handlerPagination = (page) => {
        this.setState({
            page,
        })
    }
    lengthSelectedCarPath = () => {
        const { selectedCar, pathLists } = this.props;
        return length = pathLists.filter(path => {
            return (path.name === selectedCar)
        }).length;
    }
    paginationData = () => {
        const { selectedCar, pathLists } = this.props;
        const { page, stringOnPage } = this.state;
        const length = this.lengthSelectedCarPath();
        const pages = (length % stringOnPage === 0) ? length / stringOnPage : Math.ceil(length / stringOnPage);
        let tempArr = [];
        if (page > pages) {
            tempArr = pathLists.filter(path => {
                return (path.name === selectedCar)
            }).filter((elem, idx) => {
                if (idx >= (pages - 1) * stringOnPage && idx <= (pages * stringOnPage) - 1) {
                    return elem
                }
            })
        } else {
            tempArr = pathLists.filter(path => {
                return (path.name === selectedCar)
            }).filter((elem, idx) => {
                if (idx >= (page - 1) * stringOnPage && idx <= (page * stringOnPage) - 1) {
                    return elem
                }
            })
        }
        return tempArr;
    }
    render() {
        const { page, stringOnPage } = this.state;  
        const tempArr = this.paginationData();
        const length = this.lengthSelectedCarPath();
        return (
            <Table
                page={page}
                stringOnPage={stringOnPage}
                length={length}
                tempArr={tempArr}
                handlerP={this.handlerPagination}
            />
        )
    }
}
