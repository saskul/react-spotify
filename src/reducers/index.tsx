import { combineReducers } from 'redux';
import auth from './authReducer';
import errors from './errorsReducer';
import spotify from './spotifyReducer';
import user from './userReducer';

export default combineReducers({
  auth,
  errors,
  spotify,
  user
});