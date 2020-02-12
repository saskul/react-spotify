const express = require('express');

const {
	  PORT,
	  SPOTIFY_WEB_API,
	  SPOTIFY_CLIENT_ID,
	  SPOTIFY_SECRET,
	  SPOTIFY_REDIRECT_URI,
	  SPOTIFY_REDIRECT_URI_DEV,
	  SPOTIFY_SCOPES
} = process.env;

const authController = express.Router();

authController.get('/develop', (req, res) => {
	  res.redirect(
	    `${SPOTIFY_WEB_API}/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI_DEV}&response_type=code`
	  );
});

authController.get('/', (req, res) => {
	  res.redirect(
	    `${SPOTIFY_WEB_API}/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI}&response_type=code`
	  );
});

module.exports = authController;