import { call, put, takeEvery, all } from 'redux-saga/effects';
import saveToLocalStorage from './components/saveToLocalStorage';
import { SAVE_LOCAL_STORAGE, INIT_LOAD_LOCAL_STORAGE } from './constants';
import {
  saveLocalStorageBeginAction,
  saveLocalStorageSuccessedAction,
  saveLocalStorageFailedAction,
  loadLocalStorage
} from './actions/cars';

function* saveToLS({ payload: { cars, pathLists } }) {
  try {
    yield put(saveLocalStorageBeginAction());
    yield call(saveToLocalStorage, cars, pathLists);
    yield put(saveLocalStorageSuccessedAction());
  } catch (e) {
    yield put(saveLocalStorageFailedAction(e.message));
  }
}
function* loadFromLS() {
  const obj = { cars: null, pathLists: null };
    obj.cars = localStorage.hasOwnProperty('cars')
      ? JSON.parse(localStorage.getItem('cars'))
      : [];
    obj.pathLists = localStorage.hasOwnProperty('pathLists')
      ? JSON.parse(localStorage.getItem('pathLists'))
      : {};
  return obj;
}

function* initLoad() {
  try {
    const response = yield call(loadFromLS);
    yield put(loadLocalStorage(response));
  } catch (err) {
    alert(
      `ошибка при загрузке данных, попробуйте перезапустить программу. ${err}`
    );
  }
}

function* mySaga() {
  yield takeEvery(SAVE_LOCAL_STORAGE, saveToLS);
  yield takeEvery(INIT_LOAD_LOCAL_STORAGE, initLoad);
}

function* rootSaga() {
  yield all([
    mySaga(),
  ])
}

export default rootSaga;
