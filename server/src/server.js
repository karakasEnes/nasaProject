const http = require('http');
const app = require('./app.js');
const { loadPlanetData } = require('./models/planets.model.js');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8181;
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`Listening at ${PORT} port...`);
  });
}

startServer();
