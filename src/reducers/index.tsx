import { combineReducers } from 'redux';
import auth from './authReducer';
import errors from './errorsReducer';
import spotify from './spotifyReducer';

export default combineReducers({
  auth,
  errors,
  spotify
});