import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

export default class Confirm extends Component {
  handlerConf = status => () => {
    const { handler } = this.props;
    handler(status);
  };
  render() {
    return (
      <div className="popUpConfirm">
        <p>Уверены ?</p>
        <Icon onClick={this.handlerConf(true)} color="green" name="Done" />
        <Icon onClick={this.handlerConf(false)} color="red" name="Clear" />
      </div>
    );
  }
}
Confirm.propTypes = {
  handler: PropTypes.func.isRequired
};
