import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Car from './Car.jsx';

export default class CarList extends Component {
  render() {
    const { cars, selectedCar, deleteCarHandler } = this.props;
    return (
      <div className="carList">
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
              <div key={car.name} className="list">
                <Car
                  selectedCar={selectedCar}
                  car={car}
                  handler={this.props.carInfo(car.name)}
                  deleteCarHandler={deleteCarHandler}
                />
              </div>
            );
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
