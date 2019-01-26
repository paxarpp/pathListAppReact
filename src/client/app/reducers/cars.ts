import { handleActions } from 'redux-actions';
import { IPath, ICar, IError } from '../components/interfaces';
import checkCorrectData from '../components/checkCorrectData';

import {
  deleteCarReducer,
  addCarReducer,
  setIsNewCar,
  closeWindowDispatch,
  InfoCarReducer,
  loadLocalStorageDispatch
} from '../actions/cars';
import {
  deletePathReducer,
  addPathReducer,
  setIsNewPath,
  infoPathReducer,
  checkErrorPath,
  saveUpdateDataR
} from '../actions/pathLists';

interface IAction {
  type: string;
  payload?: any;
}

const initialState = {
  cars: <ICar[]>[],
  pathLists: {},
  error: <IError[]>[],
  isNewCar: <boolean>false,
  isNewPath: <boolean>false,
  selectedCar: <string>'',
  selectPathList: <string>''
};

export const reducer = handleActions(
  {
    [saveUpdateDataR]: (state, action: IAction) => {
      return {
        ...state,
        pathLists: {
          ...state.pathLists,
          [state.selectPathList.name]: state.pathLists[state.selectPathList.name].map((path: IPath) => {
            if (path.dateBegin === state.selectPathList.dateBegin) {
              const nextPath = { ...path, ...action.payload };
              nextPath.milleage = Math.round((+nextPath.pathEnd - +nextPath.pathBegin) * 100) / 100;
              nextPath.ConsumptionFactoryFuel =
                Math.round(((+nextPath.milleage * +nextPath.constFuelChange) / 100) * 100) / 100;
              nextPath.fuelEnd =
                Math.round(
                  (+nextPath.fuelBegin +
                    +nextPath.addFuel +
                    +nextPath.addFuelWinter -
                    +nextPath.ConsumptionFactoryFuel) *
                    100
                ) / 100;
              nextPath.deltaFuel =
                Math.round(
                  (+nextPath.fuelBegin + +nextPath.addFuel + +nextPath.addFuelWinter - +nextPath.fuelEnd) * 100
                ) / 100;
              return nextPath;
            }
            return path;
          })
        }
      };
    },
    [checkErrorPath]: state => {
      return {
        ...state,
        error: <IError[]>checkCorrectData(state.cars, state.pathLists)
      };
    },
    [InfoCarReducer]: (state, action: IAction) => {
      return {
        ...state,
        selectedCar: state.selectedCar === action.payload ? null : action.payload,
        pathLists: {
          ...state.pathLists,
          [action.payload]: state.pathLists[action.payload] && [
            ...state.pathLists[action.payload].sort((a: IPath, b: IPath) => {
              if (a.dateBegin < b.dateBegin) {
                return -1;
              } else if (a.dateBegin > b.dateBegin) {
                return 1;
              } else {
                return 0;
              }
            })
          ]
        }
      };
    },
    [infoPathReducer]: (state, action: IAction) => {
      return {
        ...state,
        selectPathList: action.payload
      };
    },
    [deleteCarReducer]: (state, action: IAction) => {
      const pathLists = {};
      Object.keys(state.pathLists)
        .filter(key => key !== action.payload)
        .map(key => {
          pathLists[key] = [...state.pathLists[key]];
        });
      return {
        ...state,
        cars: state.cars.filter((car: ICar) => car.name !== action.payload),
        pathLists
      };
    },
    [addCarReducer]: (state, action: IAction) => {
      return {
        ...state,
        cars: state.cars.concat(action.payload)
      };
    },
    [setIsNewCar]: state => {
      return {
        ...state,
        isNewCar: true
      };
    },
    [deletePathReducer]: (state, action: IAction) => {
      return {
        ...state,
        pathLists: {
          ...state.pathLists,
          [action.payload.name]: state.pathLists[action.payload.name].filter(
            (path: IPath) => path.dateBegin !== action.payload.dateBegin
          )
        }
      };
    },
    [addPathReducer]: (state, action: IAction) => {
      return {
        ...state,
        pathLists: {
          ...state.pathLists,
          [action.payload.name]: (state.pathLists[action.payload.name] || []).concat(action.payload)
        }
      };
    },
    [setIsNewPath]: state => {
      return {
        ...state,
        isNewPath: !state.isNewPath
      };
    },
    [closeWindowDispatch]: (state, action: IAction) => {
      return {
        ...state,
        [action.payload]: false
      };
    },
    [loadLocalStorageDispatch]: (state, action: IAction) => {
      return {
        ...state,
        cars: action.payload.cars,
        pathLists: action.payload.pathLists
      };
    }
  },
  initialState
);
