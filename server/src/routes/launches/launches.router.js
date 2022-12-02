const express = require('express');
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require('./launches.controller');

const launcherRouter = express.Router();

launcherRouter.get('/', httpGetAllLaunches);
launcherRouter.post('/', httpAddNewLaunch);
launcherRouter.delete('/:id', httpAbortLaunch);

module.exports = launcherRouter;
