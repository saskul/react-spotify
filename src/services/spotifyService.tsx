import axios from 'axios';
import getHeaders from './getHeaders';

export function getUserPlaylists(token) {
  return axios({
      url: `${process.env.REACT_APP_SPOTIFY_API}/me/playlists`,
      headers: getHeaders(token['access_token'])
  })
  .then(response => response.data);
}