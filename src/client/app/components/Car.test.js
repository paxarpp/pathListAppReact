import React from 'react';
import renderer from 'react-test-renderer';
import Car from './Car';

test('Component no the class', () => {
  const car = { name: 'test' };
  const selectedCar = '';
  const component = renderer.create(
    <Car car={car} selectedCar={selectedCar} deleteCarHandler={() => {}} handler={() => {}} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Component has the class when select', () => {
  const car = { name: 'test' };
  const selectedCar = 'test';
  const component = renderer.create(
    <Car car={car} selectedCar={selectedCar} deleteCarHandler={() => {}} handler={() => {}} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
