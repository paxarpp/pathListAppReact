import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CarListContainer from './carListContainer.jsx';
import PathListContainer from './pathListContainer.jsx';
import CreateCar from '../components/CreateCar';
import CreatePath from '../components/CreatePath';
import PathListSelectedCar from '../components/PathListSelectedCar';
import VeiwAndEditPathList from '../components/VeiwAndEditPathList';
import { loadLocalStorage } from '../actions/cars';

class Content extends Component {
    componentDidMount() {
        const { load } = this.props;
        load();
    }
    render() {
        const { isNewCar, isNewPath, selectedCar, selectPathList, pathLists } = this.props;
        return (
            <div className="container">
                <CarListContainer />
                <PathListContainer />
                {isNewCar && <CreateCar />}
                {isNewPath && <CreatePath />}
                {selectPathList && <VeiwAndEditPathList selectPathList={selectPathList} />}
                {selectedCar && <PathListSelectedCar selectedCar={selectedCar} pathLists={pathLists} />}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isNewCar: state.isNewCar,
        isNewPath: state.isNewPath,
        selectedCar: state.selectedCar,
        selectPathList: state.selectPathList,
        pathLists: state.pathLists,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        load: () => loadLocalStorage(dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);

