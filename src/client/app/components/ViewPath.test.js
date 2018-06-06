import React from 'react';
import renderer from 'react-test-renderer';
import ViewPath from './ViewPath';

import { error } from '../test/constDataTest';
import { pathLists } from '../test/constDataTest';

test('ViewPath correct', () => {
  const component = renderer.create(<ViewPath error={error} path={pathLists[4]} doubleClick={() => {}} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('ViewPath this error', () => {
  const component = renderer.create(<ViewPath error={error} path={pathLists[0]} doubleClick={() => {}} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
