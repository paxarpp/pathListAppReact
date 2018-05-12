import React, { Component } from 'react';

import Button from "../components/Button";

export default class PopUpInput extends Component {
  
  render() {
      const left = this.props.coordX-150;
      const top = this.props.coordy-60; 
    return (
      <div style={{"top":top, "left":left}} className="popUpInput">
        <input
            type="number"
            defaultValue={this.props.value}
            min={"0"}
            onChange={this.props.onChange}
        />
        <Button handler={this.props.handlerConf(true)} styleButton="confirm">
          {String.fromCharCode(10003)}
        </Button>
        <Button handler={this.props.handlerConf(false)} styleButton="delit">
          {String.fromCharCode(10006)}
        </Button>
      </div>
    )
  }
}
