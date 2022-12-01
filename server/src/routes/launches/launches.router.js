const express = require('express');
const { getAllLaunches } = require('./launches.controller');

const launcherRouter = express.Router();

launcherRouter.get('/launches', getAllLaunches);

module.exports = launcherRouter;
