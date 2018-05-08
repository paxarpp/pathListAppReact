import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeWindow } from '../actions/cars.js';
import Button from '../components/Button';
import ViewPath from '../components/ViewPath';
import { savePath, deletePathToName } from '../actions/pathLists.js';

class VeiwAndEditPathList extends Component {
    state = {
        editPath: '',
    }
    handleClose = e => {
        const { close } = this.props
        e.preventDefault();
        close('selectPathList');
    }
    handleSave = () => {
        const { editPath } = this.state;
        if(editPath){
            const { deletePath, addDataPath, close } = this.props;
            deletePath(editPath);
            addDataPath(editPath);
            close('selectPathList');
        }
    }
    saveData = ({disabledField, ...path}) => { 
        const { editPath } = this.state;
        this.setState({
            editPath: path,
        })
    }

    render() {
        const { selectPathList } = this.props;
        return (
            <div className="pathListView">
                <div className="header">
                    <h3 className="headerText">Выбран путевой лист</h3>
                    <Button handler={this.handleClose} styleButton="delit">{String.fromCharCode(10006)}</Button>
                </div>
                <ViewPath path={selectPathList} addData={this.saveData} />
                <div className="footer">
                    {/* <Button handler={this.handleSave} styleButton="submit">Сохранить изменения</Button> */}
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        close: (selectPathList) => closeWindow(dispatch, selectPathList),
        deletePath: (path) => deletePathToName(dispatch, path),
        addDataPath: (path) => savePath(dispatch, path),
    }
}
const mapStateToProps = (state) => {
    return {
        cars: state.cars,
        pathLists: state.pathLists,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VeiwAndEditPathList);