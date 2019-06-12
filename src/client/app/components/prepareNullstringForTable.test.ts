import prep from './prepareNullstringForTable';

test('adds null stirng in array', () => {
  const arr = [];
  const result = [
    {
      name: null,
      fuel: null,
      constFuelChange: null,
      dateBegin: null,
      pathBegin: null,
      pathEnd: null,
      milleage: null,
      fuelBegin: null,
      fuelEnd: null,
      addFuel: null,
      deltaFuel: null,
      ConsumptionFactoryFuel: null,
      addFuelWinter: null,
      constFuelChangeExt: null,
      extension: null
    }
  ];
  expect(prep(arr, 1)).toEqual(result);
});
