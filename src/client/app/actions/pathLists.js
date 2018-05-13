import {
    createAction
} from 'redux-actions';

import {
    closeWindowDispatch
} from './cars'

export const deletePathReducer = createAction('DELETE_PATH_REDUCER');
export const addPathReducer = createAction('ADD_PATH_REDUCER');
export const setIsNewPath = createAction('SET_IS_NEW_PATH');
export const infoPathReducer = createAction('INFO_PATH_REDUCER');
export const checkErrorPath = createAction('CHECK_ERROR_PATH');
export const saveUpdateDataR = createAction('SAVE_UPDATE_DATA');

export const infoPathToName = (dispatch, name) => {
    dispatch(infoPathReducer(name))
}
export const deletePathToName = (dispatch, path) => {
    dispatch(deletePathReducer(path))
}
export const addNewPath = (dispatch) => {
    dispatch(setIsNewPath())
}
export const savePath = (dispatch, path) => {
    dispatch(addPathReducer(path))
}
export const checkError = (dispatch) => {
    dispatch(checkErrorPath())
}
export const saveUpdateData = (dispatch, result) => {
    dispatch(saveUpdateDataR(result))
    dispatch(checkErrorPath())
}