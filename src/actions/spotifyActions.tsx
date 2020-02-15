import { SET_DETAILS, GET_TRACKS, GET_TRACK } from '../types';

export const setDetails = ({ details }) => ({
  type: SET_DETAILS, details
});

export const getTracks = ({ token, uri, id }) => ({
  type: GET_TRACKS,
  payload: { token, uri, id }
});

export const getTrack = ({ token, id }) => ({
  type: GET_TRACK,
  payload: { token, id }
});