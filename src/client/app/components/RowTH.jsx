import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fildNamePathList from './fildNamePathList';
import SortLink from './SortLink';

export default class RowTH extends Component {
  handler = e => {
    const { handlerTable } = this.props;
    handlerTable(e.target.dataset.fieldName);
  };
  render() {
    const { reverse, name } = this.props;
    return (
      <tr onClick={this.handler}>
        <th data-field-name={'dateBegin'} style={{ width: '10%' }}>
          {fildNamePathList['dateBegin']}
          <SortLink name={name} nameCell={'dateBegin'} reverse={reverse} />
        </th>
        <th style={{ width: '5%' }}>{fildNamePathList['fuel']}</th>
        <th style={{ width: '5%' }}>{fildNamePathList['constFuelChange']}</th>
        <th data-field-name={'pathBegin'} style={{ width: '10%' }}>
          {fildNamePathList['pathBegin']}
          <SortLink name={name} nameCell={'pathBegin'} reverse={reverse} />
        </th>
        <th data-field-name={'pathEnd'} style={{ width: '10%' }}>
          {fildNamePathList['pathEnd']}
          <SortLink name={name} nameCell={'pathEnd'} reverse={reverse} />
        </th>
        <th data-field-name={'milleage'} style={{ width: '10%' }}>
          {fildNamePathList['milleage']}
          <SortLink name={name} nameCell={'milleage'} reverse={reverse} />
        </th>
        <th data-field-name={'fuelBegin'} style={{ width: '10%' }}>
          {fildNamePathList['fuelBegin']}
          <SortLink name={name} nameCell={'fuelBegin'} reverse={reverse} />
        </th>
        <th data-field-name={'addFuel'} style={{ width: '10%' }}>
          {fildNamePathList['addFuel']}
          <SortLink name={name} nameCell={'addFuel'} reverse={reverse} />
        </th>
        <th data-field-name={'deltaFuel'} style={{ width: '10%' }}>
          {fildNamePathList['deltaFuel']}
          <SortLink name={name} nameCell={'deltaFuel'} reverse={reverse} />
        </th>
        <th data-field-name={'fuelEnd'} style={{ width: '10%' }} colSpan={2}>
          {fildNamePathList['fuelEnd']}
          <SortLink name={name} nameCell={'fuelEnd'} reverse={reverse} />
        </th>
      </tr>
    );
  }
}
RowTH.propTypes = {
  handlerTable: PropTypes.func,
  reverse: PropTypes.bool,
  name: PropTypes.string
};
