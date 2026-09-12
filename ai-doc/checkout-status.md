# 源码拉取检查

**结论：分析用源码已齐，可以开始读。**

检查日期：2026-09-12。对照版本：Blender **5.03 alpha**（`source/blender/blenkernel/BKE_blender_version.h`）。  
阅读范围见 [overview.md](overview.md)。约束见 [constraints.md](constraints.md)。

不要为了“对齐官方完整树”再跑 `make update`、`git lfs pull`、`git submodule update`。

## 分析需要的目录

与 HEAD 文本文件对齐，磁盘上可直接打开阅读。

| 目录 | 磁盘状态 | 说明 |
|------|----------|------|
| `source/` | 齐全 | `blender/` + `creator/`；约 7200+ 文件。`source/` / `intern/` 里没有需要 LFS 才能读的 `.cc` / `.hh` |
| `intern/` | 齐全 | CMake 列出的内部库都在（含 `cycles`、`ghost`、`guardedalloc`） |
| `scripts/` | 文本齐全 | Python UI / operators / addons 都在；仅缺 5 个 LFS 的 `startup.blend` 模板，不影响读 `.py` |
| `extern/` | 齐全 | 捆绑第三方源码 |
| `build_files/` | 齐全 | CMake / 更新脚本 |

## 可以缺、也不要补

| 路径 | 磁盘状态 | 不要做 |
|------|----------|--------|
| `lib/` | 空壳 + `.clang-format` | 不要 `git submodule update`。`.gitmodules` 里四平台子模块均为 `update = none` |
| `assets/` | 仅 `LICENSE` 与 `blender_assets.cats.txt` | 不要 `git lfs pull`。`.blend` 未 smudge |
| `locale/` | 意外已齐（49 个 `.po` + `languages`） | 分析不依赖它，不要为对齐再拉 |
| `tests/files/` | 多为文本对照；LFS 二进制未下 | 本仓库用此路径存测试夹具（没有 `tests/data/`）。不要下测试大数据 |
| `release/` 等 | 图标 / 字体 / ICC 等 LFS 二进制未下 | 不要补 |

## 官方 GitHub 镜像步骤 vs 分析用途

官方文档 [Using Git / GitHub Mirror](https://developer.blender.org/docs/handbook/contributing/using_git/#github-mirror) 的 Windows 示例是：先 `GIT_LFS_SKIP_SMUDGE=1` 再 `git clone`，然后 `make update`。这**不等于**跳过大文件。官方本意是：克隆时躲开 GitHub 上没有的 LFS，再从 projects.blender.org **补齐**可编译工作树。

| 步骤 | 实际效果 | 对本学习仓 |
|------|----------|------------|
| `set GIT_LFS_SKIP_SMUDGE=1` 再 `git clone` | 不把 LFS 指针展开成实体（`.blend` / 图 / 测试二进制）。GitHub 镜像没有这些对象，不设会报错 | **有用**。分析只读文本，保持指针即可 |
| `set GIT_LFS_SKIP_SMUDGE=` 再 `make update` | 加 `lfs-fallback` 远程，执行 `git lfs pull`，并启用/更新 `lib/<platform>_<arch>` 预编译库子模块 | **不要跑**。这正是把大文件拉进工作区 |

`GIT_LFS_SKIP_SMUDGE` **管不到**预编译库。`lib/windows_x64` 等是 `.gitmodules` 里 `update = none` 的 Git 子模块，不是 LFS。只有不跑 `make update`（或将来明确加 `--no-libraries`）才会保持 `lib/` 空壳。

当前仓已经是分析友好状态：文本源码齐，`lib/` 空，`assets/` / 测试 LFS 未 smudge。不必按官方图重克隆，更不要补跑 `make update`。`SKIP_SMUDGE` 也不能防止 `git add .` 误提交指针或空壳子模块。

## `source/blender/` 模块清单

与 `source/blender/CMakeLists.txt` 的 `add_subdirectory` 对齐，磁盘上都在。

无条件：

`datatoc`、`gpu/shader_tool`、`editors`、`windowmanager`、`animrig`、`asset_system`、`blenkernel`、`blenlib`、`bmesh`、`draw`、`render`、`blenfont`、`blentranslation`、`blenloader`、`blenloader_core`、`depsgraph`、`ikplugin`、`simulation`、`geometry`、`gpu`、`imbuf`、`nodes`、`modifiers`、`sequencer`、`shader_fx`、`io`、`functions`、`makesdna`、`makesrna`、`compositor`

条件模块（目录同样在）：

`blendthumb`、`python`、`freestyle`、`cpucheck`，以及若干 shader / 图像格式子目录。

`intern/` 侧同样齐全，包括：`atomic`、`clog`、`ghost`、`guardedalloc`、`libmv`、`memutil`、`opensubdiv`、`profile`、`mikktspace`、`eigen`、`sky`、`openvdb`、`dualcon`、`iksolver`、`itasc`、`cycles`、`rigidbody`、`utfconv`、`uriconvert`、`mantaflow`、`slim`、`quadriflow`、`libc_compat`、`renderdoc_dynload`、`wayland_dynload`、`dbus_dynload`、`draco_bridge`、`meshoptimizer_bridge`。

## Git 状态注意

若 `git status` 把大量已在磁盘上的路径标成 deleted，那是索引 / 跟踪问题，**不影响打开源码阅读**。

不要用 `git add .` 去“修好”。提交笔记只 `git add ai-doc/`。
