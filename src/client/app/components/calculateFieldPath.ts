import { IPath } from './interfaces';

const fieldNeedNumberRoundTwo = [
  'addFuel',
  'constFuelChange',
  'fuelBegin',
  'deltaFuel',
  'fuelEnd',,
  'addFuelWinter',
  'ConsumptionFactoryFuel',
];
const fieldNeedNumberRound = [
  'milleage',
  'pathBegin',
  'pathEnd',
];

const roundTwo = (value: IPath[keyof IPath]): number => Math.round(+value * 100) / 100;
const round = (field: IPath[keyof IPath]): number => Math.round(+field);

const calculateFieldPath = <T extends IPath>(pathPrev: T) => {
  const path = {...pathPrev};
  path.constFuelChangeExt = path.constFuelChangeExt ? roundTwo(path.constFuelChangeExt) : null;
  fieldNeedNumberRoundTwo.map(key => path[key] = roundTwo(path[key]));
  fieldNeedNumberRound.map(key => path[key] = round(path[key]));
  return path; 
};

export default calculateFieldPath;
