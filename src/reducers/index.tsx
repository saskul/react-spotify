import { combineReducers } from 'redux';
import auth from './authReducer';
import errors from './errorsReducer';
import spotify from './spotifyReducer';
import user from './userReducer';
import theme from './themeReducer';

export default combineReducers({
  auth,
  errors,
  spotify,
  user,
  theme
});