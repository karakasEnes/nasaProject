require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app.js');
const { loadPlanetData } = require('./models/planets.model.js');

const PORT = process.env.PORT || 8181;
const MONGO_URL = `mongodb+srv://main-user:${process.env.MONGO_PSW}@nasa.of1cskx.mongodb.net/nasa-db?retryWrites=true&w=majority`;
const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('Succeed to connect MONGO DB');
});

mongoose.connection.on('error', (err) => {
  console.error(`ERROR WHILE CONNECTING TO MONGODB: ${err}`);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`Listening at ${PORT} port...`);
  });
}

startServer();
