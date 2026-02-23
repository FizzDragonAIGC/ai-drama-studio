# FizzDragon Workbench（对话式前置系统）

> 版本：draft（根据当前仓库代码自动梳理）  
> 前端：`/fizzdragon-frontend/index.html`（GitHub Pages）  
> 后端：`/fizzdragon-backend/proxy-server.js`（Render）  

本说明书目标：把 **系统的真实开发逻辑**（代码层面）讲清楚：
- 什么时候发生什么动作（按钮→函数→API→写入 assets）
- 断点续跑 / 断点重做怎么实现
- Auto‑Pilot 如何推进、失败怎么处理
- 两段式分镜为什么能防截断、怎么补齐 Prompt
- DeepSeek/Claude 等 Provider 的限制与参数
- 全量 Agent/Skill 的位置、用途、输入输出
- 导出物/对接生产系统需要哪些字段

---

## 0. 名词表（对齐沟通）

- **Project（项目）**：用户的一个影视项目容器，包含 `assets`、UI 状态、聊天记录等。
- **assets**：项目资产（概念、人物、章节、剧本、分镜、Prompt…）统一写入 `state.assets`。
- **Episode/Chapter**：本系统里常用“章/集”混称，导出时建议统一为 Episode。
- **runToken**：前端用来避免切换项目后异步回包“窜台”的守卫 token。
- **Two‑stage Storyboard**：分镜两段式：`storyboard_skeleton`（结构）→ `storyboard_prompt`（补 Image/Video prompts）。

---

## 1. 系统总体架构（你要的“开发逻辑总览”）

### 1.1 从输入到分镜的“主链路”

**Path A 上传小说**（Novel Import）
1) 导入小说 → 写入 `assets.story`
2) 概念 `assets.concept`
3)（可选）访谈 `assets.interview`
4) 画风 `assets.artstyle`
5) 角色 `assets.characters[]`
6) 章节 `assets.chapters[]`
7) 服化道 `assets.production_design`（costumes/props/sets）
8) 逐集剧本 `assets.scripts{ep}`
9) 逐集分镜 `assets.storyboards{ep}` + `Image_Prompt`/`Video_Prompt`

**依赖关系（关键）**
- 分镜必须基于“本集剧本”（否则只会得到空壳/错位）
- 剧本生成必须基于：概念 + 角色 + 章节（至少需要 concept + chapters）
- ProductionDesign 依赖：角色 + 章节（至少需要 characters）

### 1.2 前后端职责边界

- **前端（index.html）**：
  - 项目管理（新建/切换/垃圾桶/重命名/本地存储）
  - 任务编排（Auto‑Pilot、逐集生成、分镜补齐、重试/降级）
  - UI 展示（对话、资产库、状态标记）

- **后端（proxy-server.js）**：
  - AI Provider 调用（DeepSeek/Anthropic…）
  - JSON 型 agent 输出拦截（防止夹杂分析文本污染前端）
  - 并发队列（MAX_CONCURRENT）
  - 项目云端存储（登录后）
  - /health 保活

---

## 2. 断点续跑 / 断点重做（你点名要的）

### 2.1 防“窜台”核心：runToken + projectId guard

**问题**：用户切换项目时，旧项目的异步回包晚到，会写入新项目状态。

**做法（前端）**：
- 每次打开/切换项目会生成新的 `runToken`。
- 每次发起异步请求时把当前 `runToken + projectId` 记录下来。
- 回包落地前检查 token 是否一致；不一致则丢弃。

> 这能保证：切项目后“看起来还在跑”的回包不会污染当前项目。

### 2.2 Auto‑Pilot 的两种“断点策略”

- **断点续跑**：
  - 如果项目已有部分 assets，则跳过已完成步骤，从缺失处继续。
- **清空重跑**：
  - 用户确认后清空相关 assets，再从第 1 步开始。

前端在启动 Auto‑Pilot 时会弹出三选：
- 清空重跑
- 断点续跑
- 取消

### 2.3 分镜“断点续写”：不足目标镜头自动补齐

当某一集分镜生成不足目标镜头数（例如目标 30 镜，但本次只生成 20 镜）：
- 前端会继续以 append 模式调用下一批（默认 20 镜/次，失败会降级 10/5）
- **先补齐当前集** → 再进入下一集

### 2.4 长任务可暂停/续跑（批处理/Format Adapter）

后端支持批处理分段：
- 单次内容超过阈值会拆成批（例如 >40K 自动分 30K 批次）
- 前端/后端保留中间产物，用于恢复继续

---

## 3. Provider/模型/Token 限制（DeepSeek/Claude 等）

### 3.1 DeepSeek 的硬限制（必须写进产品说明）

- **DeepSeek max_tokens 上限：8192（绝对不能用 16384）**
- 默认超时：
  - 普通请求：25s
  - reasoner：120s（更慢，建议只用于需要推理质量的步骤）

### 3.2 并发限制（后端队列）

- 后端：`MAX_CONCURRENT = 3`
- 超过并发会进入 requestQueue 排队

### 3.3 “可接入的 Provider”

以当前代码为准：
- DeepSeek（OpenAI 兼容调用）
- Anthropic（Claude）
- 代码历史中曾出现 Gemini/OpenRouter（若要启用需补回配置与 key）

> Brave Research / Search：当前仓库未看到明确接入点（如需要我可以按你指定的“Research Agent”方案补一个 /api/research）。

---

## 4. 分镜两段式（稳定性关键模块）

### 4.1 为什么要两段式

**根因**：分镜 JSON 很长，且字段多，模型容易：
- 输出夹杂分析文字（导致 JSON parse 失败）
- 输出被截断（例如字符串断在一半：`"movement": "身体前倾`）

**解决**：拆成两段：
1) `storyboard_skeleton`：只输出结构字段（无 prompts）
2) `storyboard_prompt`：只补 `Image_Prompt / Video_Prompt`（不改原字段）

### 4.2 Skeleton 失败的重试/降级

前端策略：
- 检测非 JSON 或缺 storyboard → 自动重试
- 失败降级：20 镜 → 10 镜 → 5 镜

### 4.3 Prompt 缺失的一键补全（不重跑结构）

资产库里每集分镜会显示 🧩：
- 仅对缺失 `Image_Prompt/Video_Prompt` 的镜头分批补齐
- 仍然按 `scene_no + shot_no` 精准合并

---

## 5. Storyboard Excel 模板（以你给的 xlsx 为准）

你提供的模板（Sheet1）表头是 9 列：
1. 场景号
2. 场景地点
3. 镜头号
4. 景别
5. 镜头类型
6. 画面描述
7. 时间
8. 角色
9. 对白/旁白

**系统导出会在此基础上新增两列（追加在末尾）：**
10. Image Prompt
11. Video Prompt

> 这样能保持你们制作团队习惯的列顺序，又能把生成提示词完整带走。

---

## 6. 后端 API（按代码真实路由）

> 文件：`fizzdragon-backend/proxy-server.js`

### 6.1 核心 AI 调用
- `POST /api/agent/:agentId`（非流式）
- `POST /api/agent-stream/:agentId`（流式）

**JSON 型 agent 输出拦截**：
- 如果 agentId 属于 JSON 输出类型，但最终不是合法 JSON，后端会包装为：
  - `{ "error":"non_json_output", "raw":"..." }`

### 6.2 项目/脚本/分镜
- `POST /api/project/create`
- `POST /api/project/:projectId/scripts/generate`
- `GET  /api/project/:projectId/scripts`
- `PUT  /api/project/:projectId/scripts/:episode`
- `POST /api/project/:projectId/storyboard/:episode/generate`
- `GET  /api/project/:projectId/storyboard/:episode`
- `POST /api/project/:projectId/storyboard/generate-all`

### 6.3 配置/健康/队列
- `GET /health` / `GET /api/health`
- `GET /api/queue`
- `GET /api/providers`
- `GET /api/agents`
- `POST /api/config` / `GET /api/config`

### 6.4 登录与云端项目（必须登录）
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET  /api/auth/me`
- `GET  /api/auth/verify`
- `POST /api/auth/logout`

云端项目（JWT 隔离，URL 里的 userId 会被忽略）：
- `GET  /api/user-projects/:userId`
- `POST /api/user-projects/:userId`
- `PUT  /api/user-projects/:userId/:projectId`

---

## 7. 全量 Agent/Skill（代码位置 + 用途）

> Agent 定义：`fizzdragon-backend/agents-config.js`  
> Skill 文件：`fizzdragon-backend/skills/*.skill.md`

你可以把 Agent 理解为：**一个固定 system prompt + skill 组合 + 输出约束**。

### 7.1 分镜相关（最重要）
- `storyboard_skeleton`（🎥 分镜结构）
  - skills：`storyboard_master`, `creative_master`, `screenplay_complete`
  - 输出：纯 JSON，仅结构字段（不含 prompts）
- `storyboard_prompt`（🧩 Prompt 补全）
  - skills：`storyboard_master`
  - 输出：纯 JSON，只含 `scene_no/shot_no/Image_Prompt/Video_Prompt`

> 旧入口 `storyboard` 仍保留兼容（但前端默认走两段式）。

---

## 8. 前端按钮全清单（按钮→函数→作用）

> 说明：前端按钮数量很多，本节先给“入口级”按钮清单。完整清单可由脚本从 HTML 提取（已生成 `docs/_frontend_buttons.json`）。

### 8.1 顶部主流程按钮
- 📄 导入/写作 → `showStartOptions()`
- 🚀 Auto‑Pilot 开关 → `toggleAutoPilotMode()`
- 🚀 Auto（直接跑） → `runAutoPilot()`
- 💡 概念 → `triggerAgentWithCheck('concept')`
- 🎤 访谈 → `triggerAgentWithCheck('interview')`
- 👤 人物 → `triggerAgentWithCheck('character')`
- 📝 章节 → `triggerAgentWithCheck('chapters')`
- 👗 服化道 → `triggerAgentWithCheck('production')`
- ✍️ 编剧 → `triggerAgentWithCheck('script')`
- 🎬 分镜 → `triggerAgentWithCheck('storyboard')`

### 8.2 分镜补齐/导出
- 🧩 补全 Prompt → `fillStoryboardPrompts(ep)`
- 📥 导出单集分镜 → `exportChapterStoryboard(ep)`
- 📥 导出全部 Excel → `exportToExcel()`
- 📋 复制全部 Prompt → `copyAllStoryboardPrompts()`

### 8.3 左侧项目列表
- 新建项目 → `startNewProject()`
- 收起/展开列表 → `toggleSidebarCollapse()`（新增）
- 批量删除（入垃圾桶）→ `bulkMoveSelectedToTrash()`

---

## 9. 本地存储与云端同步（Guest vs 登录）

### 9.1 localStorage 容量限制
浏览器 localStorage 通常只有 5–10MB。

系统策略：
- **云端保存完整版**（必须登录）
- **本地保存截断版缓存**：story/scripts/storyboards/chatHistory 会按阈值截断

### 9.2 未登录（guest）
- 本地 key：`fizzdragon_projects_guest`
- 不做云端同步/恢复

### 9.3 登录后
- 本地 key：`fizzdragon_projects_<userId>`
- 同步时所有请求带 `Authorization: Bearer ...`

---

## 10. 你要的“逐行读代码”说明（诚实边界）

我可以做到：
- 把所有关键模块按“入口→调用链→状态写入→异常处理→恢复策略”解释到实现细节
- 给出关键函数名、文件路径、以及需要你们重点 review 的片段

但“每一行逐字解释”在工程上没有意义（大量是 UI/CSS/渲染细节），也会淹没真正的架构点。

我建议我们按下面的方式交付一个 **可执行的技术说明书**：
1) 主链路 + 状态机（Auto‑Pilot / 分镜生成 / 续跑）
2) 风险点清单（截断、并发、超时、token 上限、localStorage）
3) 你们生产系统的对接字段与导出 API

---

## 11. 待补齐（需要你配合两件事）

1) **前端截图**：我这边 Browser Control 目前不可用（openclaw browser service 连接不上），我无法自动截图。
   - 你可以：
     - A) 直接给我几张你想要的 UI 截图（我会嵌入文档）
     - B) 你那边启用 Browser Relay 并 attach tab（我就能自动化截图与标注）

2) **Brave Research / 其它 AI provider 的“可用性清单”**：当前代码里没有完整 Research 模块，我可以按你们要求补一个：
   - `/api/research`（Brave Search）
   - `/api/llm/openrouter`（多模型转发）

---

# 附录 A：自动抽取清单文件

- 前端按钮抽取：`docs/_frontend_buttons.json`
- 后端路由抽取：`docs/_backend_routes.json`
- 你给的分镜模板列：`docs/_storyboard_template_columns.json`
