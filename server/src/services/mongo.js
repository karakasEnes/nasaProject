require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URL = `mongodb+srv://main-user:${process.env.MONGO_PSW}@nasa.of1cskx.mongodb.net/nasa-db?retryWrites=true&w=majority`;

mongoose.connection.once('open', () => {
  console.log('Succeed to connect MONGO DB');
});

mongoose.connection.on('error', (err) => {
  console.error(`ERROR WHILE CONNECTING TO MONGODB: ${err}`);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
