# 源码阅读范围

拉取检查见 [checkout-status.md](checkout-status.md)，当前可开始读。

模块地图已做成可打开的 HTML：用浏览器打开 [site/index.html](site/index.html)。权威正文是 [site/catalog.html](site/catalog.html)；五套划分页只是同一目录的投影。

深讲：[数据](site/b/index.html) · [建模](site/c/index.html) · [渲染](site/d/index.html)。二百问答：[site/qa/index.html](site/qa/index.html)。

本文仍只标明**读哪里**。不要为了“弄懂结构”去改源码或拉取 `lib/`。

## 分析需要读

- `source/` — Blender 主体（DNA/RNA、blenkernel、editors、nodes、GPU、depsgraph 等）
- `intern/` — Cycles、GHOST、guardedalloc 等内部库
- `scripts/` — Python UI、operators、核心插件
- `extern/` — 捆绑第三方源码（看依赖时）
- `build_files/` — CMake / 更新脚本（理解如何拼模块时）

## 分析可以不读、也不要下载

- `lib/` — 预编译库
- `assets/` — 内置资产
- `locale/` — 翻译（除非专门做 i18n）
- `tests/data/` — 测试大数据

## 笔记写在哪里

只写在 `ai-doc/`。约束见 [constraints.md](constraints.md)。
