import React from 'react';
import renderer from 'react-test-renderer';
import RowTD from './RowTD';

test('RowTD view, not error not select', () => {
  const path = {
    ConsumptionFactoryFuel: 15.4,
    addFuel: 0,
    addFuelWinter: 0,
    constFuelChange: 15.4,
    dateBegin: '2018-05-03',
    deltaFuel: 11.24,
    fuel: 'AI',
    fuelBegin: 40.47,
    fuelEnd: 29.23,
    milleage: 73,
    name: 'уаз',
    pathBegin: 116239,
    pathEnd: 116312,
    first: '',
    errorFuel: '',
    errorPath: '',
  };
  const component = renderer.create(
    <RowTD
      handler={jest.fn()}
      doubleClick={jest.fn()}
      deletePath={jest.fn()}
      selectPath={{}}
      path={path}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RowTD view, error not select', () => {
  const path = {
    ConsumptionFactoryFuel: 15.4,
    addFuel: 0,
    addFuelWinter: 0,
    constFuelChange: 15.4,
    dateBegin: '2018-05-03',
    deltaFuel: 11.24,
    fuel: 'AI',
    fuelBegin: 40.47,
    fuelEnd: 29.23,
    milleage: 73,
    name: 'уаз',
    pathBegin: 116239,
    pathEnd: 116312,
    errorFuel: true,
    errorPath: false,
    first: true,
  };
  const component = renderer.create(
    <RowTD
      handler={jest.fn()}
      doubleClick={jest.fn()}
      deletePath={jest.fn()}
      selectPath={{}}
      path={path}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RowTD view, error select', () => {
  const path = {
    ConsumptionFactoryFuel: 15.4,
    addFuel: 0,
    addFuelWinter: 0,
    constFuelChange: 15.4,
    dateBegin: '2018-05-03',
    deltaFuel: 11.24,
    fuel: 'AI',
    fuelBegin: 40.47,
    fuelEnd: 29.23,
    milleage: 73,
    name: 'уаз',
    pathBegin: 116239,
    pathEnd: 116312,
    errorFuel: true,
    errorPath: false,
    first: true,
  };
  const selectPath = {
    ConsumptionFactoryFuel: 15.4,
    addFuel: 0,
    addFuelWinter: 0,
    constFuelChange: 15.4,
    dateBegin: '2018-05-03',
    deltaFuel: 11.24,
    fuel: 'AI',
    fuelBegin: 40.47,
    fuelEnd: 29.23,
    milleage: 73,
    name: 'уаз',
    pathBegin: 116239,
    pathEnd: 116312
  };
  const component = renderer.create(
    <RowTD
      handler={jest.fn()}
      doubleClick={jest.fn()}
      deletePath={jest.fn()}
      selectPath={selectPath}
      path={path}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
