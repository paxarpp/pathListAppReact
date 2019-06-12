import { createAction } from 'redux-actions';
import { IPath } from '../components/interfaces';
import {
  INFO_PATH_REDUCER,
  DELETE_PATH_REDUCER,
  SET_IS_NEW_PATH,
  ADD_PATH_REDUCER,
  CHECK_ERROR_PATH,
  SAVE_UPDATE_DATA
} from '../constants';

export const infoPathToName = createAction(INFO_PATH_REDUCER, (name: string) => name);
export const deletePathToName = createAction(DELETE_PATH_REDUCER, (path: IPath) => path);
export const addNewPath = createAction(SET_IS_NEW_PATH, () => ({}));
export const savePath = createAction(ADD_PATH_REDUCER, (path: IPath) => path);

export const checkError = createAction(CHECK_ERROR_PATH, () => ({}));
export const saveUpdateData = createAction(SAVE_UPDATE_DATA, (result) => result);
