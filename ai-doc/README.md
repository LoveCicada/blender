# 个人学习笔记（非官方）

本目录是 fork [LoveCicada/blender](https://github.com/LoveCicada/blender) 上的**代码分析 / 功能分析**笔记。  
它**不参与构建**，也**不是** Blender 官方文档。官方入口仍是仓库根目录的 `README.md`，禁止改动。

## 硬性约束（后续会话必须遵守）

完整条款见 [constraints.md](constraints.md)。摘要：

1. **只分析、不改源码。** 允许写入的路径只有 `ai-doc/`。
2. **不要下载预编译库和资产。** 分析不需要 `lib/`、`assets/`、Git LFS 实体、`make update`。
3. **仓库未下全不影响提交笔记。** 只 `git add ai-doc/`，禁止 `git add .`。
4. **不要改官方文件。** 包括根目录 `README.md`、CMake、源码、`.gitignore`、`.gitmodules`。
5. **后续 sync 官方仓库时，保持 `ai-doc/` 为增量目录**，不要为了“整洁”去改官方树。

## 文档索引

| 文件 | 内容 |
|------|------|
| [constraints.md](constraints.md) | 任务边界、禁止项、提交纪律（本任务的权威说明） |
| [plan.md](plan.md) | 分析文档计划与进度（后续追踪用） |
| [overview.md](overview.md) | 源码阅读范围；模块地图见学习站 |
| [checkout-status.md](checkout-status.md) | 源码拉取检查：分析用文本已齐，lib / 资产 / LFS 不必补 |
| [site/index.html](site/index.html) | 学习站总览地图（本机浏览器打开）：目录 + 五套划分 |
| [site/b/index.html](site/b/index.html) | 数据：DNA / RNA / Python UI / Operator / 更新 |
| [site/c/index.html](site/c/index.html) | 建模：Mesh / BMesh / 编辑模式 / 修改器 |
| [site/d/index.html](site/d/index.html) | 渲染：Depsgraph / Draw / EEVEE / Cycles |
| [site/qa/index.html](site/qa/index.html) | 二百问答：模块 / 功能 / UI–数据 / 渲染 |

## 本 fork 的用途

- 上游：Blender 官方仓库
- 本仓：学习用 fork，会定期 sync
- 本目录：把分析结论写在这里，避免笔记和官方源码混在一起
