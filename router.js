const url = require('url');
const qs = require('querystring');
const controller = require('./controller');

const router = (req, res) => {
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
      controller.index(res);
    } else {
      controller.otherFile(res);
    }
  } else if (req.method === 'POST') {
    // 使用Net模块的data事件和end事件，配合querystring解析post请求数据流
    let data = '';
    req.on('data', (d) => {
      data += d;
    });
    req.on('end', () => {
      controller.user(qs.parse(data), res);
    });
  }
};

module.exports = router;
