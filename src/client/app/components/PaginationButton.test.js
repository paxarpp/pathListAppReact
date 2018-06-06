import React from 'react';
import renderer from 'react-test-renderer';
import PaginationButton from './PaginationButton';

test('PaginationButton empty', () => {
  const length = 0;
  const page = 0;
  const stringOnPage = 20;
  const component = renderer.create(
    <PaginationButton length={length} page={page} stringOnPage={stringOnPage} handlerPagination={() => {}} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('PaginationButton 100etc', () => {
  const length = 100;
  const page = 1;
  const stringOnPage = 20;
  const component = renderer.create(
    <PaginationButton length={length} page={page} stringOnPage={stringOnPage} handlerPagination={() => {}} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('PaginationButton 500etc', () => {
  const length = 500;
  const page = 10;
  const stringOnPage = 20;
  const component = renderer.create(
    <PaginationButton length={length} page={page} stringOnPage={stringOnPage} handlerPagination={() => {}} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('PaginationButton 400etc', () => {
  const length = 400;
  const page = 20;
  const stringOnPage = 20;
  const component = renderer.create(
    <PaginationButton length={length} page={page} stringOnPage={stringOnPage} handlerPagination={() => {}} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
