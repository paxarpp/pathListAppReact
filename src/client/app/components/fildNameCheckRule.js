const fildNameCheckRule = {
    name: /^\S/,
    fuel: /{AI}||{DT}/,
    constFuelChange: /[0-9]{1,4}/,
    dateBegin: /\S/,
    pathBegin: /\d+/,
    pathEnd: /\d+/,
    milleage: /^\d+$/,
    fuelBegin: /\d+/,
    fuelEnd: /\d+/,
    addFuel: /\d+/,
    deltaFuel: /\d+/,
    ConsumptionFactoryFuel:/\d+/,
    addFuelWinter:/\d+/
}
export default fildNameCheckRule;
