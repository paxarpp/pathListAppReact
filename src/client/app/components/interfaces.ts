export interface IPath {
    addFuel: number;
    constFuelChange: number; 
    constFuelChangeExt: number; 
    deltaFuel: number; 
    fuelBegin: number; 
    fuelEnd: number; 
    milleage: number; 
    pathBegin: number; 
    pathEnd: number; 
    dateBegin: number; 
    dateEnd: number; 
    addFuelWinter: number; 
    ConsumptionFactoryFuel: number;
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
