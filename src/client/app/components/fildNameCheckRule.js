const fildNameCheckRule = {
  name: /^\S/,
  fuel: /(AI)|(DT)/,
  constFuelChange: /^[0-9]{1,5}/,
  constFuelChangeExt: /^[0-9]{1,5}/,
  dateBegin: /^[0-9]{4}\S[0-9]{2}\S[0-9]{2}$/,
  pathBegin: /^\d+$/,
  pathEnd: /^\d+$/,
  milleage: /^\d+$/,
  fuelBegin: /^\d+/,
  fuelEnd: /^\d+/,
  addFuel: /^\d+/,
  deltaFuel: /^\d+/,
  ConsumptionFactoryFuel: /\d+/,
  addFuelWinter: /^\d+/,
  extension: /(true)|(false)/
};
export default fildNameCheckRule;
