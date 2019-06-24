import { css } from 'styled-components';
interface IProps {
  disable?: boolean;
  danger?: boolean;
  second?: boolean;
};

export const ifNotDisabled = ({ disable }: { disable?: boolean }) =>
  !disable &&
  css`
    cursor: pointer;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  `;

export const ifNotDisabledHover = ({ disable, danger, second }: IProps) =>
  !disable &&
  css`
    background-color: ${danger ? 'red' : second ? '#aab' : '#2bbbad'};
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);
  `;
