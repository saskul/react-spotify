import axios from 'axios';
import getHeaders from './getHeaders';

export function getUserPlaylists(token) {
  return axios({
      url: `${process.env.REACT_APP_SPOTIFY_API}/me/playlists`,
      headers: getHeaders(token['access_token'])
  })
  .then(response => response.data);
}

export function getTracks({ token, uri }) {
  return axios({
      url: uri,
      headers: getHeaders(token['access_token'])
  })
  .then(response => response.data);
}


export function getTrack({ token, id }) {
  return axios({
      url: `${process.env.REACT_APP_SPOTIFY_API}/tracks/${id}`,
      headers: getHeaders(token['access_token'])
  })
  .then(response => response.data);
}