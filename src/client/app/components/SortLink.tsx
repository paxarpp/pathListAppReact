import React from 'react';

interface IProp {
  name: string;
  nameCell: string;
  reverse: boolean;
}

import Icon from './Icon';

const SortLink = ({ name, nameCell, reverse }:IProp) =>
  name === nameCell ? (
    reverse ? (
      <Icon onClick={null} name="Arrow_Drop_Down" />
    ) : (
      <Icon onClick={null} name="Arrow_Drop_Up" />
    )
  ) : (
    <Icon onClick={null} name="UnfoldMore" />
  );

export default SortLink;
