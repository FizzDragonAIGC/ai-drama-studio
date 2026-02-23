## 7. 全量 Agent/Skill（代码位置 + 用途）

> Agent 定义：`fizzdragon-backend/agents-config.js`  
> Skill 文件：`fizzdragon-backend/skills/*.skill.md`  
> 后端装配位置：`fizzdragon-backend/proxy-server.js`（`loadAgentSkills()` + `/api/agent/:agentId`）

你可以把 **Agent** 理解为：
- 一段固定的 **system prompt**（定义“你是谁/你要输出什么”）
- + 一组 **skills**（方法论文档，作为“参考知识”注入 prompt）
- + 一套 **输出约束**（JSON / 自然语言）

---

### 7.1 Skill 的“装配逻辑”（你说的 skill 逻辑）

后端并不是“把 skill 当代码执行”，而是：**把 skill.md 的文本内容拼进 system prompt**。

关键规则（来自 `proxy-server.js`）：

1) **skill 内容会被缓存 + 清洗**（避免 JSON 逃逸/乱码）：
- `sanitizeForJson()` 清理特殊字符
- `skillCache` 缓存

2) **skill 单文件注入长度会被截断**：
- 单个 skill 文本超过约 3000 字符会截断并附：`...(更多方法论详见完整文档)`

3) **每次调用最多注入 maxSkills 个 skill**：
- `runtimeConfig.maxSkills` 默认 **5**（可通过 `/api/config` 调整）

4) 最终拼装的 system prompt 结构是：
- `agent.prompt`（角色 + 任务 + 输出格式）
- + `专业方法论参考（skillsContent）`
- + “必须体现对内容具体理解”的总约束

> 这就是 skill 的真正作用：提供“写法/规则/检查清单”，让模型更稳定地输出你要的结构。

---

### 7.2 Agent 全清单（以 agents-config.js 为准）

下面是当前后端配置的全部 Agent（**agentId → name → group → skills → 输出形态**）。

- **director**（🎬 總導演）
  - group：統籌
  - skills：`narrative_complete`, `cinematography_complete`
  - 输出：JSON
- **concept**（💡 概念生成器）
  - group：統籌
  - skills：`core_methodology`
  - 输出：JSON
- **script_parser**（📋 劇本拆分）
  - group：統籌
  - skills：`script_parser`, `batch_processing`, `core_methodology`
  - 输出：JSON
- **format_adapter**（✂️ 格式重組）
  - group：統籌
  - skills：`format_adapter`, `core_methodology`
  - 输出：JSON

- **interview**（🎤 訪談師）
  - group：故事
  - skills：`interview_complete`, `core_methodology`
  - 输出：自然语言（问题清单）
- **story_architect**（🏗️ 故事架構師）
  - group：故事
  - skills：`story_architect`, `narrative_complete`, `core_methodology`
  - 输出：JSON
- **episode_planner**（📋 單集規劃師）
  - group：故事
  - skills：`episode_planner`, `narrative_complete`, `netflix_streaming`
  - 输出：JSON
- **novelist**（📖 小說家）
  - group：故事
  - skills：`narrative_complete`, `dialogue_complete`, `creative_master`
  - 输出：自然语言（正文）
- **screenwriter**（✍️ 編劇）
  - group：故事
  - skills：`netflix_streaming`, `screenplay_complete`, `dialogue_complete`, `screenplay_expand`
  - 输出：自然语言（逐集剧本）
- **narrative**（📖 敘事/章節）
  - group：故事
  - skills：`core_methodology`
  - 输出：JSON

- **storyboard_skeleton**（🎥 分鏡(結構)）
  - group：導演
  - skills：`storyboard_master`, `creative_master`, `screenplay_complete`
  - 输出：JSON（只含结构字段，不含 prompts）
- **storyboard_prompt**（🧩 分鏡(Prompt補全)）
  - group：導演
  - skills：`storyboard_master`
  - 输出：JSON（仅 scene_no/shot_no/Image_Prompt/Video_Prompt）
- **storyboard**（🎥 分鏡，旧兼容入口）
  - group：導演
  - skills：`storyboard_master`, `creative_master`, `screenplay_complete`, `novel_processing_complete`
  - 输出：JSON（结构 + prompts，长且更易截断；因此前端默认两段式）
- **cinematography**（📷 攝影/燈光）
  - group：導演
  - skills：`cinematography_complete`
  - 输出：JSON

- **artstyle**（🎨 畫風）
  - group：美術
  - skills：`cinematography_complete`, `character_complete`
  - 输出：JSON
- **character**（👤 角色設計）
  - group：美術
  - skills：`character_complete`, `narrative_complete`
  - 输出：JSON
- **costume**（👗 服裝設計）
  - group：美術
  - skills：`costume_design`, `character_complete`
  - 输出：JSON
- **prop**（🎭 道具設計）
  - group：美術
  - skills：`prop_design`, `narrative_complete`
  - 输出：JSON
- **set_design**（🏛️ 場景設計）
  - group：美術
  - skills：`set_design`, `cinematography_complete`
  - 输出：JSON
- **production_design**（👔 服化道總覽）
  - group：美術
  - skills：`costume_design`, `prop_design`, `set_design`
  - 输出：JSON

- **prompt**（🖼️ Prompt師）
  - group：AI輸出
  - skills：`image_prompt`, `video_prompt`
  - 输出：JSON
- **image_prompt**（🎨 圖片提示詞）
  - group：AI輸出
  - skills：`image_prompt`, `cinematography_complete`
  - 输出：JSON
- **video_prompt**（🎬 視頻提示詞）
  - group：AI輸出
  - skills：`video_prompt`, `cinematography_complete`
  - 输出：JSON

- **vfx**（💥 VFX/特效）
  - group：專項
  - skills：`cinematography_complete`, `storyboard_complete`
  - 输出：JSON
- **music**（🎵 音樂設計）
  - group：專項
  - skills：`music_complete`
  - 输出：JSON
- **era**（📜 時代/文化）
  - group：專項
  - skills：`screenplay_complete`, `character_complete`
  - 输出：JSON

- **novel_processor**（📚 長篇處理）
  - group：長篇處理
  - skills：`novel_processing_complete`, `narrative_complete`
  - 输出：JSON
- **script_reviewer**（📋 劇本評審）
  - group：質量評估
  - skills：`screenplay_complete`, `narrative_complete`
  - 输出：JSON

- **ad_director**（🎬 廣告導演）
  - group：廣告
  - skills：`ad_creative`
  - 输出：JSON
- **ad_strategy**（🧠 廣告策略師）
  - group：廣告
  - skills：`ad_creative`
  - 输出：JSON
- **ad_visual**（👁️ 廣告視覺師）
  - group：廣告
  - skills：`storyboard_complete`, `cinematography_complete`
  - 输出：JSON
- **ad_copywriter**（✍️ 廣告文案師）
  - group：廣告
  - skills：`ad_creative`
  - 输出：JSON

---

### 7.3 输出形态判定（JSON vs 自然语言）

后端用 `needsJsonOutput(agentId)` 统一控制：
- `screenwriter / novelist / interview` 等输出自然语言
- 其余默认要求输出纯 JSON

并且在请求时会在 userMessage 末尾追加强约束：
- JSON agent：要求“只输出 { ... } JSON，不要 ```，不要解释文字”
- 自然语言 agent：要求“自然中文输出，不要 JSON/代码格式”

---

### 7.4 Token/超时/并发限制（你点名要的“token限制”）

后端限制（`proxy-server.js`）：

1) **并发队列**：
- `MAX_CONCURRENT = 3`，超过进入 `requestQueue`

2) **DeepSeek max_tokens**：
- 对长输出 agent（storyboard/novelist/screenwriter/narrative/story_architect/episode_planner/format_adapter）统一使用 **8192**
- 普通 agent 用 4096

3) **请求超时**（为适配 Render 免费实例的 30s）：
- 普通：25 秒
- DeepSeek reasoner：120 秒（仅在前端显式传 `useReasoner:true` 才会启用）

4) **输入内容长度截断**：
- 普通 agent：`runtimeConfig.contentLimit`（默认 2500，可由模式 preset 或 `/api/config` 修改）
- 长内容 agent：`format_adapter / script_parser / novelist / screenwriter` 上限 **50000 字符**

---

### 7.5 项目关系与资产依赖（“项目关系”你要写进文档的部分）

项目数据结构核心是：`project.assets`。

关键依赖（建议你们生产系统也按此顺序校验）：
- **Screenwriter(逐集剧本)** 依赖：`assets.concept` + `assets.characters` + `assets.chapters`
- **Storyboard(分镜)** 强依赖：`assets.scripts[ep]`（每集必须先有剧本）
- **Production Design(服化道)** 依赖：`assets.characters`（最好同时参考 chapters/scene）

因此系统的“安全生成顺序”是：
Concept → Character → Chapters → ProductionDesign → Screenwriter(逐集) → Storyboard(逐集)
