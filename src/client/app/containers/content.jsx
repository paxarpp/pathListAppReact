import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CarListContainer from './carListContainer.jsx';
import PathListContainer from './pathListContainer.jsx';
import CreateCar from '../components/CreateCar';
import CreatePath from '../components/CreatePath';
import PathListSelectedCar from '../components/PathListSelectedCar';

class Content extends Component {
    render() {
       const { isNewCar, isNewPath, pathListSelectedCar } = this.props;
       
        return (
            <div className="container">
                <CarListContainer/>
                <PathListContainer/>
                {isNewCar && <CreateCar/>}
                {isNewPath && <CreatePath/>}
                <PathListSelectedCar pathListSelectedCar = { pathListSelectedCar }/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        isNewCar: state.isNewCar,
        isNewPath: state.isNewPath,
        pathListSelectedCar: state.pathListSelectedCar,
    }  
}
export default connect(mapStateToProps, null)(Content);

