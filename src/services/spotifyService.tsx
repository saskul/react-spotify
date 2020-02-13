import axios from 'axios';

export function getHeaders(token) {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type':'application/x-www-form-urlencoded'
  };
}

export function getUserPlaylists({ token }) {
  axios({
      url: `${process.env.REACT_APP_SPOTIFY_API}/me/playlists`,
      headers: getHeaders(token)
  }).then(response => response.data);
}