import React from 'react';
import styled from 'styled-components';
import { Flat } from '../../ButtonNew';

interface IProps {
  handlerClose: () => void;
  handlerComplite: (setupDate: any) => void;
};
const DatepickerFooter = ({ handlerClose, handlerComplite }: IProps) => (
  <Wrapper>
    <Flat small danger handlerClick={handlerClose}>
      Cancel
    </Flat>
    <Flat small handlerClick={handlerComplite}>
      Ok
    </Flat>
  </Wrapper>
);
const Wrapper = styled.div`
  width: 280px;
  margin: 0 auto;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

export default DatepickerFooter;
