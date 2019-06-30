import React from 'react';
import styled from 'styled-components';
import { icons } from './assets';

interface IProps {
  name: string;
  onClick?: () => void;
  color?: string;
  size?: string | number;
};
const Icon = ({ name = 'defaultIcon', color = 'currentColor', size = 24, onClick, ...otherProps }: IProps) => {
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

const Svg = styled.svg`
  cursor: ${({ onClick }) => onClick && 'pointer'};
`;
export default Icon;
