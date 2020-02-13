import { put, takeLatest } from 'redux-saga/effects';
import {
  GET_USER,
  SET_USER,
  USER_FAILURE,
  GET_USER_PLAYLISTS
} from '../types';
import { userService } from '../services';

export function* fetchUser({ type, token }: any) {
  try {
    const user = yield userService.getUser(token);
    yield put({ type: SET_USER, user });
    yield put({ type: GET_USER_PLAYLISTS, token });
  } catch (error) {
    console.error(error)
    yield put({ type: USER_FAILURE, error });
  }
}

export function* fetchUserWatcher() {
  yield takeLatest(GET_USER, fetchUser);
}

export default [ fetchUserWatcher() ];