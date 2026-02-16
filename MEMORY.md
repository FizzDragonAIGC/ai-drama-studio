# MEMORY.md - 小Pax的长期记忆

## 关于卓卓
- **时区**：新加坡 (UTC+8)
- **平台**：FizzDragon (fizzdragon.com) - AI生成平台，对接多模型
- **愿景**：AI奈飞 - 把经典文学转化为影视级内容
- **风格偏好**：详细分析、结构化输出、深度人物设计

## 核心项目

### AI番剧制作系统
- 6部门架构（总导演/编剧/美术/导演/音乐/考据）
- 分层处理长剧本
- 情绪节拍系统
- 输出：Excel分镜表 + AI生成Prompt
- 路径：`ai_drama_studio_v2/`

### IP库
- 1000+ 无版权争议IP
- 公版文学 + 文化母体
- 路径：`ai_drama_studio_v2/ip_library/`

### 项目路径
- 《边城》: `ai_drama_studio_v2/projects/biancheng/`
- 《海上絲綢之路密碼》: `ai_drama_studio_v2/projects/silkroad/`

## 25-Agent系统
- **核心理念**：AI番剧 = 漫画 + 电影 + AI
- **架构**：7组25个Agent，108本书/资源
- **Skills**：17/25已完成（68%）
- **Prompt Generator**：8步对话式UI，多平台输出

## 重要决策
- 人物小传要有心理深度（欲望/恐惧/冲突）
- 分集要有钩子设计（让观众想看下一集）
- Prompt要兼容多模型（MJ/SD/Flux/DALL-E）
- Brave Search用`zh-hans`搜中文（不是`zh`）
- 现代改编策略：经典IP + 打工人视角（如浪浪山）

## AI番剧工作台 (完成!)
- **线上版**: https://stcws8.csb.app
- **本地**: `ai_drama_studio_v2/workbench/index.html`
- **v3**: `ai_drama_studio_v2/workbench/v3/index.html`
- **规模**: 30 Agents × 278 Skills
- **UI**: 黑红赛博朋克 + FizzDragon品牌
- **Provider**: 多家支持 (Claude/DeepSeek/Gemini/OpenRouter)
- **开发策略**: DeepSeek测试 (94%便宜), Claude生产
- **10步流程**: 访谈→概念→章节→角色→设计→画风→小说→叙事→分镜→完成
- **55种画风**: 8大类 (电影/人物/视觉/AI特效/地域/导演/2D/3D)

### 核心定位（重要！）
**AI番剧 ≠ 无脑短剧**
- 3-15分钟/集，像动漫番剧
- 有艺术追求，不是爽文套路
- 每集完整叙事弧线
- AI生成的动态漫画
- 目标：有深度、有风格的内容

## 测试项目
- **《海上絲綢之路密碼》**: 155,025字 → 10集/1000镜头/80分钟 ✅
- **《边城》沈从文**: 完成全局设计 ✅

## 部署信息
- **GitHub**: https://github.com/FizzDragonAIGC/ai-drama-studio
- **后端**: `http://34.58.33.115:3001` (screen: ai-drama-server)
- **前端**: `http://34.58.33.115:8080` (screen: ai-drama-frontend)
- **技术栈**: Node.js Express + Claude OAuth
- **OAuth方案**: 需要`@anthropic-ai/claude-code` SDK（标准SDK不支持OAuth token）

## 待办
- [ ] Moodboard多画风组合功能
- [ ] 导出功能（Excel/JSON）
- [ ] 对接FizzDragon平台测试
- [ ] 选定首个项目开始实际制作
- [ ] 清理死代码 (7个SKILLS数组, 14处重复JSON清理)
- [ ] 配置TOGETHER_API_KEY (Moodboard图片生成)
- [ ] 100集批次生成测试

## 技术细节

### Agent输出格式区分
- **JSON输出**: concept, narrative, chapters, character, artdirector, scene, costume, storyboard, color, artstyle, prompt, platform, vfx, lighting, pose, expression
- **自然语言**: screenwriter, script, dialogue, acting, interview
- **关键函数**: `needsJsonOutput()` in proxy-server.js

### 长内容批次生成
- **触发**: 集数 > 50
- **批次大小**: 25集/批
- **函数**: `runChapterAgentBatch()`, `toggleBatchPause()`, `resumeBatchGeneration()`

### 配置参数
- **maxSkills**: 5 (确保书籍方法论载入)
- **contentLimit**: 4000
- **DeepSeek max_tokens**: 8192

---
*最后更新：2026-02-16*
