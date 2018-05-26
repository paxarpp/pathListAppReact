import { createAction } from 'redux-actions';

export const deleteCarReducer = createAction('DELETE_CAR_REDUCER');
export const addCarReducer = createAction('ADD_CAR_REDUCER');
export const setIsNewCar = createAction('SET_IS_NEW_CAR');
export const closeWindowDispatch = createAction('CLOSE_WINDOW_DISPATCH');
export const InfoCarReducer = createAction('INFO_CAR_REDUCER');
export const loadLocalStorageDispatch = createAction('LOAD_LOCAL_STORAGE_DISPATCH');

export const infoCarToName = (dispatch, name) => {
  dispatch(InfoCarReducer(name));
};
export const deleteCarToName = (dispatch, name) => {
  dispatch(deleteCarReducer(name));
};
export const addNewCar = dispatch => {
  dispatch(setIsNewCar());
};
export const saveCar = (dispatch, car) => {
  dispatch(addCarReducer(car));
};
export const closeWindow = (dispatch, windowId) => {
  dispatch(closeWindowDispatch(windowId));
};
export const loadLocalStorage = dispatch => {
  const obj = {};
  obj.cars = localStorage.hasOwnProperty('cars') ? JSON.parse(localStorage.getItem('cars')) : [];
  obj.pathLists = localStorage.hasOwnProperty('pathLists') ? JSON.parse(localStorage.getItem('pathLists')) : [];
  dispatch(loadLocalStorageDispatch(obj));
};
