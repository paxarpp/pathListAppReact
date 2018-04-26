import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeWindow } from '../actions/cars.js';
import Button from '../components/Button';
import ViewPath from '../components/ViewPath';

class VeiwAndEditPathList extends Component {
    handleClose = e => {
        const { close } = this.props
        e.preventDefault()
        close('selectPathList')
    }
    render() {
        const { selectPathList } = this.props;
        return (
            <div className="pathListView">
                <div className="header">
                    <h2 className="headerText">Выбран путевой лист</h2>
                    <Button handler={this.handleClose} styleButton="delit">{String.fromCharCode(10006)}</Button>
                </div>
                <ViewPath path={selectPathList} />
                <div className="footer">
                    <Button styleButton="submit"></Button>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        close: (selectPathList) => closeWindow(dispatch, selectPathList)
    }
}
const mapStateToProps = (state) => {
    return {
        cars: state.cars,
        pathLists: state.pathLists,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VeiwAndEditPathList);