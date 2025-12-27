<h2 align="center">img_api</h2>

---

## 原项目

- [random-pictures](https://github.com/aizhiqian/random-pictures) （Made by：[aizhiqian](https://github.com/aizhiqian)）

## 访问地址

- [https://img.o0w0b.top](https://img.o0w0b.top)

## 改动说明

- 修改了随机图片返回逻辑，减少重复命中
- 优化了性能，部署前将分散的 `api/data/*.txt` 合并为单个 `api/data.json`；运行时一次性 `require` 该文件
- 修复了 Windows 文本行尾导致的链接异常问题
- 修改了前端页面的样式，并添加了一些功能
- 本项目 **无需额外依赖**，使用原生 Node.js 即可运行

## 本地测试

在项目根目录执行：

```shell
npm run build
```

```shell
npm run dev
```

打开浏览器访问：

```
http://localhost:5000
```

## 部署

[查看部署教程](https://blog.o0w0b.top/posts/ac97dec/)

## 图片链接生成工具（Windows）

在项目内的 `tool` 文件夹中提供了一个 Windows 批处理脚本，用来快速生成图片链接文件

生成的 `.txt` 文件可以直接用于本项目，无需额外处理

### 使用方式

双击脚本后，根据窗口提示操作即可完成

## 许可证

[![license](https://imgbed.o0w0b.top/file/1766767647969_GPL-3.0.svg)](https://github.com/o0w0b/img_api/blob/main/LICENSE)

img_api 使用 GPL-v3.0 协议开源，请遵守开源协议