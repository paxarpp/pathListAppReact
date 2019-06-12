import { handleActions } from 'redux-actions';
import { IPath, ICar, IError, IPathLists } from '../components/interfaces';
import checkCorrectData from '../components/checkCorrectData';

import {
  DELETE_CAR_TO_NAME,
  SAVE_CAR,
  SET_IS_NEW_CAR,
  CLOSE_WINDOW,
  INFO_CAR_TO_NAME,
  LOAD_LOCAL_STORAGE,
  DELETE_PATH_REDUCER,
  ADD_PATH_REDUCER,
  SET_IS_NEW_PATH,
  INFO_PATH_REDUCER,
  CHECK_ERROR_PATH, 
  SAVE_UPDATE_DATA 
} from '../constants';

interface IAction {
  type: string;
  payload?: any;
}
interface IState {
  cars: ICar[];
  pathLists: IPathLists;
  error: IError[];
  isNewCar: boolean;
  isNewPath: boolean;
  selectedCar: string;
  selectPathList?: IPath;
}

const initialState: IState = {
  cars: <ICar[]>[],
  pathLists: {},
  error: <IError[]>[],
  isNewCar: <boolean>false,
  isNewPath: <boolean>false,
  selectedCar: <string>'',
  selectPathList: null
};

export const reducer = handleActions(
  {
    [SAVE_UPDATE_DATA]: (state: IState, action: IAction) => ({
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
      }),
    [CHECK_ERROR_PATH]: (state: IState) => ({
        ...state,
        error: <IError[][]>checkCorrectData(state.cars, state.pathLists)
      }),
    [INFO_CAR_TO_NAME]: (state, { payload }: { payload: string }) => ({
        ...state,
        selectedCar: state.selectedCar === payload ? null : payload,
        pathLists: {
          ...state.pathLists,
          [payload]: state.pathLists[payload] && [
            ...state.pathLists[payload].sort((a: IPath, b: IPath) => {
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
      }),
    [INFO_PATH_REDUCER]: (state, action: IAction) => ({
        ...state,
        selectPathList: action.payload
      }),
    [DELETE_CAR_TO_NAME]: (state, { payload }: { payload: string }) => {
      const pathLists = {};
      Object.keys(state.pathLists)
        .filter(key => key !== payload)
        .map(key => {
          pathLists[key] = [...state.pathLists[key]];
        });
      return {
        ...state,
        cars: state.cars.filter((car: ICar) => car.name !== payload),
        pathLists
      };
    },
    [SAVE_CAR]: (state, { payload }: { payload: ICar} ) => ({
        ...state,
        cars: state.cars.concat(payload)
      }),
    [SET_IS_NEW_CAR]: state => ({ ...state, isNewCar: true }),
    [DELETE_PATH_REDUCER]: (state, action: IAction) => ({
        ...state,
        pathLists: {
          ...state.pathLists,
          [action.payload.name]: state.pathLists[action.payload.name].filter(
            (path: IPath) => path.dateBegin !== action.payload.dateBegin
          )
        }
      }),
    [ADD_PATH_REDUCER]: (state, { payload }) => ({
        ...state,
        pathLists: {
          ...state.pathLists,
          [payload.name]: (state.pathLists[payload.name] || []).concat(payload)
        }
      }),
    [SET_IS_NEW_PATH]: state => ({
        ...state,
        isNewPath: !state.isNewPath
      }),
    [CLOSE_WINDOW]: (state, action: IAction) => ({
        ...state,
        [action.payload]: false
    }),
    [LOAD_LOCAL_STORAGE]: (state, action: IAction) => ({
        ...state,
        cars: action.payload.cars,
        pathLists: action.payload.pathLists
      }),
  },
  initialState
);
