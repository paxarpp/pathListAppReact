import React from 'react';
import renderer from 'react-test-renderer';
import Confirm from './Confirm';

test('Component', () => {
  const component = renderer.create(<Confirm handler={() => false} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
