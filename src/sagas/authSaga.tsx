import { put, takeLatest } from 'redux-saga/effects';
import {
  GET_TOKEN,
  SET_TOKEN,
  REFRESH_TOKEN,
  AUTH_FAILURE,
  GET_USER
} from '../types';
import { authService } from '../services';

export function* fetchToken({ type, code }: any) {
  try {
    const token = yield authService.getToken(code);
    yield put({ type: SET_TOKEN, token });
    yield put({ type: GET_USER, token });
  } catch (error) {
    yield put({ type: AUTH_FAILURE });
  }
}

export function* refreshToken({ type, refresh_token}: any) {
  const token = yield authService.refreshToken(refresh_token);
  yield put({ type: SET_TOKEN, token });
}

export function* getTokenWatcher() {
  yield takeLatest(GET_TOKEN, fetchToken)
}

export function* refreshTokenWatcher() {
  yield takeLatest(REFRESH_TOKEN, refreshToken);
}

export default [ getTokenWatcher(), refreshTokenWatcher() ]