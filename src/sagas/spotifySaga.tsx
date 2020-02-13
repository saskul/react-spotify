import { put, takeLatest } from 'redux-saga/effects';
import {
  GET_USER_PLAYLISTS,
  SET_USER_PLAYLISTS,
  SPOTIFY_FAILURE
} from '../types';
import { spotifyService } from '../services';

export function* fetchUserPlaylists({ type, token }: any) {
  try {
    const playlists = yield spotifyService.getUserPlaylists(token);
    yield put({ type: SET_USER_PLAYLISTS, playlists });
  } catch (error) {
    yield put({ type: SPOTIFY_FAILURE });
  }
}

export function* fetchUserPlaylistsWatcher() {
  yield takeLatest(GET_USER_PLAYLISTS, fetchUserPlaylists);
}

export default [ fetchUserPlaylistsWatcher() ];