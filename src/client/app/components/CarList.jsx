import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Car from './Car.jsx';
import Button from '../components/Button';

export default class CarList extends Component {
    handler=(name)=>()=>{
        const { deleteCarHandler } = this.props;
        deleteCarHandler(name);
    }
    handlerInfo=(name)=>()=>{
        const { carInfo } = this.props;
        carInfo(name);
        
    }
    render() {
        const { cars } = this.props;
        return (
            <div className="carList" >
                <ul>
                    {cars.map(car => {
                        return (
                            <li key={car.name}>
                                <Car car={car} handler={this.handlerInfo(car.name)}/>
                                <Button handler={this.handler(car.name)} styleButton="delit">{String.fromCharCode(10006)}</Button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
