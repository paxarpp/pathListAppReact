import calc from './calculateFieldPath';

test('adds calculateFieldPath to equal correct Matn.round', () => {
  const path = {
    dateBegin: '01-01-2021',
    name: 'test',
    addFuel: '12.125',
    constFuelChange: 14.425,
    constFuelChangeExt: 125.1525,
    deltaFuel: 12.115,
    fuelBegin: 12.105,
    fuelEnd: 12.1425,
    milleage: 12.495,
    pathBegin: 12.125,
    pathEnd: 12.925,
    addFuelWinter: 12.825,
    ConsumptionFactoryFuel: '12.025'
  };
  const result = {
    dateBegin: '01-01-2021',
    name: 'test',
    addFuel: 12.13,
    constFuelChange: 14.43,
    constFuelChangeExt: 125.15,
    deltaFuel: 12.12,
    fuelBegin: 12.11,
    fuelEnd: 12.14,
    milleage: 12,
    pathBegin: 12,
    pathEnd: 13,
    addFuelWinter: 12.83,
    ConsumptionFactoryFuel: 12.03
  };
  expect(calc(path)).toEqual(result);
});
