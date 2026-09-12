# plan-KimiK3：Blender 设计学习计划（课程制）

对照 Blender 5.03 alpha 源码树。非官方。约束见 [constraints.md](constraints.md)。

## 0. 这份文件是什么

- 读者是**初学者**（我）。目标：**深入学习 Blender 的 3D 建模与渲染设计**，能对着源码讲清一次建模操作和一次渲染各走了哪条路。
- 与 [plan.md](plan.md) 的分工：`plan.md` 是**文档生产进度单**（哪些 HTML 写了、哪些没写）；本文件是**学习课程计划**（我按什么顺序学、每课做什么实验、怎么算学会）。两份都保留，各管各的。
- 已对齐的两个决策（2026-09-12）：
  1. **动手环境 = 官方二进制 + bpy 控制台**。不编译、不拉 `lib/` / LFS。所有实验在官方 Blender 5.x 的 Python 控制台 / 脚本工作区完成。
  2. **现有站点留作参考区**。catalog / 五套投影 / 200 问答 / 深讲页不删不改内容；新写一条学习路径当主线，旧页当字典和拓展阅读。

## 1. 对现有文档的诊断

现有 28 页内容**事实基本准确**（符号都核对过源码），但作为学习材料不合格。逐条带证据：

| # | 问题 | 证据 |
|---|------|------|
| 1 | **定位偏了**：catalog 权威 + 五套投影 + 200 问答是「参考地图」，适合已懂的人查阅，不是教材 | [site/index.html](site/index.html) 首屏给五种切法，没有「先读哪页」 |
| 2 | **没有学习路径**：无顺序、无前置概念 | [c/mesh-bmesh.html](site/c/mesh-bmesh.html) 首段直接上 `BMHeader.hflag`；[d/depsgraph.html](site/d/depsgraph.html) 标题即「没有叫 DEG_evaluate 的入口」——先纠正误解，却没先建立概念 |
| 3 | **零动手环节**：28 页没有一个练习 | 全文搜不到一个可运行的 bpy 命令；从不提官方二进制自带 Python 控制台可验证大部分结论 |
| 4 | **断言式写作**：符号多，`file:line` 少，没有「你自己怎么看到它」 | 深讲页给函数栈（如 `edbm_extrude_ex`），但不给文件行号，也不给验证手段 |
| 5 | **渲染太薄** | [d/](site/d/index.html) 四页各约 110 行，只讲分道结构；shader 节点编译、采样、颜色管理几乎没有 |
| 6 | **plan.md 角色错位** | 它追踪「文档写了什么」，不回答「我下一步学什么、怎么算学会」 |
| 7 | **文风过密 + 无词汇表** | 电报式短句，一段三个英文术语；ID / Main / COW / notifier / modal / BMO / SDNA / loop 无处可查 |

结论：**不用推翻事实，要推翻组织方式**。从「目录优先」翻转为「路径优先」。

## 2. 学习路线总览

每课的固定结构：

1. **目标**：这节课结束你能说出 / 做出什么。
2. **概念**：从零讲，不许直接上符号；术语第一次出现必须链词汇表。
3. **源码走读**：给 `file:line`，只走主线分支。
4. **动手实验**：至少一个可运行的 bpy 实验，附预期输出。实验先行，源码殿后——先在控制台看到现象，再去源码找原因。
5. **自检**：链到 [qa/](site/qa/index.html) 对应题号，合上笔记能答。
6. **拓展**：链到旧深讲页（[b/](site/b/index.html) / [c/](site/c/index.html) / [d/](site/d/index.html)）。

```mermaid
flowchart LR
  s0[阶段0_环境与读码] --> s1[阶段1_数据地基_ID_DNA_RNA]
  s1 --> s2[阶段2_一次点击的旅程_Operator]
  s2 --> s3[阶段3_建模核心_Mesh_BMesh_BMO_修改器]
  s3 --> s4[阶段4_求值_depsgraph_COW]
  s4 --> s5[阶段5_渲染分道_视口_EEVEE_F12_Cycles]
  s5 --> s6[阶段6_自选专题]
```

版本对齐：源码树是 5.03 alpha；官方二进制选 5.x（尽量接近）。每课页注明对照的源码版本与二进制版本；符号随上游漂移时以源码树为准重核。

## 3. 课表

### 阶段 0 · 环境与读码工具（1 课）

| 课 | 目标 | 实验 | 源码锚点 |
|----|------|------|----------|
| 0.1 工具就位 | 会开控制台、会补全、会在源码树里搜符号 | 官方 Blender → Scripting 工作区 → 控制台 `bpy.context.object`、`dir(bpy.data)`；在源码树里 grep `primitive_cube_add` 找到它的定义文件 | `source/` `intern/` `scripts/` 分工见 [overview.md](overview.md) |

验收：不看笔记完成「控制台执行一条 bpy 命令 + 源码里搜到一个符号并打开对应文件」。

### 阶段 1 · 数据地基：ID / DNA / RNA / Main（4 课）

| 课 | 目标 | 实验（bpy） | 源码锚点 |
|----|------|-------------|----------|
| 1.1 一切都是数据块 | 说出 ID 头管什么：名字、用户计数、标脏位 | 新建两个物体共用一个网格，看 `bpy.data.meshes["Mesh"].users` 变 2；勾伪用户 `use_fake_user`，删物体后网格还在 | `source/blender/makesdna/DNA_ID.h` |
| 1.2 DNA 是磁盘布局 | 说出哪些字段进 .blend、哪些不进 | 存盘、重开，字段还在；对照 `DNA_mesh_types.h` 找 `verts_num`；理解 `MeshRuntime *runtime` 不存盘 | `source/blender/makesdna/DNA_mesh_types.h` |
| 1.3 RNA 是对外门面 | 说出面板 / bpy / Operator 属性都经过 RNA | 控制台 `bpy.types.Mesh.bl_rna.properties` 翻属性表；在 `rna_mesh.cc` 里找到对应 `RNA_def_property` | `source/blender/makesrna/intern/rna_mesh.cc` |
| 1.4 Main 与 Scene | 说出 Main 是 ID 数据库，Scene 只是其中一块 | `bpy.data.scenes` vs `bpy.context.scene`；新建第二个 Scene 再切换 | `source/blender/blenkernel/`（`BKE_main`） |

验收：不看笔记说出 ID / DNA / RNA / Main 各管什么；能用控制台演示一次用户计数增减。自检：[Q001–012](site/qa/modules.html#q001)。

### 阶段 2 · 一次点击的完整旅程（3 课）

| 课 | 目标 | 实验（bpy） | 源码锚点 |
|----|------|-------------|----------|
| 2.1 Operator 是命令 | 说出 poll / invoke / exec 各管什么 | 控制台 `bpy.ops.mesh.primitive_cube_add()`；`bpy.ops.ed.undo()` 撤销；回源码找 `MESH_OT_*` 的注册 | `source/blender/editors/mesh/mesh_ops.cc`；`windowmanager/intern/wm_operator_type.cc` |
| 2.2 属性链 | 说出拖滑条和 bpy 赋值是同一入口 | 控制台改 `bpy.context.object.location.x`，看 3D 视图和 N 面板同时变；对照 `rna_uiItemR` | `source/blender/editors/interface/`；`scripts/startup/bl_ui/properties_data_mesh.py` |
| 2.3 标脏与通知 | 说出 `DEG_id_tag_update` 与 notifier 分两类听众 | 脚本循环改数据，观察界面何时刷新；理解「改了数据 ≠ 立刻重算」 | `source/blender/editors/mesh/editmesh_utils.cc`（`EDBM_update`） |

验收：能完整说出「按 E 挤出」从按键到重画的链：keymap → `wm_operator_invoke` → poll/exec → BMO → `EDBM_update` → tag + notifier → depsgraph → 重画。自检：[Q133–150](site/qa/ui-data.html)。

### 阶段 3 · 建模核心（5 课）

| 课 | 目标 | 实验（bpy） | 源码锚点 |
|----|------|-------------|----------|
| 3.1 两种网格表示 | 说出数组 Mesh 与半边 BMesh 各适合什么 | 概念课：半边结构配图讲清「这个面的邻边」为什么数组答不动；控制台对比 `mesh.vertices` 与 bmesh 元素 | `source/blender/bmesh/bmesh_class.hh` |
| 3.2 亲手玩 BMesh | 会用 `bmesh` 模块造几何 | **王牌实验**：`bmesh.new()` → `bmesh.ops.create_cube` → `bm.to_mesh(me)` → 链进场景；改一个顶点坐标再写回 | `source/blender/bmesh/`（Python 侧 `bmesh` 模块即它的封装） |
| 3.3 编辑模式的进出 | 说出 Tab 是一次格式转换 | 进编辑模式后 `bmesh.from_edit_mesh(me)` 拿到活的 BMesh；改动立即反映在视口 | `source/blender/editors/object/object_edit.cc`（`editmode_enter_ex`）；`bmesh/intern/bmesh_mesh_convert.cc` |
| 3.4 挤出与 BMO | 说出 WM Operator 与 BMO 是两层表 | `bmesh.ops.extrude_face_region` 亲手挤出；对照 `edbm_extrude_ex` 里同一字符串名 | `source/blender/editors/mesh/editmesh_extrude.cc`；`bmesh/intern/bmesh_opdefines.cc` |
| 3.5 修改器 | 说出参数进 DNA、变形在求值 | bpy 加 Subsurf；`obj.evaluated_get(dg)` 前后各数一次顶点，数量不同 | `source/blender/modifiers/intern/MOD_subsurf.cc`；`blenkernel/`（`mesh_calc_modifiers`） |

验收：能用 bmesh 写脚本从空 Mesh 造一个棱锥并挤出顶面；说出为什么编辑模式不直接改 DNA。自检：[Q013–024](site/qa/modules.html#q013)、[Q063–088](site/qa/features.html#q063)。

### 阶段 4 · 求值与分身（2 课）

| 课 | 目标 | 实验（bpy） | 源码锚点 |
|----|------|-------------|----------|
| 4.1 depsgraph 与 COW | 说出原始 ID 不动、求值写副本 | `dg = bpy.context.evaluated_depsgraph_get()`；`obj.evaluated_get(dg)` 拿到副本；改原始物体再看副本何时变 | `source/blender/depsgraph/intern/depsgraph_eval.cc`（`DEG_evaluate_on_refresh`） |
| 4.2 两张图 | 说出视口与 F12 为什么各建一张图 | 修改器视口级别 1、渲染级别 2；视口数顶点 vs 渲染数顶点不同 | `DAG_EVAL_VIEWPORT` / `DAG_EVAL_RENDER`（depsgraph） |

验收：解释「修改器为什么在求值时跑而不是点按钮时跑」；演示 `evaluated_get` 前后顶点数不同。自检：[Q151–162](site/qa/render.html#q151)。

### 阶段 5 · 渲染分道（5 课）

| 课 | 目标 | 实验（bpy） | 源码锚点 |
|----|------|-------------|----------|
| 5.1 视口一帧 | 说出 Draw Manager 假定图已求过；overlay 不是引擎 | 切换线框 / Solid / Material 预览，对照源码里各自由谁画 | `source/blender/editors/space_view3d/view3d_draw.cc`；`draw/intern/draw_context.cc`（`DRW_draw_view`） |
| 5.2 EEVEE 与 GPU 材质 | 说出材质预览常走 EEVEE；节点编译成 GPU 材质 | bpy 建材质、加 Principled 节点；视口切 Material 预览看效果 | `source/blender/draw/engines/eevee/`；`nodes/`（shader nodes） |
| 5.3 F12 链 | 说出 `RENDER_OT_render → RE_RenderFrame → RE_engine_render` | `bpy.ops.render.render()` 出图；换 `scene.render.engine` 再渲，对比 | `source/blender/editors/render/render_internal.cc`；`render/intern/` |
| 5.4 Cycles 接入 | 说出 Cycles 从 depsgraph 同步，不读编辑态 BMesh | 同一场景 EEVEE 与 Cycles 各渲一张，理解「共享求值、不共享 shader 后端」 | `intern/cycles/blender/sync.cpp`（`BlenderSync::sync_data`） |
| 5.5 颜色管理入门 | 说出渲染结果到显示器经过什么 | 改 `scene.display_settings` / `view_settings` 看同一张图的变化 | `source/blender/imbuf/`、`opencolorio` 配置（点到为止） |

验收：说出视口一帧与 F12 的分道点；解释 overlay 为什么不是 `RenderEngineType`；用 bpy 渲染一张图并指出走了哪条链。自检：[Q163–200](site/qa/render.html#q163)。

### 阶段 6 · 自选专题（7 课，已开）

按兴趣开课，对应旧「弱写 / 未开」区。已开七课：**几何节点（geometry / 字段）、合成（compositor）、雕刻（PBVH）、UV、权重（顶点组）、约束（constraint）、EEVEE 探针**。每课仍按「概念 → 走读 → 实验 → 自检」结构，并已在 [plan.md](plan.md) 弱写区勾选。其余专题（序列 / IO / GHOST 等）仍按兴趣再开。

| 课 | 目标 | 实验（bpy） | 源码锚点 |
|----|------|-------------|----------|
| 6.1 几何节点 | 说出它是修改器；解释字段按上下文求值 | `modifiers.new('NODES')` + 建节点组，立方体节点接输出，删修改器验证原网格没动 | `modifiers/intern/MOD_nodes.cc`；`functions/FN_field.hh` |
| 6.2 合成 | 在 F12 链上指出合成环节 | `scene.use_nodes=True`，插 BrightContrast 节点重渲染对比 | `render/intern/pipeline.cc`（`RE_compositor_execute`）；`source/blender/compositor/` |
| 6.3 雕刻 | 说出 PBVH 三种后端与笔画管线 | 进雕刻模式看 `tool_settings.sculpt.brush`；列 `bpy.data.brushes` | `blenkernel/intern/pbvh.cc`；`editors/sculpt_paint/paint_stroke.cc` |
| 6.4 UV 展开 | 解释 UV 存在面角上；验证 8 顶点 24 份 UV | `me.uv_layers.active`；对比 `len(vertices)` / `len(loops)` / `len(uv.data)` | `makesrna/intern/rna_mesh.cc`（`uv_layers`、`CD_PROP_FLOAT2`）；`editors/uvedit/` |
| 6.5 权重与顶点组 | 说出权重是顶点域数据；数值在 Mesh、名单在 Object | `vertex_groups.new` → `vg.add([...], 1.0, 'REPLACE')` → 读回 `vertices[i].groups` | `makesdna/DNA_meshdata_types.h`（`MDeformVert`）；`rna_object.cc`（`vertex_groups`）；`MOD_armature.cc` |
| 6.6 约束 | 说出约束改变换、修改器改几何；结果写在求值矩阵上 | `constraints.new('COPY_LOCATION')` 后对比 `ob.location` 与 `ob.matrix_world` | `makesdna/DNA_constraint_types.h`（`bConstraint`）；`blenkernel/intern/object_update.cc`（`BKE_object_eval_constraints`） |
| 6.7 EEVEE 探针 | 说出探针是光栅引擎的预计算缓存；Cycles 不需要 | `lightprobe_add(type='VOLUME')`；查 `bpy.data.lightprobes` | `makesdna/DNA_lightprobe_types.h`；`draw/engines/eevee/eevee_lightprobe.hh`（`LightProbeModule`） |

## 4. 站点改造方案（执行前需逐批确认）

1. 新增 `site/path/`：阶段索引页 + 每课一页，模板即第 2 节的六段式。
2. 新增 `site/glossary.html`：词汇表。ID、Main、COW、notifier、modal、BMO、SDNA、loop / face corner、half-edge、depsgraph、evaluated、overlay、RenderEngineType……每条一两句 + 链到首次使用的课。
3. [site/index.html](site/index.html) 改路径优先：首屏是阶段路线图；catalog / 五套投影 / 问答 / 深讲收进「参考区」一节。旧页内容不删不改，只改导航归类。
4. 200 问答降级为「自测题库」，按课挂链（课表里的「自检」列已给出挂点）。
5. 顶栏加「路径」入口；`site.js` / `styles.css` 复用现有阅读器外壳，课页沿用 Mermaid 约定。

## 5. 怎么算学会（里程碑）

- 阶段 0：控制台执行 bpy 命令 + 源码树搜符号，不看笔记。
- 阶段 1：说出 ID / DNA / RNA / Main 分工；演示用户计数增减。
- 阶段 2：完整复述「按 E 挤出」从按键到重画的链。
- 阶段 3：bmesh 脚本造棱锥并挤出顶面；讲清编辑模式为什么不直接改 DNA。
- 阶段 4：讲清修改器为什么在求值时跑；演示 `evaluated_get` 前后顶点数不同。
- 阶段 5：讲清视口与 F12 的分道点；用 bpy 渲染并指出链路；解释 overlay 不是引擎。
- 总验收：给一个没学过的建模操作（如 Loop Cut），能独立在源码里找到它的 Operator、BMO 与标脏点，并讲给过去的自己听。

## 6. 写作纪律增补（在 [plan.md](plan.md) 写作纪律之上）

- 每课至少一个**可运行的 bpy 实验**，附预期输出；实验 API 写课时对着本机 Blender 版本实测，不凭记忆。
- 结论给 `file:line`；拿不准的符号先在源码树 grep 验证，不编 API。
- 术语先在词汇表落地再在正文使用；概念段从零讲，不许直接上符号。
- 每课注明对照的源码版本与官方二进制版本。
- 只写 `ai-doc/**`；提交只 `git add ai-doc/`。

## 7. 不做

- 不删不改现有 28 页内容；不动 `archify/`；不扩 catalog、不重写 200 题。
- 不编译、不拉 `lib/` / LFS、不跑 `make update`；所有实验只用官方二进制 bpy。
- 不为凑课开专题；阶段 6 按兴趣再开。
- 不把课页写成第二份 catalog：课页讲「怎么学会」，参考页讲「去哪查」。

## 8. 进度追踪

| 课 | 页面 | 状态 |
|----|------|------|
| 阶段索引 | [site/path/index.html](site/path/index.html) | 已写 |
| 词汇表 | [site/glossary.html](site/glossary.html) | 已写（阶段 0–6 用词） |
| 0.1 工具就位 | [site/path/0-1.html](site/path/0-1.html) | 已写 |
| 1.1–1.4 数据地基 | [site/path/1-1.html](site/path/1-1.html) 起四课 | 已写 |
| 2.1–2.3 一次点击 | [site/path/2-1.html](site/path/2-1.html) 起三课 | 已写 |
| 3.1–3.5 建模核心 | [site/path/3-1.html](site/path/3-1.html) 起五课 | 已写 |
| 4.1–4.2 求值 | [site/path/4-1.html](site/path/4-1.html) 起两课 | 已写 |
| 5.1–5.5 渲染分道 | [site/path/5-1.html](site/path/5-1.html) 起五课 | 已写 |
| 6.1–6.7 自选专题 | [site/path/6-1.html](site/path/6-1.html) 起七课 | 已写 |
| 首页改路径优先 | [site/index.html](site/index.html) | 已写 |
