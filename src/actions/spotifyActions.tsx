import { SET_DETAILS, GET_TRACKS } from '../types';

export const setDetails = ({ details }) => ({
  type: SET_DETAILS, details
});

export const getTracks = ({ token, uri, id }) => ({
  type: GET_TRACKS,
  payload: { token, uri, id }
});