# start

```
nodemon server.js
```

# 使用 Node 原生创建 http-server

```
const http = require('node:http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const server = http.createServer();

server.on('request', (req, res) => {
  // 返回不同类型的内容
  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify({ data: 'hello world' }));
  //   res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
  //   res.end('你好');
  //   res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
  //   res.end('<h1>你好</h1>');

  console.log(req.method);
  // 使用url模块获取get请求的参数 http://127.0.0.1:8000/user?id=55  => 55
  console.log(url.parse(req.url, true).query.id);
  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile('./index.html', 'utf8', (err, data) => {
        if (!err) {
          res.end(data);
        }
      });
    } else {
      fs.readFile('./dog.jpeg', (err, data) => {
        if (!err) {
          res.end(data);
        }
      });
    }
  } else if (req.method === 'POST') {
    // 使用Net模块的data事件和end事件，配合querystring解析post请求数据流
    let data = '';
    req.on('data', (d) => {
      data += d;
    });
    req.on('end', () => {
      console.log(qs.parse(data));
    });
    res.end();
  }
});

server.listen(8000, () => {
  console.log('http://127.0.0.1:8000');
});
```
