import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RowTD from './RowTD';
import RowTH from './RowTH';
import PaginationButton from '../components/PaginationButton';

export default class Table extends Component {

    handlerPagination = (page) => {
        const { handlerP } = this.props;
        handlerP(page)
    }
    handlerTable = (name) => {
        const { handlerTableSort } = this.props;
        handlerTableSort(name)
    }
    render() {
        const { page, 
                stringOnPage,
                length,
                tempArr } = this.props;
        return (
            <div className="pathListSelectedCar">
                <table className="table">
                    <thead>
                        <RowTH handlerTable={this.handlerTable}/>
                    </thead>
                    <tbody>
                        {tempArr.map(path => {
                            return (
                                <RowTD path={path} key={path.dateBegin} />
                            )
                        })}
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
