require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const {
	  PORT,
	  REACT_APP_PORT,
	  SPOTIFY_WEB_API,
	  SPOTIFY_CLIENT_ID,
	  SPOTIFY_SECRET,
	  SPOTIFY_REDIRECT_URI,
	  SPOTIFY_REDIRECT_URI_DEV,
	  SPOTIFY_SCOPES
} = process.env;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/authorize/develop', (req, res) => {
	  res.redirect(
	    `${SPOTIFY_WEB_API}/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI_DEV}&response_type=code`
	  );
});

app.get('/authorize', (req, res) => {
	  res.redirect(
	    `${SPOTIFY_WEB_API}/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI}&response_type=code`
	  );
});

app.get('/develop', (req, res) => {
    res.redirect(`http://localhost:${REACT_APP_PORT}?code=${req.query.code}`);
});

app.get('/', (req, res) => {
	  res.send("Hello, world!");
});

app.listen(PORT, () => {
	  console.log(`Server is listening on port ${PORT}`);
});
