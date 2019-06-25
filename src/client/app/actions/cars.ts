import { createAction } from 'redux-actions';
import { IPath, ICar, IObj, ICoreState, IWindowId } from '../components/interfaces';
import {
  INFO_CAR_TO_NAME,
  SET_IS_NEW_CAR,
  DELETE_CAR_TO_NAME,
  CLOSE_WINDOW,
  SAVE_CAR,
  LOAD_LOCAL_STORAGE,
  SAVE_LOCAL_STORAGE,
  SAVE_LOCALSTORAGE_BEGIN,
  SAVE_LOCALSTORAGE_SUCCESSED,
  SAVE_LOCALSTORAGE_FAILED,
  INIT_LOAD_LOCAL_STORAGE
} from '../constants';

export const infoCarToName = createAction(INFO_CAR_TO_NAME, (name: ICar['name']) => name );
export const deleteCarToName = createAction(DELETE_CAR_TO_NAME, (name: ICar['name']) => name );
export const addNewCar = createAction(SET_IS_NEW_CAR);
export const saveCar = createAction(SAVE_CAR, (car: ICar) => car );
export const closeWindow = createAction(CLOSE_WINDOW, (windowId: IWindowId) => windowId );
export const loadLocalStorage = createAction(LOAD_LOCAL_STORAGE, (obj: IObj) => obj);

export const initLoad = createAction(INIT_LOAD_LOCAL_STORAGE);
export const saveToLocalStorageAction = createAction(SAVE_LOCAL_STORAGE, (obj: IObj) => obj);

export const saveLocalStorageBeginAction = createAction(SAVE_LOCALSTORAGE_BEGIN);
export const saveLocalStorageSuccessedAction = createAction(SAVE_LOCALSTORAGE_SUCCESSED);
export const saveLocalStorageFailedAction = createAction(SAVE_LOCALSTORAGE_FAILED, (message) => message );
