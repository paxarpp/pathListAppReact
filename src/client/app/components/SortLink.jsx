import React, { Component } from 'react';

import Button from '../components/Button';
import IconSort from '../components/IconSort';

export default class SortLink extends Component {
  render() {
    const { name, nameCell, reverse } = this.props;
    return name === nameCell ? (
      <Button handler={null} styleButton="sortView">
        {reverse ? String.fromCharCode(9660) : String.fromCharCode(9650)}
      </Button>
    ) : (
      <IconSort />
    );
  }
}
