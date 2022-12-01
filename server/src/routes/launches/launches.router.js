const express = require('express');
const { httpGetAllLaunches } = require('./launches.controller');

const launcherRouter = express.Router();

launcherRouter.get('/launches', httpGetAllLaunches);

module.exports = launcherRouter;
