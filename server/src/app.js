const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const v1 = require('./routes/versionsApi/v1');

const app = express();

// const whiteList = [
//   'http://localhost:3000',
//   'http://localhost:8181/v1',
//   'http://127.0.0.1:8181/v1',
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

app.use('/v1', v1);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
