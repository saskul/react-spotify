import { GET_TOKEN, SET_TOKEN, REFRESH_TOKEN } from '../types';

export const getToken = ({ code }) => ({
  type: GET_TOKEN, code
});

export const setToken = ({ token }) => ({
  type: SET_TOKEN, token
});

export const refreshToken = ({ refresh_token }) => ({
  type: REFRESH_TOKEN, refresh_token
});