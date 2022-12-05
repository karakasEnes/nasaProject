const express = require('express');

const planetRouter = require('../planets/planets.router.js');
const launchesRouter = require('../launches/launches.router.js');

const v1 = express.Router();

v1.use('/planets', planetRouter);
v1.use('/launches', launchesRouter);

module.exports = v1;
