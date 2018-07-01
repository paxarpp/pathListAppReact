import check from './checkCorrectData';

test('check no error', () => {
  const cars = [
    {
      name: 'test1',
      fuel: 'AI',
      constFuelChange: 20,
      constFuelChangeExt: '',
      extension: 'false'
    },
    {
      name: 'test2',
      fuel: 'DT',
      constFuelChange: 30,
      constFuelChangeExt: 35,
      extension: 'true'
    }
  ];
  const pathLists = [
    {
      name: 'test1',
      fuel: 'AI',
      constFuelChange: 20,
      dateBegin: '01-01-2018',
      pathBegin: 100,
      pathEnd: 200,
      milleage: 100,
      fuelBegin: 10.25,
      fuelEnd: 12.25,
      addFuel: 22,
      deltaFuel: 20,
      ConsumptionFactoryFuel: 20,
      addFuelWinter: '',
      constFuelChangeExt: '',
      extension: 'false'
    },
    {
      name: 'test1',
      fuel: 'AI',
      constFuelChange: 20,
      dateBegin: '02-01-2018',
      pathBegin: 200,
      pathEnd: 300,
      milleage: 100,
      fuelBegin: 12.25,
      fuelEnd: 12.25,
      addFuel: 20,
      deltaFuel: 20,
      ConsumptionFactoryFuel: 20,
      addFuelWinter: '',
      constFuelChangeExt: '',
      extension: 'false'
    },
    {
      name: 'test2',
      fuel: 'DT',
      constFuelChange: 30,
      dateBegin: '01-01-2018',
      pathBegin: 0,
      pathEnd: 200,
      milleage: 200,
      fuelBegin: 0,
      fuelEnd: 10,
      addFuel: 70,
      deltaFuel: 60,
      ConsumptionFactoryFuel: 30,
      addFuelWinter: '',
      constFuelChangeExt: '',
      extension: 'false'
    }
  ];
  const result = [];
  expect(check(cars, pathLists)).toEqual(result);
});

test('check 2error', () => {
  const cars = [
    {
      name: 'test1',
      fuel: 'AI',
      constFuelChange: 20,
      constFuelChangeExt: '',
      extension: 'false'
    },
    {
      name: 'test2',
      fuel: 'DT',
      constFuelChange: 30,
      constFuelChangeExt: 35,
      extension: 'true'
    }
  ];
  const pathLists = [
    {
      name: 'test1',
      fuel: 'AI',
      constFuelChange: 20,
      dateBegin: '01-01-2018',
      pathBegin: 100,
      pathEnd: 200,
      milleage: 100,
      fuelBegin: 10.25,
      fuelEnd: 12.25,
      addFuel: 22,
      deltaFuel: 20,
      ConsumptionFactoryFuel: 20,
      addFuelWinter: '',
      constFuelChangeExt: '',
      extension: 'false'
    },
    {
      name: 'test1',
      fuel: 'AI',
      constFuelChange: 20,
      dateBegin: '02-01-2018',
      pathBegin: 200,
      pathEnd: 300,
      milleage: 100,
      fuelBegin: 10.25,
      fuelEnd: 10.25,
      addFuel: 20,
      deltaFuel: 20,
      ConsumptionFactoryFuel: 20,
      addFuelWinter: '',
      constFuelChangeExt: '',
      extension: 'false'
    },
    {
      name: 'test2',
      fuel: 'DT',
      constFuelChange: 30,
      dateBegin: '01-01-2018',
      pathBegin: 0,
      pathEnd: 200,
      milleage: 200,
      fuelBegin: 0,
      fuelEnd: 10,
      addFuel: 70,
      deltaFuel: 60,
      ConsumptionFactoryFuel: 30,
      addFuelWinter: '',
      constFuelChangeExt: '',
      extension: 'false'
    }
  ];
  const result = [
    {
      ConsumptionFactoryFuel: 20,
      addFuel: 22,
      addFuelWinter: '',
      constFuelChange: 20,
      constFuelChangeExt: '',
      dateBegin: '01-01-2018',
      deltaFuel: 20,
      errorFuel: true,
      errorPath: false,
      extension: 'false',
      first: true,
      last: false,
      fuel: 'AI',
      fuelBegin: 10.25,
      fuelEnd: 12.25,
      milleage: 100,
      name: 'test1',
      pathBegin: 100,
      pathEnd: 200
    },
    {
      ConsumptionFactoryFuel: 20,
      addFuel: 20,
      addFuelWinter: '',
      constFuelChange: 20,
      constFuelChangeExt: '',
      dateBegin: '02-01-2018',
      deltaFuel: 20,
      errorFuel: true,
      errorPath: false,
      extension: 'false',
      first: false,
      last: true,
      fuel: 'AI',
      fuelBegin: 10.25,
      fuelEnd: 10.25,
      milleage: 100,
      name: 'test1',
      pathBegin: 200,
      pathEnd: 300
    }
  ];
  expect(check(cars, pathLists)).toEqual(result);
});
