const fs = require('fs');
const path = require('path');

// 加载构建时生成的 data.json
const categoryImages = require('./data.json');
const allImages = Object.values(categoryImages).flat();

// 工具：CORS
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
}

// 工具：随机元素
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Serverless 入口
module.exports = (req, res) => {
  cors(res);

  if (allImages.length === 0) {
    res.statusCode = 404;
    res.end('No images found');
    return;
  }

  const urlPath = req.url.replace(/^\/+/, '').split('?')[0];

  // 根路径：返回 public/index.html
  if (urlPath === '') {
    const html = path.join(__dirname, '../public/index.html');
    if (fs.existsSync(html)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(html));
    } else {
      res.writeHead(404).end('index.html not found');
    }
    return;
  }

  // favicon
  if (urlPath === 'favicon.ico') {
    const icon = path.join(__dirname, '../public/favicon.ico');
    if (fs.existsSync(icon)) {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      res.end(fs.readFileSync(icon));
    } else {
      res.writeHead(404).end('favicon.ico not found');
    }
    return;
  }

  // /random 全局随机
  if (urlPath === 'random') {
    res.writeHead(302, { Location: pick(allImages) }).end();
    return;
  }

  // /:category 分类随机
  const list = categoryImages[urlPath];
  if (list && list.length) {
    res.writeHead(302, { Location: pick(list) }).end();
  } else {
    res.writeHead(404).end('Category not found');
  }
};