# Archify 图（非权威）

本目录是用本机 Archify Skill 生成的**邻居图**，方便一眼看运行时怎么挨着。  
权威条目仍是 [../site/catalog.html](../site/catalog.html)。图上不另起一套子系统名单。

## 怎么打开

本机浏览器直接打开 HTML（无需构建、无需 Node）：

| 成品 | 源 JSON | 看什么 |
|------|---------|--------|
| [blender-runtime.html](blender-runtime.html) | [blender-runtime.architecture.json](blender-runtime.architecture.json) | DNA / RNA / BKE / WM / editors / BMesh / depsgraph / Draw+EEVEE / Cycles |
| [blender-mainpath.html](blender-mainpath.html) | [blender-mainpath.dataflow.json](blender-mainpath.dataflow.json) | 面板或快捷键 → RNA 或 Operator → Mesh/BMesh → tag+notifier → depsgraph → 视口或 F12 |

学习站顶栏「Archify」链到运行时图。从 `site/` 出发的相对路径是 `../archify/blender-runtime.html`。

## 阅读约定

- 标题和说明是中文；源码符号保持英文（`DEG_id_tag_update`、`DAG_EVAL_VIEWPORT` 等）。
- 不编不存在的 API：求值入口是 `DEG_evaluate_on_refresh` / `on_framechange`，没有 `DEG_evaluate`。
- 节点不超过 12 个，只画主线邻居。合成、序列、雕刻、IO 不在这两张图里。
- JSON 是可再生成的规格；HTML 是 `deliver --quality showcase` 的冻结成品。改图先改 JSON，再 validate / deliver，不要手改 HTML。
- 同目录的 `*.visual-check.json` / `*.visual-check.html` 是浏览器量测回执，不是第二套目录。截图 PNG 不入库：官方 `*.png` 走 Git LFS，本公开 fork 不能上传新 LFS 对象。
