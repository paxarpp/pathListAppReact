import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const SortLink = ({ name, nameCell, reverse }) =>
  name === nameCell ? (
    reverse ? (
      <Icon onClick={null} name="Arrow_Drop_Down" />
    ) : (
      <Icon onClick={null} name="Arrow_Drop_Up" />
    )
  ) : (
    <Icon onClick={null} name="UnfoldMore" />
  );
SortLink.propTypes = {
  nameCell: PropTypes.string,
  reverse: PropTypes.bool,
  name: PropTypes.string
};

export default SortLink;
