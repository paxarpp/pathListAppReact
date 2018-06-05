import React from 'react';
import renderer from 'react-test-renderer';
import CarList from './CarList';

test('CarList has 2 car', () => {
  const cars = [{ name: 'test1' }, { name: 'test2' }];
  const error = [];
  const selectedCar = '';
  const component = renderer.create(
    <CarList deleteCarHandler={() => {}} carInfo={() => {}} selectedCar={selectedCar} error={error} cars={cars} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CarList has 2 car, select test2', () => {
  const cars = [{ name: 'test1' }, { name: 'test2' }];
  const error = [];
  const selectedCar = 'test2';
  const component = renderer.create(
    <CarList deleteCarHandler={() => {}} carInfo={() => {}} selectedCar={selectedCar} error={error} cars={cars} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CarList has 2 car, select test1, error1', () => {
  const cars = [{ name: 'test1' }, { name: 'test2' }];
  const error = [
    {
      name: 'test1',
      first: true,
      fuel: false,
      path: true
    },
    {
      name: 'test1',
      first: false,
      fuel: false,
      path: true
    }
  ];
  const selectedCar = 'test1';
  const component = renderer.create(
    <CarList deleteCarHandler={() => {}} carInfo={() => {}} selectedCar={selectedCar} error={error} cars={cars} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CarList has 2 car, no select, error1', () => {
  const cars = [{ name: 'test1' }, { name: 'test2' }];
  const error = [
    {
      name: 'test1',
      first: true,
      fuel: false,
      path: true
    },
    {
      name: 'test1',
      first: false,
      fuel: false,
      path: true
    }
  ];
  const selectedCar = '';
  const component = renderer.create(
    <CarList deleteCarHandler={() => {}} carInfo={() => {}} selectedCar={selectedCar} error={error} cars={cars} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
