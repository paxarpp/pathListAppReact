import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Count from '../components/countPathList';
import PathList from '../components/PathList';
import Button from '../components/Button';
import { deletePathToName, addNewPath, infoPathToName, checkError } from '../actions/pathLists.js';
class PathListContainer extends Component {

    deletePath = (path) => () => {
        const { deletePath, chError } = this.props;
        deletePath(path);
        chError();
    }
    handlerAddPath = () => {
        const { addPath } = this.props;
        addPath();
    }
    pathInfo = (path) => () => {
        const { pathInfo } = this.props;
        pathInfo(path);
    }
    render() {
       const { pathLists, selectedCar, error } = this.props;
        return (
                <div className="pathListContainer">
                    { pathLists.length ? <Count count={pathLists.length} position="top" /> : null }
                    <div className="header">
                        <h3>Путевые листы</h3>
                    </div> 
                    <PathList 
                        error={error}
                        selectedCar={selectedCar}
                        pathLists={pathLists}
                        deletePathHandler={this.deletePath}
                        pathInfo={this.pathInfo} />
                    <div className="footer">
                        <Button handler={this.handlerAddPath} styleButton="submit">Добавить лист</Button>
                        { error.length ? <Count text={"ошибок: "} count={(error.length)/2} position="bottom" /> : null }
                    </div>
                </div>
                )
    }
}
const mapStateToProps = (state) => {
    return {
        pathLists: state.pathLists,
        cars: state.cars,
        selectedCar: state.selectedCar,
        error: state.error,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deletePath: (name) => deletePathToName(dispatch, name),
        addPath: () => addNewPath(dispatch),
        pathInfo: (path) => infoPathToName(dispatch, path),
        chError: () => checkError(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PathListContainer);