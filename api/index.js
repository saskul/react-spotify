const express = require('express');
const authController = require("./controllers/auth");

const api = express.Router();
api.use(authController);

module.exports = api;