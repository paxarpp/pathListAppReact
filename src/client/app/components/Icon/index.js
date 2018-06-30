import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { icons } from './assets';

const Icon = ({ name = 'defaultIcon', color = 'currentColor', size = 24, onClick, ...otherProps }) => {
  const icon = icons[name] ? icons[name] : icons['defaultIcon'];
  return (
    <Svg
      onClick={onClick}
      x="0px"
      y="0px"
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill={color}
      {...otherProps}
    >
      {[...icon.path]}
    </Svg>
  );
};
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const Svg = styled.svg`
  cursor: ${props => props.onClick && 'pointer'};
`;
export default Icon;
