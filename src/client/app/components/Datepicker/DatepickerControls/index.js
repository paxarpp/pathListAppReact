import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import SelectMonth from '../SelectMonth';
import SelectYear from '../SelectYear';

const DatepickerControls = ({ year, month, decrimentMonth, incrementMonth, handlerMonth, handlerYear }) => (
  <Wrap>
    <Icon name="LeftArrow" onClick={decrimentMonth} />
    <SelectMonth month={month} handlerMonth={handlerMonth} />
    <SelectYear year={year} handlerYear={handlerYear} />
    <Icon name="RightArrow" onClick={incrementMonth} />
  </Wrap>
);
DatepickerControls.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  decrimentMonth: PropTypes.func.isRequired,
  incrementMonth: PropTypes.func.isRequired,
  handlerMonth: PropTypes.func.isRequired,
  handlerYear: PropTypes.func.isRequired
};
const Wrap = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 280px;
  margin: 2px auto;
`;

export default DatepickerControls;
