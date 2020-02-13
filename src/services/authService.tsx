import axios from 'axios';
import qs from 'qs';

export function getToken(code) {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_SPOTIFY_WEB_API}/api/token`,
    data: qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: `${process.env.REACT_APP_WINAMPIFY_ROOT}${process.env.NODE_ENV === 'development' ? '/develop' : ''}`
    }),
    headers: {
      'Authorization': 'Basic ' + (
        new Buffer(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64')
       ),
      'Content-Type':'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.data);
}

export function refreshToken(refresh_token) {
  axios({
      method: 'post',
      url: `${process.env.REACT_APP_SPOTIFY_WEB_API}/api/token`,
      data: qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
      headers: {
        'Authorization': 'Basic ' + (
          new Buffer(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64')
         ),
        'Content-Type':'application/x-www-form-urlencoded'
      }
  }).then(response => response.data);
}