import { put, takeLatest } from 'redux-saga/effects';
import {
  GET_USER,
  SET_USER,
  USER_FAILURE,
  GET_USER_PLAYLISTS,
  REFRESH_TOKEN
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
    if (error.response && error.response.status === '401') {
        yield put({ type: REFRESH_TOKEN, refresh_token: token['refresh_token'] || token['access_token'] });
    }
  }
}

export function* fetchUserWatcher() {
  yield takeLatest(GET_USER, fetchUser);
}

export default [ fetchUserWatcher() ];