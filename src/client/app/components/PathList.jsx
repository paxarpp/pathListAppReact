import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Path from './Path.jsx';
import Button from '../components/Button';
import PaginationButton from '../components/PaginationButton';

export default class PathList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stringOnPage: 10,
            page: 1,
        }
    }

    handler = (path) => () => {
        const { deletePathHandler } = this.props;
        deletePathHandler(path);
    }
    handlerInfo = (path) => () => {
        const { pathInfo } = this.props;
        pathInfo(path);
    }

    handlerPagination = (page) => {
        this.setState({
            page: page,
        })
    }

    render() {
        const { pathLists, selectedCar } = this.props;
        const { page, stringOnPage } = this.state;

        const tempArr = pathLists.filter((elem, idx) => {
            if (idx >= (page - 1) * stringOnPage && idx <= (page * stringOnPage) - 1) {
                return elem
            }
        })

        return (
            <div className="pathList" >
                <ul>
                    <ReactCSSTransitionGroup transitionName="anim" transitionAppear={false} transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionEnter={true} transitionLeave={true}>
                        {tempArr.map(path => {
                            return (
                                <li key={path.name + path.dateBegin}>
                                    <Path
                                        selectedCar={selectedCar}
                                        path={path}
                                        handler={this.handlerInfo(path)} />
                                    <Button handler={this.handler(path)} styleButton="delit">{String.fromCharCode(10006)}</Button>
                                </li>
                            )
                        })}
                    </ReactCSSTransitionGroup>
                </ul>
                <PaginationButton
                    length={pathLists.length}
                    page={page}
                    stringOnPage={stringOnPage}
                    handlerPagination={this.handlerPagination} />
            </div>
        )
    }
}
