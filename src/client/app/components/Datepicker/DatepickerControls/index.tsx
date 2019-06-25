import React from 'react';
import styled from 'styled-components';
import Icon from '../../Icon';
import SelectMonth from '../SelectMonth';
import SelectYear from '../SelectYear';

interface IProps {
  month: number;
  year: number;
  decrimentMonth: () => void;
  incrementMonth: () => void;
  handlerMonth: (month: number) => void;
  handlerYear:(year: number) => void;
}
const DatepickerControls = ({ year, month, decrimentMonth, incrementMonth, handlerMonth, handlerYear }: IProps) => (
  <Wrap>
    <Icon name="LeftArrow" onClick={decrimentMonth} />
    <SelectMonth month={month} handlerMonth={handlerMonth} />
    <SelectYear year={year} handlerYear={handlerYear} />
    <Icon name="RightArrow" onClick={incrementMonth} />
  </Wrap>
);
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 280px;
  margin: 2px auto;
`;

export default DatepickerControls;
