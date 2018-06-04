import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Car from './Car.jsx';
import CountErr from '../components/CountErr';

export default class CarList extends Component {
  render() {
    const { cars, selectedCar, deleteCarHandler, error } = this.props;
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
                {error.find(elem => elem.name === car.name) ? (
                  <CountErr text={'ошибок: '} count={error.filter(elem => elem.name === car.name).length / 2} />
                ) : null}
              </div>
            );
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
