import { put, takeLatest } from 'redux-saga/effects';
import {
  GET_USER_PLAYLISTS,
  SET_USER_PLAYLISTS,
  SPOTIFY_FAILURE,
  REFRESH_TOKEN,
  GET_TRACKS,
  SET_TRACKS
} from '../types';
import { spotifyService } from '../services';

export function* fetchUserPlaylists({ type, token }: any) {
  try {
    const playlists = yield spotifyService.getUserPlaylists(token);
    yield put({ type: SET_USER_PLAYLISTS, playlists });
    yield put({ type: REFRESH_TOKEN, refresh_token: token['refresh_token'] });
  } catch (error) {
    console.error(error)
    yield put({ type: SPOTIFY_FAILURE, error });
  }
}

export function* fetchUserPlaylistsWatcher() {
  yield takeLatest(GET_USER_PLAYLISTS, fetchUserPlaylists);
}


export function* fetchTracks({ type, payload }: any) {
  const { token, uri, id } = payload;
  try {
    const tracks = yield spotifyService.getTracks({ token, uri });
    yield put({ type: SET_TRACKS, payload: { id, tracks } });
    yield put({ type: REFRESH_TOKEN, refresh_token: token['refresh_token'] || token['access_token'] });
  } catch (error) {
    console.error(error)
    yield put({ type: SPOTIFY_FAILURE, error });
  }
}

export function* fetchTracksWatcher() {
  yield takeLatest(GET_TRACKS, fetchTracks);
}

export default [
  fetchUserPlaylistsWatcher(),
  fetchTracksWatcher()
];