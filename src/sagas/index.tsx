import axios from 'axios';
import qs from 'qs';
import { put, takeLatest, all } from 'redux-saga/effects';
import {
  GET_NEWS,
  NEWS_RECEIVED,
  GET_TOKEN,
  SET_TOKEN,
  REFRESH_TOKEN,
  AUTH_FAILURE
} from '../types';

function* fetchNews() {
  const json = yield fetch(`https://newsapi.org/v1/articles?source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc`)
  .then(response => response.json(), );
  yield put({ type: NEWS_RECEIVED, json: json.articles, });
}

function* actionWatcher() {
     yield takeLatest(GET_NEWS, fetchNews)
}

function* fetchToken({ type, code }: any) {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const client_secret = process.env.REACT_APP_CLIENT_SECRET;
  try {
    const token = yield axios({
      method: 'post',
      url: `${process.env.REACT_APP_SPOTIFY_WEB_API}/api/token`,
      data: qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${process.env.REACT_APP_WINAMPIFY_ROOT}${process.env.NODE_ENV === 'development' ? '/develop' : ''}`
      }),
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
    .then(response => response.data);
    yield put({ type: SET_TOKEN, token });
  } catch (error) {
    yield put({ type: AUTH_FAILURE });
  }
}

function* refreshToken({ type, refresh_token}: any) {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const client_secret = process.env.REACT_APP_CLIENT_SECRET;
  const token = yield axios({
      method: 'post',
      url: `${process.env.REACT_APP_SPOTIFY_WEB_API}/api/token`,
      data: qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        'Content-Type':'application/x-www-form-urlencoded'
      }
  }).then(response => response.data);
  yield put({ type: SET_TOKEN, token });
}

function* getTokenWatcher() {
  yield takeLatest(GET_TOKEN, fetchToken)
}

function* refreshTokenWatcher() {
  yield takeLatest(REFRESH_TOKEN, refreshToken);
}

export default function* rootSaga() {
   yield all([
      actionWatcher(),
      getTokenWatcher(),
      refreshTokenWatcher()
   ]);
}
