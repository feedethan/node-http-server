const fs = require('fs');

module.exports = {
  index(res) {
    fs.readFile('./index.html', 'utf8', (err, data) => {
      if (!err) {
        res.end(data);
      }
    });
  },
  otherFile(res) {
    fs.readFile('./dog.jpeg', (err, data) => {
      if (!err) {
        res.end(data);
      }
    });
  },
  user(data, res) {
    console.log(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ data: 'hello world' }));
  },
};
