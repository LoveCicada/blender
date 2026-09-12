# 分析文档计划与进度

本文只追踪**写了什么、故意不写什么、下一步可以补什么**。  
分析结论在 [site/](site/index.html)，任务边界在 [constraints.md](constraints.md)。不要把进度单当成第二份目录。

对照 Blender 5.03 alpha。非官方。

## 目的

- 搞清 Blender **怎么设计**，主线是 **3D 网格编辑** 和 **渲染分道**。笔记要能对着源码跟调用链，不只是地图。
- 结论写成可打开的静态 HTML（无构建；学习站可用 `[site/site.js](site/site.js)` 做主题、搜索、章节轨）。
- 本文件供后续会话对照勾选，不复制 200 道题正文。

## 内容模型

一套目录，多套投影，不另起权威条目。


| 角色       | 路径                                                                                                                                                                         | 说明                                    |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| 权威目录     | [site/catalog.html](site/catalog.html)                                                                                                                                     | 21 条：职责、路径、邻居                         |
| 投影       | [modules](site/modules.html) · [responsibilities](site/responsibilities.html) · [features](site/features.html) · [ui-data](site/ui-data.html) · [render](site/render.html) | 同一目录的五种切法                             |
| 深讲 · 数据  | [site/b/](site/b/index.html)                                                                                                                                               | DNA / RNA / Python UI / Operator / 更新 |
| 深讲 · 建模  | [site/c/](site/c/index.html)                                                                                                                                               | Mesh / BMesh / 编辑模式 / 修改器             |
| 深讲 · 渲染  | [site/d/](site/d/index.html)                                                                                                                                               | Depsgraph / Draw / EEVEE / Cycles     |
| 问答投影     | [site/qa/](site/qa/index.html)                                                                                                                                             | Q001–200，链回目录或深讲                      |
| 邻居图（非权威） | [archify/](archify/README.md)                                                                                                                                              | 运行时架构 + 主路径数据流；不另起目录条目                |


显示名用中文（数据 / 建模 / 渲染）；目录文件夹仍是 `b/` `c/` `d/`。  
「链 B：跑 Operator」表示属性链 vs 命令链，不是章节号。

```
catalog.html  ← 权威
    ↑
modules / responsibilities / features / ui-data / render
    ↑
b/  c/  d/     ← 函数级走读
    ↑
qa/            ← 问答，不另起目录
archify/       ← 邻居图，不另起目录
```



## 已完成



### 约束与拉取

- [x] [constraints.md](constraints.md) — 只写 `ai-doc/`，禁止改官方树
- [x] [checkout-status.md](checkout-status.md) — 分析用文本已齐；`lib/` / LFS / `make update` 不必补
- [x] [overview.md](overview.md) — 读哪里、不读哪里
- [x] [README.md](README.md) — 本目录入口与索引



### 地图

- [x] [site/index.html](site/index.html) — 总览
- [x] [site/catalog.html](site/catalog.html) — 子系统目录 21 条
- [x] 五套划分页（模块 / 职责 / 功能 / UI–数据 / 渲染）
- [x] SVG：`flow` `layers` `neighbors` `features`，以及数据 / 建模 / 渲染附图（标签用英文，避免 SVG 中文乱码）



### 深讲

- [x] 数据：[dna](site/b/dna.html) · [rna](site/b/rna.html) · [python-ui](site/b/python-ui.html) · [operator](site/b/operator.html) · [update](site/b/update.html)
- [x] 建模：[mesh-bmesh](site/c/mesh-bmesh.html) · [editmode](site/c/editmode.html) · [ops](site/c/ops.html) · [modifiers](site/c/modifiers.html)
- [x] 渲染：[depsgraph](site/d/depsgraph.html) · [draw](site/d/draw.html) · [eevee](site/d/eevee.html) · [cycles](site/d/cycles.html)



### 二百问答

- [x] [qa/index.html](site/qa/index.html) 入口 + 顶栏「问答」
- [x] [qa/modules.html](site/qa/modules.html) Q001–050
- [x] [qa/features.html](site/qa/features.html) Q051–100
- [x] [qa/ui-data.html](site/qa/ui-data.html) Q101–150
- [x] [qa/render.html](site/qa/render.html) Q151–200

建模不单独成问答册：拓扑 / 挤出 / 修改器进**功能**，BMesh / editors 边界进**模块**。

### 学习站外壳与深讲加厚

- [x] `[site/styles.css](site/styles.css)` + `[site/site.js](site/site.js)` + `[site/search-index.json](site/search-index.json)` — 主题、侧栏 TOC、章节轨、搜索、结论卡
- [x] 全 `site/**/*.html` 换阅读器外壳（顶栏收敛为总览 · 目录 · 问答 · 数据 · 建模 · 渲染 · Archify）
- [x] 目录 / 五套划分 / 问答只换外壳，不扩 21 条、不重写 200 题
- [x] 13 篇深讲加厚为：它解决什么 / 走读 / 对照表 / 三张结论卡
- [x] 源码深讲：五套投影 + 数据/建模/渲染补真实函数栈（`WM_main`、`editmode_enter_ex`、`edbm_extrude_ex`、`DRW_draw_view`、`DEG_evaluate_on_refresh`）
- [x] 主线 Mermaid 图：投影 + `b/` `c/` `d/` 嵌入时序 / 流程 / 结构图；`site.js` 按需加载 jsDelivr，跟主题；已有 SVG 总览保留
- [x] 不改 `[archify/](archify/README.md)`

### 学习路径（课程制，计划见 [plan-KimiK3.md](plan-KimiK3.md)）

- [x] [site/path/index.html](site/path/index.html) 阶段索引 + [site/glossary.html](site/glossary.html) 词汇表
- [x] 阶段 0–1 课页：`path/0-1.html`、`path/1-1.html` 至 `1-4.html`；顶栏全站加「路径」入口
- [x] 阶段 2 课页：`path/2-1.html` 至 `2-3.html`（Operator / 属性链 / 标脏与通知 + 按 E 挤出验收链）
- [x] 阶段 3 课页：`path/3-1.html` 至 `3-5.html`（两种表示 / bmesh 实验 / 编辑模式 / 挤出与 BMO / 修改器）
- [x] 阶段 4 课页：`path/4-1.html`、`4-2.html`（求值副本 / 两张图）
- [x] 阶段 5 课页：`path/5-1.html` 至 `5-5.html`（视口一帧 / EEVEE / F12 链 / Cycles / 颜色管理）
- [x] 首页改路径优先：`site/index.html` 首屏为阶段路线，旧内容收进参考区
- [ ] 阶段 6 自选专题（按兴趣再开）



### Archify 邻居图

- [x] [archify/README.md](archify/README.md) — 打开方式；catalog 仍是权威
- [x] [blender-runtime.html](archify/blender-runtime.html) — architecture，showcase 9/9
- [x] [blender-mainpath.html](archify/blender-mainpath.html) — dataflow：面板→RNA、快捷键→Operator，再汇到 Mesh/BMesh
- [x] 学习站顶栏「Archify」→ `../archify/blender-runtime.html`



## 题库分配（已写）


| 题号       | 页     | 分组                                                                  |
| -------- | ----- | ------------------------------------------------------------------- |
| Q001–012 | 模块    | 数据与文件：makesdna / makesrna / blenkernel / blenloader                 |
| Q013–024 | 模块    | 网格与几何：BMesh、`MeshRuntime.edit_mesh`、geometry、修改器边界                  |
| Q025–036 | 模块    | 命令与界面：WM、editors、`bl_ui`                                            |
| Q037–050 | 模块    | 求值与像素：depsgraph、draw、gpu、EEVEE、Workbench、render、Cycles、shader nodes |
| Q051–062 | 功能    | 物体模式 / 变换 / Tab                                                     |
| Q063–076 | 功能    | 编辑模式：选择、挤出、溶解、细分                                                    |
| Q077–088 | 功能    | 修改器、Apply、Realtime vs Render                                        |
| Q089–100 | 功能    | 材质节点、视口、F12                                                         |
| Q101–110 | UI–数据 | DNA / SDNA                                                          |
| Q111–122 | UI–数据 | RNA 命名、offset、`update`                                              |
| Q123–132 | UI–数据 | `layout.prop` / `operator`                                          |
| Q133–142 | UI–数据 | Operator / `WM_main` / notifier                                     |
| Q143–150 | UI–数据 | `DEG_id_tag_update`、`OPTYPE_UNDO`                                   |
| Q151–162 | 渲染    | 求值图、COW、`DAG_EVAL_VIEWPORT` vs `RENDER`                             |
| Q163–172 | 渲染    | `DRW_draw_view`、overlay 不是引擎                                        |
| Q173–184 | 渲染    | EEVEE / Workbench / 材质预览常走 EEVEE                                    |
| Q185–200 | 渲染    | `RENDER_OT_render`、Cycles sync、kernel、节点分叉                          |




## 弱写 / 未开

点到为止，**不凑题**。新开一章时先在下表加行，写完再勾，并补 [README.md](README.md) 索引。

- [ ] 合成（compositor）
- [ ] 序列（sequencer）
- [ ] 雕刻细操（sculpt / PBVH）
- [ ] IO 格式（blenloader 之外的导入导出）
- [ ] GHOST 平台层
- [ ] Hydra / 外部引擎（目录已点名）
- [ ] Python API 全集（现只写 UI–数据链上的 `bpy` / `bpy.ops`）
- [ ] UV、权重、约束细表
- [ ] EEVEE 探针 / 光照缓存
- [ ] 完整 BMO 表、Cycles kernel 细节



## 写作纪律

- 只分析，只写 `ai-doc/**`。提交只 `git add ai-doc/`，禁止 `git add .`。
- 权威事实以 [catalog.html](site/catalog.html) 和已写深讲为准；问答不另起一套目录。
- 先对照已写 HTML，再按需精读符号。不编不存在的 API（已排除 `DEG_evaluate`；用 `DEG_evaluate_on_refresh` / `on_framechange`）。
- 不重复粘贴整页深讲；问答点破设计选择，深讲给函数走读。
- 不要为了看图去跑 `make update`、拉 `lib/` 或 `git lfs pull`。
- SVG 内用英文标签。显示名用中文；源码符号保持英文。
- 学习站无构建：允许手写 `[site/site.js](site/site.js)`。不要改 `[archify/](archify/README.md)`。



## 维护约定

1. 后续会话先读 [constraints.md](constraints.md) 和本文。
2. 新开章节：在「弱写 / 未开」加待办 → 写 `site/` → 勾选并链到新页 → 更新 README 索引。
3. 主线已齐。未开项按学习需要再补，不为凑数扩目录。

