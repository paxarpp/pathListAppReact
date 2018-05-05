import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RowTD from './RowTD';
import RowTH from './RowTH';
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
        const length = pathLists.filter(path => {
            return (path.name === selectedCar)
        }).length;
        const pages = (length % stringOnPage === 0) ? length / stringOnPage : Math.ceil(length / stringOnPage);
        let tempArr=[];
        if(page > pages){
            tempArr = pathLists.filter(path => {
                return (path.name === selectedCar)
            }).filter((elem, idx) => {
                if (idx >= (pages - 1) * stringOnPage && idx <= (pages * stringOnPage) - 1) {
                    return elem
                }
            })
        } else{
            tempArr = pathLists.filter(path => {
                return (path.name === selectedCar)
            }).filter((elem, idx) => {
                if (idx >= (page - 1) * stringOnPage && idx <= (page * stringOnPage) - 1) {
                    return elem
                }
            })
        }
        
        return (
            <div className="pathListSelectedCar">
                <table className="table">
                    <thead>
                        <RowTH />
                    </thead>
                    <tbody>
                        {
                            tempArr.map(path => {
                                return (
                                    <RowTD path={path} key={path.dateBegin} />
                                )
                            })
                        }
                    </tbody>
                </table>
                <PaginationButton
                    length={length}
                    page={page}
                    stringOnPage={stringOnPage}
                    handlerPagination={this.handlerPagination} />
            </div>

        )
    }
}
