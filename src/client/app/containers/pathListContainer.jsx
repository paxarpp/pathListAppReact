import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Count from '../components/countPathList';
import PathList from '../components/PathList';
import Button from '../components/Button';
import { deletePathToName, addNewPath, infoPathToName } from '../actions/pathLists.js';
class PathListContainer extends Component {
    deletePath = (path) => {
        const { deletePath } = this.props;
        deletePath(path);
    }
    handlerAddPath = () => {
        const { addPath } = this.props;
        addPath();
    }
    pathInfo = (path) => {
        const { pathInfo } = this.props;
        pathInfo(path);
    }
    render() {
       const { pathLists, selectedCar } = this.props;   
        return (
                <div className="pathListContainer">
                    { pathLists.length ? <Count count={pathLists.length}/> : null }
                    <div className="header">
                        <h3>Путевые листы</h3>
                    </div> 
                    <PathList 
                        selectedCar={selectedCar}
                        pathLists={pathLists}
                        deletePathHandler={this.deletePath}
                        pathInfo={this.pathInfo} />
                    <div className="footer">
                        <Button handler={this.handlerAddPath} styleButton="submit">Добавить лист</Button>
                    </div>
                </div>
                )
    }
}
const mapStateToProps = (state) => {
    return {
        pathLists: state.pathLists,
        selectedCar: state.selectedCar
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deletePath: (name) => deletePathToName(dispatch, name),
        addPath: () => addNewPath(dispatch),
        pathInfo: (path) => infoPathToName(dispatch, path),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PathListContainer);