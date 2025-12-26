const app = require('./api/randomImage');
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`本地服务已启动 → http://localhost:${PORT}`);
}).on('error', console.error);