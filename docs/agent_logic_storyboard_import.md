# 智能体逻辑：分镜导入 / 格式不一致 → 归一化 → 专业补足

> 目标：我们的系统支持用户导入分镜（Excel/CSV/JSON）。
> 若用户格式不一致或字段缺失，则用“专业分镜 skill”把它补成可制作的标准，并补齐 Image/Video Prompt。

---

## 0) 统一数据结构（系统内部）

内部永远使用统一 Shot schema：
- 关键主键：`scene_no + shot_no`
- 必含字段：scene/time/lighting/mood/character/action/dialogue/movement/shot_type/description + prompts

---

## 1) 入口与用户流程（UX）

### 1.1 用户入口
- 资产库（右侧）增加按钮：**📥 导入分镜（Excel/CSV/JSON）**

### 1.2 导入后给用户三选
1) **直接使用（不改动）**：仅做字段映射与序号补齐
2) **专业补足（推荐）**：补缺字段 + 统一格式 + 补 Prompt
3) **仅补 Prompt**：不动结构字段，仅补 Image/Video Prompt

---

## 2) 后端处理流水线（强约束、可断点续跑）

### Step A：解析文件（非 LLM）
- Excel/CSV → 解析为 row[]
- JSON → 解析为 shot[] 或 storyboard[]

### Step B：归一化（规则+可选 LLM）
- 用 `storyboard_import_normalize` 规则：
  - 列名映射
  - 补 scene_no/shot_no
  - 保证字段存在
  - 去重与排序

输出：`normalized.storyboard[]`

### Step C：质量检测
计算：
- 缺 description 数
- 缺 shot_type/movement 数
- 缺 prompts 数

### Step D：智能补足（LLM，按需调用）
根据用户选择：

- **专业补足**：调用 `storyboard_gapfill_pro`（一次最多 20 镜/批，避免截断）
- **仅补 Prompt**：复用现有 `storyboard_prompt`（两段式）

### Step E：合并回项目 assets
写入：
- `assets.storyboards[episode] = normalized+filled`（按主键 merge）
- 记录：`assets.storyboard_import_log[]`（来源文件名、导入时间、补足统计）

---

## 3) 关键策略（稳定性）

### 3.1 分批处理
- 任意补足调用：默认 20 镜/批
- 失败自动降级：20→10→5

### 3.2 不覆盖用户内容
- 字段非空就不改
- 仅补空值/无意义占位符

### 3.3 断点续跑
- `assets.storyboard_import_state = { fileHash, episode, cursor, mode }`
- 中断后可继续：从 cursor 继续补足

---

## 4) 推荐新增 Agent（可选，但更好用）

### 4.1 `storyboard_importer`
- skills：`storyboard_import_normalize`, `storyboard_gapfill_pro`, `storyboard_master`
- 职责：从“任意格式分镜表”输出统一 schema + 补足统计

> 也可不新增 agent，直接在后端用规则处理+按需调用已有 `storyboard_prompt`。

---

## 5) 对接导出
导出时强制列：
- 模板 9 列 + `Image Prompt` + `Video Prompt`

---
