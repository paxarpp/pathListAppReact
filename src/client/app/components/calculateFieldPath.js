const calculateFieldPath = (path) => {
path.addFuel = Math.round(+path.addFuel * 100) / 100;
path.constFuelChange = Math.round(+path.constFuelChange * 100) / 100;
path.deltaFuel = Math.round(+path.deltaFuel * 100) / 100;
path.fuelBegin = Math.round(+path.fuelBegin * 100) / 100;
path.fuelEnd = Math.round(+path.fuelEnd * 100) / 100;
path.milleage = Math.round(+path.milleage * 100) / 100;
path.pathBegin = Math.round(+path.pathBegin * 100) / 100;
path.pathEnd = Math.round(+path.pathEnd * 100) / 100;
path.ConsumptionFactoryFuel =  Math.round((path.milleage * path.constFuelChange)) / 100;
    return path;
}
export default calculateFieldPath;
