const express = require('express');
const authController = require("./controllers/auth");

const api = express.Router();
api.use('auth', authController);

module.exports = api;