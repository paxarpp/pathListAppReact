import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Flat } from '../../ButtonNew';

const DatepickerFooter = ({ handlerClose, handlerComplite }) => (
  <Wrapper>
    <Flat small danger handlerClick={handlerClose}>
      Cancel
    </Flat>
    <Flat small handlerClick={handlerComplite}>
      Ok
    </Flat>
  </Wrapper>
);
DatepickerFooter.propTypes = {
  handlerClose: PropTypes.func.isRequired,
  handlerComplite: PropTypes.func.isRequired
};
const Wrapper = styled.div`
  width: 280px;
  margin: 0 auto;
  padding-bottom: 5px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
`;

export default DatepickerFooter;
