export default function getHeaders(access_token) {
  return {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type':'application/x-www-form-urlencoded'
  };
}