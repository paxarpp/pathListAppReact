import React from 'react';
import renderer from 'react-test-renderer';
import IconSort from './IconSort';

test('IconSort', () => {
  const component = renderer.create(<IconSort />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
