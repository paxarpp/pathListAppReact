import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from '../components/Table'

export default class TableContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stringOnPage: 10,
            page: 1,
            pathListsCar: [],
        }
    }
    componentDidMount() {
        const { selectedCar, pathLists } = this.props;
        this.setState({
            pathListsCar: pathLists.filter(path => (path.name === selectedCar))
        })
    }

    handlerPagination = (page) => {
        this.setState({
            page,
        })
    }

    prepareArrSelectedCarPath = () => {
        const { selectedCar, pathLists } = this.props;
        this.setState(prev => {
            pathListsCar: pathLists.filter(path => (path.name === selectedCar))
        })
    }
    paginationData = () => {
        const { page, stringOnPage, pathListsCar } = this.state;
        const pages = (pathListsCar.length % stringOnPage === 0) ? pathListsCar.length / stringOnPage : Math.ceil(pathListsCar.length / stringOnPage);
        if (page > pages) {
            return pathListsCar.filter((elem, idx) => {
                if (idx >= (pages - 1) * stringOnPage && idx <= (pages * stringOnPage) - 1) {
                    return elem
                }
            })
        } else {
            return pathListsCar.filter((elem, idx) => {
                if (idx >= (page - 1) * stringOnPage && idx <= (page * stringOnPage) - 1) {
                    return elem
                }
            })
        }
    }
    handlerTableSort = (name) => {

        if (name) {
            let prevName;
            if (prevName === name) {
                const sortFunc = (a, b) => (b[name] - a[name]);
            } else {
                const sortFunc = (a, b) => (a[name] - b[name]);
            }
            prevName = name;
            const { pathListsCar } = this.state;
            this.setState({
                pathListsCar: pathListsCar.slice().sort(this.sortFunc),
            })
        }
    }
    render() {
        const { page, stringOnPage, pathListsCar } = this.state;
        const paginationData = this.paginationData();
        return (
            <Table
                page={page}
                stringOnPage={stringOnPage}
                length={pathListsCar.length}
                tempArr={paginationData}
                handlerP={this.handlerPagination}
                handlerTableSort={this.handlerTableSort}
            />
        )
    }
}
