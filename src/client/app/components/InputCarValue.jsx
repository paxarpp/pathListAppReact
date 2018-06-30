import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from './Input';
import RadioButton from './RadioButton';

const InputCarValue = ({ name, fuel, handleChange, isWrong, constFuelChange }) => (
  <Fragment>
    <InputHeader>введите название автомобиля</InputHeader>
    <WrapInput
      error={isWrong === 'name'}
      data-field-name={'name'}
      type={'text'}
      handler={handleChange}
      placeholder={'название'}
      value={name}
    />
    <InputHeader>введите паспортный расход топлива</InputHeader>
    <WrapInput
      error={isWrong === 'constFuelChange'}
      data-field-name={'constFuelChange'}
      type={'number'}
      handler={handleChange}
      placeholder={'расход по паспорту на 100 км'}
      value={constFuelChange}
      step={'0.01'}
      min={'0'}
    />
    <InputHeader>выберите тип топлива</InputHeader>
    <label>
      Бензин
      <RadioButton
        checked={fuel === 'AI'}
        name={'fuel'}
        data-field-name={'fuel'}
        type={'radio'}
        onChange={handleChange}
        value={'AI'}
      />
    </label>
    <label>
      Дизель
      <RadioButton
        checked={fuel === 'DT'}
        name={'fuel'}
        data-field-name={'fuel'}
        type={'radio'}
        onChange={handleChange}
        value={'DT'}
      />
    </label>
  </Fragment>
);
InputCarValue.propTypes = {
  fuel: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  isWrong: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  constFuelChange: PropTypes.string
};

const InputHeader = styled.h4`
  margin: 5px 0 2px 0;
`;
const error = `
  outline: 1px solid red;
  opacity: 0.7;
  transition: opacity 0.5s ease-in;
`;
const WrapInput = styled(Input)`
  ${props => props.error && error};
`;
export default InputCarValue;
