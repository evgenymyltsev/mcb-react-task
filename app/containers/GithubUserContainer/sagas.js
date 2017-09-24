import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { request, postRequest } from 'utils/request';

import * as actions from './actions';

// Individual exports for testing
export function* loadDataSaga(action) {
  if (action.payload.hasOwnProperty('userName')) {
    try {
      const result = yield call(request, `users/${action.payload.userName}/repos`);
      yield put(actions.userLoaded(result));
    } catch (error) {
      alert(`Похоже, пользователь ${action.payload.userName} не существует.`)
    }
  } else if (action.payload.hasOwnProperty('repoName')) {
    const result = yield call(request, `repos/${action.payload.repoName}/commits`);
    yield put(actions.commitsLoaded(result.slice(0,10)));
  }

}

export function* defaultSaga() {
  while (true) {
    const user = yield take(actions.loadUser);
    yield call (loadDataSaga, user);
  }
}

// All sagas to be loaded
export default [
  defaultSaga
];
