import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Car from './Car.jsx';
import Button from '../components/Button';

export default class CarList extends Component {
  render() {
    const { cars, selectedCar } = this.props;
    return (
      <div className="carList">
        <ul>
          <ReactCSSTransitionGroup
            transitionName="anim"
            transitionAppear={false}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            transitionEnter={true}
            transitionLeave={true}
          >
            {cars.map(car => {
              return (
                <li key={car.name}>
                  <Car
                    selectedCar={selectedCar}
                    car={car}
                    handler={this.props.carInfo(car.name)}
                  />
                  <Button
                    handler={this.props.deleteCarHandler(car.name)}
                    styleButton="delit"
                  >
                    {String.fromCharCode(10006)}
                  </Button>
                </li>
              );
            })}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
}
