import React, { Component } from "react";

import Button from "../components/Button";

export default class Confirm extends Component {
  handlerConf=(status) =>() => {
    const { handler } = this.props;
    handler(status)
  }
  render() {
    return (
      <div className="popUpConfirm">
      <p>Уверены ?</p>
        <Button handler={this.handlerConf(true)} styleButton="confirm">
          {String.fromCharCode(10003)}
        </Button>
        <Button handler={this.handlerConf(false)} styleButton="delit">
          {String.fromCharCode(10006)}
        </Button>
      </div>
    );
  }
}
