import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from './Input';
import RadioButton from './RadioButton';

const InputExtension = ({ extension, handleChange, isWrong, constFuelChangeExt }) => (
  <Fragment>
    <InputHeader>возможено добавление прицепа ?</InputHeader>
    <label>
      Да
      <RadioButton
        checked={extension === 'true'}
        name={'extension'}
        data-field-name={'extension'}
        type={'radio'}
        onChange={handleChange}
        value={'true'}
      />
    </label>
    <label>
      Нет
      <RadioButton
        checked={extension === 'false'}
        name={'extension'}
        data-field-name={'extension'}
        type={'radio'}
        onChange={handleChange}
        value={'false'}
      />
    </label>
    {extension === 'true' && (
      <WrapInput
        error={isWrong === 'constFuelChangeExt'}
        data-field-name={'constFuelChangeExt'}
        type={'number'}
        handler={handleChange}
        placeholder={'расход по паспорту на 100 км с прицепом'}
        value={constFuelChangeExt}
        step={'0.01'}
        min={'0'}
      />
    )}
  </Fragment>
);
InputExtension.propTypes = {
  extension: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  handleChange: PropTypes.func.isRequired,
  isWrong: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  constFuelChangeExt: PropTypes.string
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
export default InputExtension;
