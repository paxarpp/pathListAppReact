import React from 'react';
import styled, { css } from 'styled-components';
import Input from './Input';
import RadioButton from './RadioButton';

interface IProps {
  fuel: string;
  name: string;
  handleChange: (e: any) => void;
  isWrong: string | boolean;
  constFuelChange: number;
}

interface IError {
  error: boolean;
}

const InputCarValue = ({ name, fuel, handleChange, isWrong, constFuelChange }: IProps) => (
  <>
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

export default InputCarValue;
