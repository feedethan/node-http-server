const http = require('node:http');
const router = require('./router');

const server = http.createServer();

server.on('request', (req, res) => {
  router(req, res);
});

server.listen(8000, () => {
  console.log('http://127.0.0.1:8000');
});
