export const GET_NEWS = 'GET_NEWS';
export const NEWS_RECEIVED = 'NEWS_RECEIVED';

export interface News {
  title: string,
  content: string
};

export interface User {
  username: string
};

export const GET_TOKEN = 'GET_TOKEN';
export const SET_TOKEN = 'SET_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const ERROR = 'ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export interface GetTokenAction {
  type: typeof GET_TOKEN,
  code: string
};

export interface Token {
  access_token: string,
  token_type: string,
  expires_in: number,
  refresh_token: string,
  scope: string
}

export interface AuthState {
  token?: Token,
  user?: User
};

export const GET_USER_PLAYLISTS = 'GET_USER_PLAYLISTS';
export const SET_USER_PLAYLISTS = 'SET_USER_PLAYLISTS';
export const SPOTIFY_FAILURE = 'SPOTIFY_FAILURE';

export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';
export const USER_FAILURE = 'USER_FAILURE';