require("dotenv").config();
const express = require("express");
const app = express();
const createURI = require("./src/helpers/createURI");

const {
  PORT,
  SPOTIFY_WEB_API,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_SECRET,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_SCOPES
} = process.env;

app.get('/authorize', (req, res) => {
  const uri = createURI(SPOTIFY_WEB_API, {
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    // state: 'TO-DO: set cookie',
    scope: SPOTIFY_SCOPES
  });
  fetch(uri)
  .then(result => result.json())
  .then(result => res.json(result))
  .catch(err => res.status(404).json({ error: err }))
});

app.get('/', (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});