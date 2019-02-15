import { call, put, takeEvery, all } from 'redux-saga/effects';
import saveToLocalStorage from './components/saveToLocalStorage';

function* fetchUser({payload}) {
  console.log(payload)
  try {
    
    yield put({ type: 'USER_FETCH_SUCCEEDED', nameWindow: payload });
    // yield saveToLocalStorage([{}], [{}]); // достучаться до стора
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* mySaga() {
  yield takeEvery('CLOSE_WINDOW_DISPATCH', fetchUser);
}

function* rootSaga() {
  yield all([
    mySaga(),
  ])
}

export default rootSaga;
