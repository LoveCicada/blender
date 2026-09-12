# 任务约束：只做代码 / 功能分析

本文是本仓库学习任务的权威说明。后续任何改动、提交、Agent 会话都必须先对照本文。  
目的：避免误改 Blender 源代码，避免把预编译库和资产带进提交。

## 任务是什么

- 阅读并理解本仓库源码（C/C++、Python UI、内部模块如何对应功能）。
- 把分析结论写进 `ai-doc/`。
- fork 地址：[https://github.com/LoveCicada/blender](https://github.com/LoveCicada/blender)，后续会 sync 官方仓库继续学习。

## 任务不是什么

- 不是编译、运行、调试 Blender。
- 不是修 bug、加功能、改构建脚本。
- 不是补全 `lib/`、Git LFS、测试数据包。

## 允许写入

仅以下路径可以新建或修改：

- `ai-doc/**`

除此之外的任何文件都视为官方源码树，只读。

## 禁止修改

包括但不限于：

- `source/`、`intern/`、`extern/`、`scripts/`、`build_files/`、`release/`、`tools/`、`tests/`、`doc/`
- 根目录官方文件：`README.md`、`CMakeLists.txt`、`GNUmakefile`、`make.bat`、`COPYING`、`AUTHORS`
- Git 元数据：`.gitignore`、`.gitattributes`、`.gitmodules`、`.clang-format` 等
- `lib/`（预编译库子模块）
- `assets/`（内置 .blend 等资源）
- `locale/`（翻译 catalog）

不要为了“方便分析”去改 `.gitignore`、加 `AGENTS.md` 到根目录、或改官方 README 来指向本目录。介绍文字只写在 `ai-doc/README.md`。

## 不需要下载的内容

分析只需要文本源码。以下内容**不要主动拉取**：

| 内容 | 原因 |
|------|------|
| `lib/windows_x64` 等预编译库 | `.gitmodules` 中为 `update = none`，只为编译提供二进制 |
| `assets/` 里的 `.blend` 等 | 运行时资源，不是逻辑源码 |
| `git lfs pull` | LFS 管 dll/png/blend 等，与读 `.cc` / `.py` 无关 |
| `make update` / `make.bat update` | 构建工作流；分析不要跑 |
| `tests/data/` | 独立测试资源，已被官方 `.gitignore` 排除 |

官方 `make update` 若将来要用，应加 `--no-libraries`。GitHub 镜像场景下 `GIT_LFS_SKIP_SMUDGE=1` 对分析是合理选择：它只跳过 LFS smudge（`.blend` / 图 / 测试二进制），**不**跳过 `lib/` 预编译库子模块。官方文档整段流程还含 `make update`（会 `git lfs pull` 并启用 `lib/<platform>_<arch>`），分析不要跑。详见 [checkout-status.md](checkout-status.md)。

## 仓库未下载完整 vs 文档提交

**不影响提交。** Git 提交的是暂存区里被 `git add` 的文件，不是工作树是否 100% 完整。

- 没拉 `lib/`、没拉 LFS 实体：可以提交 `ai-doc/`。
- 当前工作区里若已有大量 `lib/windows_x64` 的 dll/lib 变脏：**不要** `git add .`，否则会把二进制提交进去。这是唯一会破坏提交的常见错误。
- `source/` 等源码若本身缺失：仍能提交笔记，但分析会不准确。缺的是阅读范围，不是 Git 能力。

推送到 GitHub 时，只含 Markdown 的 commit 不依赖本机 LFS 是否下全。后续 merge 官方 `main` 也不依赖库是否下全。`ai-doc/` 是官方没有的目录，一般无冲突。

## 提交纪律

```text
git add ai-doc/
git status
git commit -m "docs: ..."
```

提交前确认暂存区**没有**：

- `lib/`、`assets/`
- 根目录 `README.md`
- 任何 `source/`、`intern/`、`scripts/`、CMake 变更

不要使用 `git add .` 或 `git add -A`。

## 允许阅读（只读）

功能分析优先看这些目录，不要写回它们：

1. `source/blender/makesdna/`、`source/blender/makesrna/` — 数据布局与 RNA
2. `source/blender/blenkernel/` — 核心数据与对象逻辑
3. `source/blender/windowmanager/`、`source/blender/editors/` — 窗口、事件、编辑器
4. `scripts/startup/` — Python UI / 操作如何接到 C 层
5. `intern/cycles/`、`source/blender/nodes/` — 按兴趣深入
6. `extern/`、`build_files/` — 理解依赖与模块如何拼起来时再读

## 对后续 Agent / 会话的要求

开始任何工作前：

1. 先读本文。
2. 若任务会改到 `ai-doc/` 以外的文件，先停下来，不要改。
3. 不要运行 `make update`、不要 `git submodule update`、不要 `git lfs pull`，除非用户**明确**要求开始编译。
4. 不要把分析结论写进官方 `README.md` 或源码注释里。
