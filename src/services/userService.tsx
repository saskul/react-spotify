import axios from 'axios';
import getHeaders from './getHeaders';

export function getUser(token) {
  return axios({
      url: `${process.env.REACT_APP_SPOTIFY_API}/me`,
      headers: getHeaders(token['access_token'])
  })
  .then(response => response.data);
}