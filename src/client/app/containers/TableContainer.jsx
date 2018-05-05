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
            reverse: false,
            name: '',
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
        this.setState({
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
            const { reverse } = this.state;
            if(reverse){
                const { pathListsCar } = this.state;
                this.setState({
                    pathListsCar: pathListsCar.slice().sort((a, b) => {
                        if (b[name] > a[name]) {
                            return 1;
                        } else if (b[name] < a[name]) {
                            return -1;
                        } else return 0;
                    }),
                    reverse: !(reverse),
                    name
                })
            } else {
                const { pathListsCar } = this.state;
                this.setState({
                    pathListsCar: pathListsCar.slice().sort((a, b) => {
                        if (b[name] > a[name]) {
                            return -1;
                        } else if (b[name] < a[name]) {
                            return 1;
                        } else return 0;
                    }),
                    reverse: !(reverse),
                    name
                })
            } 
        }
    }
    render() {
        const { page, stringOnPage, pathListsCar, reverse, name } = this.state;
        const paginationData = this.paginationData();
        return (
            <Table
                name={name}
                reverse={reverse}
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
