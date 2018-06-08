import React from 'react';
import renderer from 'react-test-renderer';
import RowTH from './RowTH';

test('RowTH view, reverse false not name', () => {
  const reverse = false;
  const name = '';
  const component = renderer.create(<RowTH handlerTable={() => {}} reverse={reverse} name={name} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RowTH view, reverse false', () => {
  const reverse = false;
  const name = 'dateBegin';
  const component = renderer.create(<RowTH handlerTable={() => {}} reverse={reverse} name={name} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RowTH view, reverse true', () => {
  const reverse = false;
  const name = 'dateBegin';
  const component = renderer.create(<RowTH handlerTable={() => {}} reverse={reverse} name={name} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
