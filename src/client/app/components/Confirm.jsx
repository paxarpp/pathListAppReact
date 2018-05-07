import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../components/Button";

export default class CarList extends Component {
  handler = () => {
    console.log('g');
    
  };

  render() {
    return (
      <div className="cardConfirm">
      <h4>Уверен ?</h4>
        <Button handler={this.handler} styleButton="yes">
          да {String.fromCharCode(10004)}
        </Button>
        <Button handler={this.handler} styleButton="no">
          нет {String.fromCharCode(10005)}
        </Button>
      </div>
    );
  }
}
