const http = require('http');
const randomImageHandler = require('./api/randomImage');

const PORT = 5000;

const server = http.createServer((req, res) => {
    randomImageHandler(req, res);
});

server.listen(PORT, () => {
    console.log(`本地服务已启动 → http://localhost:${PORT}`);
}).on('error', console.error);
