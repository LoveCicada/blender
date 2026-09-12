# 源码阅读范围（占位）

本文只标明**读哪里**。完整模块地图后续再补。  
在补全之前，不要为了“弄懂结构”去改源码或拉取 `lib/`。

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
