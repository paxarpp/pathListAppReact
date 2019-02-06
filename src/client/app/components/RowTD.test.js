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
    pathEnd: 116312
  };
  const error = [
    {
      ConsumptionFactoryFuel: '',
      addFuel: '',
      addFuelWinter: 0,
      constFuelChange: '',
      dateBegin: '',
      deltaFuel: '',
      errorFuel: '',
      errorPath: '',
      first: '',
      fuel: '',
      fuelBegin: '',
      fuelEnd: '',
      milleage: '',
      name: '',
      pathBegin: '',
      pathEnd: ''
    }
  ];
  const component = renderer.create(
    <RowTD
      handler={() => {}}
      doubleClick={() => {}}
      deletePath={() => {}}
      selectPath={{}}
      error={error}
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
    pathEnd: 116312
  };
  const error = [
    {
      ConsumptionFactoryFuel: 15.4,
      addFuel: 0,
      addFuelWinter: 0,
      constFuelChange: 15.4,
      dateBegin: '2018-05-03',
      deltaFuel: 11.24,
      errorFuel: true,
      errorPath: false,
      first: true,
      fuel: 'AI',
      fuelBegin: 40.47,
      fuelEnd: 29.23,
      milleage: 73,
      name: 'уаз',
      pathBegin: 116239,
      pathEnd: 116312
    }
  ];
  const component = renderer.create(
    <RowTD
      handler={() => {}}
      doubleClick={() => {}}
      deletePath={() => {}}
      selectPath={{}}
      error={error}
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
    pathEnd: 116312
  };
  const error = [
    {
      ConsumptionFactoryFuel: 15.4,
      addFuel: 0,
      addFuelWinter: 0,
      constFuelChange: 15.4,
      dateBegin: '2018-05-03',
      deltaFuel: 11.24,
      errorFuel: true,
      errorPath: false,
      first: true,
      fuel: 'AI',
      fuelBegin: 40.47,
      fuelEnd: 29.23,
      milleage: 73,
      name: 'уаз',
      pathBegin: 116239,
      pathEnd: 116312
    }
  ];
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
      handler={() => {}}
      doubleClick={() => {}}
      deletePath={() => {}}
      selectPath={selectPath}
      error={error}
      path={path}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
