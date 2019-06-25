import { handleActions } from 'redux-actions';
import { IPath, ICar, IError, ICoreState, IObj, IWindowId } from '../components/interfaces';
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
  SAVE_UPDATE_PATH 
} from '../constants';

const initialState: ICoreState = {
  cars: [],
  pathLists: {},
  error: [],
  isNewCar: false,
  isNewPath: false,
  selectedCar: '',
  selectPathList: null
};

export const reducer = handleActions<ICoreState, any>(
  {
    [SAVE_UPDATE_PATH]: (state, {payload: result}: { payload: IPath }) => ({
      ...state,
      pathLists: {
        ...state.pathLists,
        [state.selectPathList.name]: state.pathLists[state.selectPathList.name].map((path) => {
          if (path.dateBegin === state.selectPathList.dateBegin) {
            const nextPath = { ...path, ...result };
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
    [CHECK_ERROR_PATH]: (state) => ({
      ...state,
      error: <IError[][]>checkCorrectData(state.cars, state.pathLists)
    }),
    [INFO_CAR_TO_NAME]: (state, {payload: name}: { payload: ICar['name'] }) => ({
      ...state,
      selectedCar: state.selectedCar === name ? null : name,
      pathLists: {
        ...state.pathLists,
        [name]: state.pathLists[name] && [
          ...state.pathLists[name].sort((a, b) => {
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
    [INFO_PATH_REDUCER]: (state, {payload: path}: { payload: IPath }) => ({
      ...state,
      selectPathList: path
    }),
    [DELETE_CAR_TO_NAME]: (state, {payload: name}: { payload: ICar['name'] }) => {
      const pathLists = {};
      Object.keys(state.pathLists)
        .filter(key => key !== name)
        .map(key => {
          pathLists[key] = [...state.pathLists[key]];
        });
      return {
        ...state,
        cars: state.cars.filter((car) => car.name !== name),
        pathLists
      };
    },
    [SAVE_CAR]: (state, {payload: car}: { payload: ICar }) => ({
      ...state,
      cars: state.cars.concat(car)
    }),
    [SET_IS_NEW_CAR]: (state) => ({ ...state, isNewCar: true }),
    [DELETE_PATH_REDUCER]: (state, { payload: path }: { payload: IPath }) => ({
      ...state,
      pathLists: {
        ...state.pathLists,
        [path.name]: state.pathLists[path.name].filter(
          (path) => path.dateBegin !== path.dateBegin
        )
      }
    }),
    [ADD_PATH_REDUCER]: (state, {payload: path}: { payload: IPath }) => ({
      ...state,
      pathLists: {
        ...state.pathLists,
        [path.name]: (state.pathLists[path.name] || []).concat(path)
      }
    }),
    [SET_IS_NEW_PATH]: (state) => ({
      ...state,
      isNewPath: !state.isNewPath
    }),
    [CLOSE_WINDOW]: (state, {payload: windowId}: { payload: IWindowId }) => ({
      ...state,
      [windowId]: false
    }),
    [LOAD_LOCAL_STORAGE]: (state, { payload }: { payload: IObj }) => ({
      ...state,
      cars: payload.cars,
      pathLists: payload.pathLists
    }),
  },
  initialState,
);
