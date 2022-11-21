const http = require('http');
const app = require('./app.js');

const PORT = process.env.PORT || 8181;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening at ${PORT} port...`);
});
