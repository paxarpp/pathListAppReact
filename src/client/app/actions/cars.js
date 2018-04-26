import { createAction } from 'redux-actions';

export const deleteCarReducer = createAction('DELETE_CAR_REDUCER');
export const addCarReducer = createAction('ADD_CAR_REDUCER');
export const setIsNewCar = createAction('SET_IS_NEW_CAR');
export const closeWindowDispatch = createAction('CLOSE_WINDOW_DISPATCH');
export const InfoCarReducer = createAction('INFO_CAR_REDUCER');


export const infoCarToName = (dispatch, name) => {
    dispatch(InfoCarReducer(name))
}
export const deleteCarToName = (dispatch, name) => {
    dispatch(deleteCarReducer(name))
}

export const addNewCar = (dispatch) => {
    dispatch(setIsNewCar())
}
export const saveCar = (dispatch, car) => {
    dispatch(addCarReducer(car))
}
export const closeWindow = (dispatch, windowId) => {
    dispatch(closeWindowDispatch(windowId))
   
}