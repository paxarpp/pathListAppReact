import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

test('Button has the class', () => {
  const component = renderer.create(
    <Button handler={() => {}} styleButton="addCar">
      создать
    </Button>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button has the class , no children', () => {
  const component = renderer.create(<Button handler={() => {}} styleButton="addCar" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
