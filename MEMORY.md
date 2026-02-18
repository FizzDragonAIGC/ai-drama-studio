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
- **《霸王別姬》**: 100集×3分 + 10集×10分 = 6000鏡頭 ✅

## 5國劇本分鏡系統 (完成!)

### DeepSeek諮詢優化 (3輪)
- 新增字段: 情感弧線、視覺潛台詞、空間敘事、大師參考
- 達標指標: 構圖100%、燈光8種、轉場9種、情感高潮比2.7x

### 5個國家劇本 (30,000鏡頭)
| 國家 | 劇本 | 短版(10集×10分) | 長版(100集×3分) |
|------|------|-----------------|-----------------|
| 🇨🇳 中國 | 霸王別姬 | 1,500鏡 | 4,500鏡 |
| 🇯🇵 日本 | 千與千尋 | 1,500鏡 | 4,500鏡 |
| 🇺🇸 美國 | 肖申克的救贖 | 1,500鏡 | 4,500鏡 |
| 🇮🇹 義大利 | 天堂電影院 | 1,500鏡 | 4,500鏡 |
| 🇮🇳 印度 | 三傻大鬧寶萊塢 | 1,500鏡 | 4,500鏡 |

### 輸出路徑
- 分鏡表: `ai_drama_studio_v2/5_countries_final/`
- 文化Skill: `skills/screenplay_culture_*.skill.md`

## 部署信息
- **GitHub**: https://github.com/FizzDragonAIGC/ai-drama-studio
- **后端**: `http://34.58.33.115:3001` (screen: ai-drama-server)
- **前端**: `http://34.58.33.115:8080` (screen: ai-drama-frontend)
- **技术栈**: Node.js Express + Claude OAuth
- **OAuth方案**: 需要`@anthropic-ai/claude-code` SDK（标准SDK不支持OAuth token）

## Fizziks信用系统
- **定价**: 100 Fizziks = $1.00 USD
- **毛利**: ~99% (API成本极低)
- **工作流**: 手动步进，每步确认扣费
- **小说向导**: 结构10⚡→章节15⚡→角色10⚡→场景10⚡→写作20⚡ = 65⚡/项目

## 最新修复 (2026-02-18)
- **Character Agent**: `characters`数组 + `role`必填字段
- **ArtStyle Agent**: `final_suggestion` + 多重fallback
- **Script Agent**: 直接【場景】输出，无JSON
- **章节顺序**: ✅/🚀/🔒 UI + 上下文链接
- **Production Design**: AI Prompt 50-120词 + 复制按钮

## 待办
- [ ] 修复服化道渲染 (costume.outfits格式不匹配)
- [ ] Moodboard多画风组合功能
- [ ] 导出功能（Excel/JSON）
- [ ] 对接FizzDragon平台测试
- [ ] 选定首个项目开始实际制作
- [ ] Git历史清理（移除泄露的API Key）

## UI设计规范（重要！卓卓确认）

### DeepSeek风格纯对话式界面
- **左侧边栏**：不同session = 不同书籍/项目
- **右侧**：纯对话窗口，一问一答
- **无会员系统**：所有用户功能一致
- **唯一按钮**：导入小说（其他全对话完成）

### 欢迎语模板
```
我们学习了上百本书籍，包括：
- Robert McKee《故事》
- Joseph Campbell《千面英雄》
- Blake Snyder《Save the Cat》
- Christopher Vogler《作家之路》
- Tom Bancroft《Creating Characters with Personality》
...等100+本大师著作

让每一个创作者有机会和真正的大师共同创作。
```

### 对话式访谈流程
1. 📄 用户导入小说（唯一需要点击的按钮）
2. 🤖 AI读完后在对话框里一个个问问题
3. 💬 用户在输入框回答
4. ✅ 回答完自动跳下一题
5. 📊 10题答完 → 自动进入下一个Agent生成

### 关键原则
- **不用弹窗**：问题直接显示在对话流里
- **不用按钮**：除了导入文件
- **自动流转**：回答完自动继续
- **稳定优先**：对话式比按钮式更稳定

### 镜头密度标准
- **10镜/分钟** = 最低标准（快节奏/对话少）
- **15镜/分钟** = 推荐值（平衡）
- **20+镜/分钟** = 高密度（动作戏/精细叙事）
- **公式**: 总镜头 = 集数 × 每集时长 × 镜头密度

## 完整系统架构（卓卓确认 2026-02-18）

### 6步流程
1. **小说输入** - 导入小说 OR AI根据需求写小说
2. **高概念分析** - 为后面写长剧本做准备，必须一集集写有概况
3. **角色分析** - 人物小传（帮助写章节）+ 人物形象（AI生图基础）
4. **章节规划** - 多少章节，每章多少分钟
5. **服化道** - 角色不同场戏穿不同衣服、拿不同道具，提示词存项目资产
6. **剧本写作** - 一章章写，断了参考前面章节+核心内容+人物小传续写（保持一致）
7. **分镜生成** - 每章可生成分镜，包含：场景/光线/运镜/演技/动作/图片描述/视频描述

### 项目资产（Project Assets）
每个项目包含：
- 高概念
- 人物小传
- 章节集数
- 服化道（costumes/props/sets）
- 人物提示词
- 分章内容
- 每章剧本
- 每章分镜Excel

### 关键特性
- **分章存储**：写一章存一章，方便断点续写
- **上下文一致**：续写时参考前面章节+人物小传
- **服化道分场景**：不同场戏不同服装道具
- **输出到桌面**：最终导出供快速影视制作

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

## 5国专业模式测试 (2026-02-17)

### 测试结果
- **模式**: 专业模式 (40集×10分钟×10镜头/分)
- **总用时**: ~120分钟
- **API消耗**: $0.023 (156k tokens)

### 完成情况
| 电影 | 状态 | 大纲 | 人物 | 分镜 |
|------|------|------|------|------|
| 🇨🇳 霸王别姬 | ✅ | 6k字 | 4k字 | 48k字 |
| 🇯🇵 千与千寻 | ✅ | 7k字 | 5k字 | 38k字 |
| 🇺🇸 肖申克的救赎 | ✅ | 7k字 | 4k字 | 14k字 |
| 🇮🇹 天堂电影院 | ✅ | 9k字 | 4k字 | 33k字 |
| 🇮🇳 三傻大闘宝莱坞 | ⚠️3/5集 | 6k字 | 4k字 | 28k字 |

### 输出文件
- `5films_detailed_storyboard.csv` (66KB)
- `5films_detailed_storyboard.json` (71KB)
- `5films_professional_summary.json` (2KB)

---
## 产品愿景 (2026-02-18更新)
- **使命**: "让每个人都能拍出自己的电影"
- **目标**: 替代好莱坞，创作革命
- **Phase 1**: 分镜系统 (现在)
- **Phase 2**: AI影视制作
- **Phase 3**: 全民创作平台
- **Phase 4**: AI奈飞

## 品牌设计
- **Logo红**: #E31B23
- **主题**: 纯黑红，无其他颜色
- **Favicon**: 黑底红F
- **标语**: "让每个人都能拍自己的电影"

## 测试标准
- **100项专业测试清单** (`TEST_PROFESSIONAL.md`)
- **目标**: S级 95%+通过率
- **原则**: 不通过就修复，不妥协

## 当前隧道URL
`https://oasis-experimental-toolbox-voltage.trycloudflare.com/chat.html`

## 通信频道
- Kuku通信: https://beerbear4369.github.io/kuku-longxia-chat/
- 隧道变化自动更新到该页面

*最后更新：2026-02-18 17:40 UTC*
