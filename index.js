require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./api');

const { HOST_PORT, PORT } = process.env;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/api', api);
app.use(express.static(path.join(__dirname, 'build')));

app.get('/develop', (req, res) => {
	    res.redirect(`http://localhost:${PORT}?code=${req.query.code}`);
});
	app.get('/', (req, res) => {
		  if (req.query.code) {
			      res.redirect(`?code=${req.query.code}`);
			    } else {
				        res.redirect(proces.env.REACT_APP_WINAMPIFY);
				      }
	});

	app.listen(HOST_PORT, () => {
			  console.log(`Server is listening on port ${HOST_PORT}`);
	});

