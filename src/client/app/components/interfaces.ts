export interface IPathBase {
  addFuel: number;
  constFuelChange: number;
  deltaFuel: number;
  fuelBegin: number;
  fuelEnd: number;
  milleage: number;
  pathBegin: number;
  pathEnd: number;
  addFuelWinter: number;
  ConsumptionFactoryFuel: number;
  constFuelChangeExt: number;
}
export interface IPath extends IPathBase {
  dateBegin: string;
  name: string;
}

export interface ICar {
  name: string;
  constFuelChange: number;
  fuel: string;
  extension: boolean;
  constFuelChangeExt: number;
}

export interface IError extends IPath {
  errorPath: boolean;
  errorFuel: boolean;
  first: boolean;
  last: boolean;
}

export interface IPathLists {
  [key: string]: IPath[];
};
