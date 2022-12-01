const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const planetRouter = require('./routes/planets/planets.router.js');
const launchesRouter = require('./routes/launches/launches.router.js');

const app = express();

// const whiteList = [
//   'http://localhost:3000',
//   'http://localhost:8181',
//   'http://127.0.0.1:8181',
// ];

// app.use(
//   cors({
//     origin: function (origin, cb) {
//       if (whiteList.indexOf(origin) !== -1) {
//         cb(null, true);
//       } else {
//         cb(new Error('Not Allowed by CORS!'));
//       }
//     },
//   })
// );
app.use(
  cors({
    origin: '*',
  })
);
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(planetRouter);
app.use(launchesRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
