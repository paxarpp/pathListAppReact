import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PathList from '../components/PathList';
import Button from '../components/Button';
import { deletePathToName, addNewPath } from '../actions/pathLists.js';
class PathListContainer extends Component {
    deletePath = (path) => {
        const { deletePath } = this.props;
        deletePath(path);
    }
    handlerAddPath = () => {
        const { addPath } = this.props;
        addPath();
    }
    render() {
       const { pathLists } = this.props;
        
   return (
            <div className="pathListContainer">
                <div className="header">
                    <h3>Путевые листы</h3>
                </div> 
                <PathList pathLists={pathLists} deletePathHandler={this.deletePath} />
                <div className="footer">
                    <Button handler={this.handlerAddPath} styleButton="submit">Добавить лист</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        pathLists: state.pathLists
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deletePath: (name) => deletePathToName(dispatch, name),
        addPath: () => addNewPath(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PathListContainer);