import React from 'react';
import styled, { css } from 'styled-components';
import Input from './Input';
import RadioButton from './RadioButton';

interface IProps {
  extension: boolean;
  handleChange: (e:any) => void;
  isWrong: string | boolean;
  constFuelChangeExt: string;
}

interface IError {
  error: boolean;
}

const InputExtension = ({ extension, handleChange, isWrong, constFuelChangeExt }: IProps) => (
  <>
    <InputHeader>возможено добавление прицепа ?</InputHeader>
    <label>
      Да
      <RadioButton
        checked={extension}
        name={'extension'}
        data-field-name={'extension'}
        type={'radio'}
        onChange={handleChange}
        value={true}
      />
    </label>
    <label>
      Нет
      <RadioButton
        checked={!extension}
        name={'extension'}
        data-field-name={'extension'}
        type={'radio'}
        onChange={handleChange}
        value={false}
      />
    </label>
    {extension && (
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
  </>
);

const InputHeader = styled.h4`
  margin: 5px 0 2px 0;
`;

const ErrorStyle = css`
  outline: 1px solid red;
  opacity: 0.7;
  transition: opacity 0.5s ease-in;
`;

const WrapInput = styled(Input)`
  ${({error}: IError) => error && ErrorStyle};
`;

export default InputExtension;
