import React from 'react';
import renderer from 'react-test-renderer';
import SortLink from './SortLink';

test('SortLink view, reverse true', () => {
  const nameCell = 'test';
  const reverse = true;
  const name = 'test';
  const component = renderer.create(<SortLink nameCell={nameCell} reverse={reverse} name={name} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('SortLink view, reverse false', () => {
  const nameCell = 'test';
  const reverse = false;
  const name = 'test';
  const component = renderer.create(<SortLink nameCell={nameCell} reverse={reverse} name={name} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('SortLink noview', () => {
  const nameCell = 'test';
  const reverse = false;
  const name = 'diff';
  const component = renderer.create(<SortLink nameCell={nameCell} reverse={reverse} name={name} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
