const express = require('express');
const cors = require('cors');

const planetRouter = require('./routes/planets/planets.router.js');

const app = express();

const whiteList = ['http://localhost:3000'];
app.use(
  cors({
    origin: function (origin, cb) {
      if (whiteList.indexOf(origin) !== -1) {
        cb(null, true);
      } else {
        cb(new Error('Not Allowed by CORS!'));
      }
    },
  })
);
app.use(express.json());
app.use(planetRouter);

module.exports = app;
