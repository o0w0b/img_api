const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// =====================
// 使用cors中间件
// =====================
app.use(cors({
  origin: '*'
  // 或者指定特定的域名
  // origin: 'https://www.api1.link'
}));

// Serve static files from the public directory
app.use(express.static('public'));

// =====================
// 启动时缓存相关变量
// =====================

// 所有图片的总池（用于 /random）
let allImages = [];

// 每个分类的图片池（用于 /:category）
let categoryImages = {};

// =====================
// 启动时加载所有 txt 文件到内存
// =====================
function loadAllImages() {
  allImages = [];
  categoryImages = {};

  const dirPath = path.join(__dirname);

  // 读取当前目录下的所有文件
  const files = fs.readdirSync(dirPath);

  // 只处理 .txt 文件
  const txtFiles = files.filter(file => file.endsWith('.txt'));

  txtFiles.forEach(file => {
    const filePath = path.join(dirPath, file);

    // 同步读取 txt 内容（只在启动时执行）
    const data = fs.readFileSync(filePath, 'utf8');

    const lines = data
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean);

    if (lines.length === 0) return;

    const categoryName = path.basename(file, '.txt');

    // 保存分类数据
    categoryImages[categoryName] = lines;

    // 合并到总池
    allImages.push(...lines);
  });

  console.log('📦 图片缓存加载完成');
  console.log('📂 分类数量:', Object.keys(categoryImages).length);
  console.log('🖼️ 图片总数:', allImages.length);
}

// =====================
// 启动时立即加载缓存
// =====================
loadAllImages();

// =====================
// 所有类别随机图像的路由
// =====================
app.get('/random', (req, res) => {
  if (allImages.length === 0) {
    return res.status(404).send('No images found');
  }

  const randomImage = allImages[Math.floor(Math.random() * allImages.length)];
  res.redirect(randomImage);
});

// =====================
// Default route to serve the documentation
// =====================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// =====================
// 指定类别随机图像的路由
// =====================
app.get('/:category', (req, res) => {
  const category = req.params.category;
  const images = categoryImages[category];

  if (!images || images.length === 0) {
    return res.status(404).send('Category not found');
  }

  const randomImage = images[Math.floor(Math.random() * images.length)];
  res.redirect(randomImage);
});

module.exports = app;
