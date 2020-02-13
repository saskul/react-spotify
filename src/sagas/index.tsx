import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import spotifySaga from './spotifySaga';
import userSaga from './userSaga';

export default function* rootSaga() {
   yield all([
      ...authSaga,
      ...spotifySaga,
      ...userSaga
   ]);
}
