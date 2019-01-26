import { IPath } from './interfaces';

const calculateFieldPath = (path: IPath) => {
  path.addFuel = Math.round(+path.addFuel * 100) / 100;
  path.constFuelChange = Math.round(+path.constFuelChange * 100) / 100;
  path.constFuelChangeExt = Math.round(+path.constFuelChangeExt * 100) / 100;
  path.deltaFuel = Math.round(+path.deltaFuel * 100) / 100;
  path.fuelBegin = Math.round(+path.fuelBegin * 100) / 100;
  path.fuelEnd = Math.round(+path.fuelEnd * 100) / 100;
  path.milleage = Math.round(+path.milleage);
  path.pathBegin = Math.round(+path.pathBegin);
  path.pathEnd = Math.round(+path.pathEnd);
  path.addFuelWinter = Math.round(+path.addFuelWinter * 100) / 100;
  path.ConsumptionFactoryFuel = Math.round(+path.ConsumptionFactoryFuel * 100) / 100;
  return path;
};
export default calculateFieldPath;
