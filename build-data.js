const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'api', 'data');      // 放 txt 的目录
const outFile = path.join(__dirname, 'api', 'data.json'); // 构建产物

const map = {};

for (const file of fs.readdirSync(dataDir)) {
    if (!file.endsWith('.txt')) continue;
    const category = path.basename(file, '.txt');
    const lines = fs
        .readFileSync(path.join(dataDir, file), 'utf8')
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(Boolean); // 去掉空行
    map[category] = lines;
}

fs.writeFileSync(outFile, JSON.stringify(map, null, 2));
console.log('✅ api/data.json 构建完成');