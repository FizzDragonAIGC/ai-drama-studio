// AI番剧制作系统 - 500+ Skills 数据库
// 108本书 × 5个Skills = 540个Skills

const SKILLS_DATABASE = {
  // ═══════════════════════════════════════════════════════════════
  // 📖 第一部分：故事与编剧类 (25本书 × 5 = 125 Skills)
  // ═══════════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────────
  // 《故事》罗伯特·麦基 - 5个Skills
  // ─────────────────────────────────────────────────────────────
  "mcgee_story_triangle": {
    book: "《故事》麦基",
    name: "故事三角",
    category: "story",
    agent: ["A02"],
    description: "经典设计、极简主义、反结构三种故事形态",
    content: `
【故事三角理论】

三种故事形态：
1. 经典设计（Archplot）
   - 因果关系明确
   - 主动主角
   - 封闭式结局
   - 线性时间
   - 外部冲突为主
   
2. 极简主义（Miniplot）
   - 开放式结局
   - 内部冲突为主
   - 被动主角
   - 多线叙事
   
3. 反结构（Antiplot）
   - 非因果
   - 非线性时间
   - 矛盾现实

【应用场景】
- 类型片 → 经典设计
- 文艺片 → 极简主义
- 实验性 → 反结构
    `,
    promptKeywords: ["classical narrative", "minimalist storytelling", "experimental structure"],
    questions: [
      "你的故事更偏向哪种形态？经典叙事还是实验性？"
    ]
  },

  "mcgee_scene_design": {
    book: "《故事》麦基",
    name: "场景设计五要素",
    category: "story",
    agent: ["A02", "A04"],
    description: "每个场景必备的五个核心要素",
    content: `
【场景设计五要素】

每个场景必须包含：

1. 欲望（Desire）
   - 角色在这个场景想要什么？
   - 具体、可衡量的目标

2. 力量（Forces）
   - 支持角色的力量
   - 阻碍角色的力量
   
3. 冲突（Conflict）
   - 力量之间的碰撞
   - 内部/外部冲突
   
4. 转折（Turning Point）
   - 场景中的价值变化
   - 情况变好或变坏
   
5. 结果（Outcome）
   - 角色离目标更近还是更远？
   - 为下一场景铺垫

【检查清单】
□ 角色想要什么？
□ 什么阻碍了他？
□ 发生了什么冲突？
□ 价值如何转变？
□ 结果是什么？
    `,
    promptKeywords: ["scene with conflict", "dramatic tension", "turning point"],
    questions: [
      "这个场景中角色的核心欲望是什么？",
      "有什么力量在阻碍他？"
    ]
  },

  "mcgee_value_charge": {
    book: "《故事》麦基",
    name: "价值转换",
    category: "story",
    agent: ["A02", "A06"],
    description: "场景中的正负价值变化",
    content: `
【价值转换理论】

每个场景都有价值变化：
- 正 → 负
- 负 → 正
- 正 → 更正
- 负 → 更负

核心价值类型：
1. 生存价值：生/死
2. 爱情价值：爱/恨
3. 真理价值：真/假
4. 正义价值：对/错
5. 自由价值：自由/束缚

【设计方法】
1. 确定场景的核心价值
2. 确定开场时的价值状态
3. 设计转折使价值改变
4. 确定结束时的价值状态

【示例】
开场：角色安全（正）
冲突：遭遇危险
转折：被背叛
结束：生命受威胁（负）
    `,
    promptKeywords: ["emotional shift", "dramatic irony", "value change"],
    questions: [
      "这个场景开始时角色的状态是正还是负？",
      "结束时发生了什么变化？"
    ]
  },

  "mcgee_inciting_incident": {
    book: "《故事》麦基",
    name: "激励事件",
    category: "story",
    agent: ["A02"],
    description: "打破平衡、启动故事的关键事件",
    content: `
【激励事件】

定义：打破主角生活平衡的事件

特征：
1. 彻底改变主角的处境
2. 引发主角的核心欲望
3. 设定故事的主要问题
4. 不可逆转

类型：
1. 因果型：由之前事件导致
2. 巧合型：偶然发生
3. 主动型：主角自己引发
4. 被动型：外力强加

位置：
- 电影：前15分钟内
- 小说：前10%篇幅
- 短剧：第1集

【设计要点】
- 必须够大：值得用整个故事来解决
- 必须具体：观众能理解问题所在
- 必须个人：与主角直接相关
    `,
    promptKeywords: ["inciting incident", "story catalyst", "life-changing event"],
    questions: [
      "什么事件打破了主角的日常？",
      "这个事件发生在故事的什么位置？"
    ]
  },

  "mcgee_climax": {
    book: "《故事》麦基",
    name: "高潮设计",
    category: "story",
    agent: ["A02", "A06"],
    description: "故事高潮的设计原则",
    content: `
【高潮设计】

高潮 = 最终的、不可逆的价值变化

四大要素：
1. 最大压力
   - 主角面临最大的障碍
   - 赌注最高的时刻
   
2. 最终选择
   - 主角必须做出决定
   - 选择揭示真正的性格
   
3. 价值逆转
   - 最大幅度的价值变化
   - 正→负 或 负→正
   
4. 不可逆性
   - 无法回到从前
   - 永久改变

【高潮层次】
1. 场景高潮：每场戏的转折
2. 序列高潮：多场戏的累积
3. 幕高潮：每一幕的顶点
4. 故事高潮：整个故事的顶点

【避免的错误】
❌ 高潮靠巧合解决
❌ 高潮靠新角色解决
❌ 主角在高潮被动
    `,
    promptKeywords: ["climax moment", "final confrontation", "dramatic peak"],
    questions: [
      "高潮时刻主角面临什么选择？",
      "这个选择如何揭示他的真正性格？"
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 《对白》罗伯特·麦基 - 5个Skills
  // ─────────────────────────────────────────────────────────────
  "mcgee_dialogue_principle": {
    book: "《对白》麦基",
    name: "对白基本原理",
    category: "dialogue",
    agent: ["A03"],
    description: "对白的本质是带着目的的言语行动",
    content: `
【对白基本原理】

核心定义：对白 = 带着特定目的的言语行动

三种对白类型：
1. 对别人说 - 角色间对话
2. 对自己说 - 内心独白
3. 对观众说 - 画外音/旁白

对白的六大任务：
1. 执行内在行动
2. 推动场景至转折点
3. 传达信息和观点
4. 个性化角色
5. 抓住注意力
6. 保持真实可信

【黄金法则】
说了话就等于做了事
每句话都是达成欲求的手段
    `,
    promptKeywords: ["meaningful dialogue", "purposeful speech", "character voice"],
    questions: [
      "这句对白的目的是什么？",
      "角色通过说这句话想要达成什么？"
    ]
  },

  "mcgee_dialogue_subtext": {
    book: "《对白》麦基",
    name: "潜台词设计",
    category: "dialogue",
    agent: ["A03"],
    description: "台词表面之下的真正含义",
    content: `
【潜台词三层结构】

第一层：已说（Said）
- 字面意思
- 选词措辞
- 语法语调

第二层：未说（Unsaid）
- 角色知道但选择不说的
- 观众可以推测出的

第三层：不可说（Unsayable）
- 角色自己都不知道的
- 潜意识动机

【设计方法】
1. 先写出角色真正想说的（潜台词）
2. 再写出角色实际说的（文本）
3. 让两者有距离但有联系

【示例】
潜台词："我爱你，别离开我"
文本："路上小心"

潜台词："我恨你"
文本："随便你"
    `,
    promptKeywords: ["subtext", "hidden meaning", "unspoken emotion"],
    questions: [
      "角色真正想说的是什么？",
      "为什么他选择不直接说？"
    ]
  },

  "mcgee_dialogue_errors": {
    book: "《对白》麦基",
    name: "对白常见错误",
    category: "dialogue",
    agent: ["A03"],
    description: "写对白时应避免的七种错误",
    content: `
【对白七宗罪】

1. 内容空洞
   ❌ 角色说两人都已知道的事
   ✅ 让信息对至少一方是新的

2. 情绪过激
   ❌ 小题大做，反应过度
   ✅ 让潜台词支撑情绪

3. 知道太多
   ❌ 角色说只有作者才知道的事
   ✅ 保持角色认知边界

4. 借口当动机
   ❌ 角色说出真正动机
   ✅ 动机藏于潜意识

5. 陈词滥调
   ❌ 观众能猜到下句话
   ✅ 出乎意料但合情合理

6. 笼统无奇
   ❌ 谁说都行的话
   ✅ 只有这个角色才会说

7. 铺张卖弄
   ❌ 漂亮但不符人物
   ✅ 服从角色性格
    `,
    promptKeywords: ["natural dialogue", "character-specific speech"],
    questions: [
      "这句话是否只有这个角色才会说？",
      "观众能猜到这句话吗？"
    ]
  },

  "mcgee_dialogue_character": {
    book: "《对白》麦基",
    name: "对白角色化",
    category: "dialogue",
    agent: ["A03", "A05"],
    description: "通过对白塑造独特的角色声音",
    content: `
【对白角色化】

每个角色应有独特的声音：

语言特征维度：
1. 词汇选择
   - 文雅/粗俗
   - 专业/通俗
   - 抽象/具体

2. 句式结构
   - 长句/短句
   - 完整/省略
   - 主动/被动

3. 语气特点
   - 直接/委婉
   - 自信/犹豫
   - 热情/冷淡

4. 口头禅
   - 特定词汇
   - 语气词
   - 习惯表达

【示例对比】
同样表达"同意"：
- 学者："此言甚是"
- 青年："没毛病"
- 军人："收到"
- 老人："是这个理儿"
    `,
    promptKeywords: ["distinct voice", "character speech pattern"],
    questions: [
      "这个角色的语言有什么特点？",
      "他的口头禅是什么？"
    ]
  },

  "mcgee_dialogue_conflict": {
    book: "《对白》麦基",
    name: "对白与冲突",
    category: "dialogue",
    agent: ["A03", "A02"],
    description: "不同冲突层面的对白设计",
    content: `
【对白与冲突层面】

四个冲突层面的对白特点：

1. 内心冲突
   - 对白最多
   - 自我对话、犹豫
   - "我该怎么办..."

2. 私人冲突
   - 对白较多
   - 亲密关系中的冲突
   - 情感性、个人化

3. 社会冲突
   - 对白中等
   - 与机构、规则的冲突
   - 正式、对抗性

4. 自然冲突
   - 对白最少
   - 与环境的斗争
   - 行动多于言语

【设计原则】
- 冲突越内在，对白越重要
- 冲突越外在，行动越重要
    `,
    promptKeywords: ["conflict dialogue", "confrontation"],
    questions: [
      "这个场景的冲突主要在哪个层面？",
      "对白应该占多大比重？"
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 《救猫咪》布莱克·斯奈德 - 5个Skills
  // ─────────────────────────────────────────────────────────────
  "snyder_beat_sheet": {
    book: "《救猫咪》",
    name: "15节拍公式",
    category: "story",
    agent: ["A02"],
    description: "好莱坞通用的15个故事节拍",
    content: `
【15节拍公式 Beat Sheet】

1. 开场画面 (1%)
   - 第一印象，定下基调
   
2. 主题呈现 (5%)
   - 暗示故事主题
   
3. 铺垫 (1-10%)
   - 建立日常世界
   
4. 催化剂 (10%)
   - 激励事件，打破平衡
   
5. 争论 (10-20%)
   - 主角犹豫是否接受挑战
   
6. 进入第二幕 (20%)
   - 主角做出选择
   
7. B故事 (22%)
   - 副线开始，通常是爱情
   
8. 游戏时间 (20-50%)
   - 承诺的场景，核心卖点
   
9. 中点 (50%)
   - 虚假胜利或虚假失败
   
10. 反派逼近 (50-75%)
    - 压力增大
    
11. 一无所有 (75%)
    - 最低点
    
12. 灵魂黑夜 (75-80%)
    - 反思与绝望
    
13. 进入第三幕 (80%)
    - 找到解决方案
    
14. 终局 (80-99%)
    - 最终对决
    
15. 结尾画面 (99-100%)
    - 与开场呼应，展示变化
    `,
    promptKeywords: ["story beat", "narrative structure", "plot point"],
    questions: [
      "你的故事现在进行到哪个节拍？",
      "中点是什么？虚假胜利还是虚假失败？"
    ]
  },

  "snyder_save_the_cat": {
    book: "《救猫咪》",
    name: "救猫时刻",
    category: "story",
    agent: ["A02", "A05"],
    description: "让观众喜欢主角的关键技巧",
    content: `
【救猫时刻 Save the Cat】

定义：主角做一件让观众喜欢他的事

为什么需要？
- 观众需要理由关心主角
- 即使是反英雄也需要可爱之处
- 建立情感连接

救猫时刻的类型：
1. 善良之举
   - 帮助弱者
   - 善待动物
   
2. 专业能力
   - 展示擅长的技能
   - 聪明解决问题
   
3. 幽默感
   - 自嘲
   - 机智反应
   
4. 弱点展示
   - 显示人性化的一面
   - 承认错误

【位置】
- 尽早出现（前10%）
- 在展示缺点之前或之后

【示例】
- 杀手喂流浪猫
- 罪犯照顾老母亲
- 恶棍有幽默感
    `,
    promptKeywords: ["likeable protagonist", "sympathetic character"],
    questions: [
      "观众为什么会喜欢你的主角？",
      "主角有什么'救猫时刻'？"
    ]
  },

  "snyder_logline": {
    book: "《救猫咪》",
    name: "一句话概念",
    category: "story",
    agent: ["A02"],
    description: "用一句话概括整个故事",
    content: `
【一句话概念 Logline】

公式：
[形容词的主角] + [激励事件] + [必须...] + [否则...]

四个必备元素：
1. 讽刺性 - 有某种矛盾
2. 完整画面 - 能想象整部电影
3. 目标受众 - 知道谁会看
4. 吸引力 - 让人想知道更多

【好logline示例】

《泰坦尼克号》
一个穷画家和贵族女子在注定沉没的船上相爱

《寄生虫》
一个穷困家庭通过欺骗逐渐渗透富人家庭

【检查清单】
□ 有明确主角吗？
□ 有激励事件吗？
□ 有清晰目标吗？
□ 有紧迫感吗？
□ 有讽刺性吗？
    `,
    promptKeywords: ["high concept", "story hook"],
    questions: [
      "用一句话概括你的故事",
      "这个概念有什么讽刺性？"
    ]
  },

  "snyder_10_genres": {
    book: "《救猫咪》",
    name: "十种类型片",
    category: "story",
    agent: ["A02"],
    description: "所有故事归类为十种类型",
    content: `
【十种类型片】

1. 困兽之斗 (Monster in the House)
   - 密闭空间 + 怪物 + 角色缺陷
   - 《异形》《电锯惊魂》

2. 金羊毛 (Golden Fleece)
   - 公路片、追寻
   - 《绿野仙踪》《海底总动员》

3. 走出困境 (Out of the Bottle)
   - 许愿成真、身体互换
   - 《大话王》《土拨鼠日》

4. 伙伴情 (Buddy Love)
   - 两人关系
   - 《泰坦尼克号》《绝命毒师》

5. 家庭剧 (Institutionalized)
   - 群体中的个人
   - 《教父》《飞越疯人院》

6. 超级英雄 (Superhero)
   - 特殊能力者
   - 《蜘蛛侠》《黑客帝国》

7. 推理悬疑 (Whydunit)
   - 谁做的、为什么
   - 《唐人街》《消失的爱人》

8. 愚人得福 (Fool Triumphant)
   - 看似弱者胜出
   - 《阿甘正传》《律政俏佳人》

9. 仪式蜕变 (Rites of Passage)
   - 成长、人生阶段
   - 《毕业生》《少年时代》

10. 如果当初 (Yadda)
    - 如果...会怎样
    - 《回到未来》
    `,
    promptKeywords: ["genre", "story type"],
    questions: [
      "你的故事属于哪种类型片？",
      "这个类型的核心元素是什么？"
    ]
  },

  "snyder_double_bump": {
    book: "《救猫咪》",
    name: "双重冲撞",
    category: "story",
    agent: ["A02"],
    description: "给主角两个问题来增加复杂性",
    content: `
【双重冲撞 Double Bump】

定义：主角同时面临两个问题

结构：
1. A问题 - 外部问题
   - 情节驱动
   - 可见的障碍
   
2. B问题 - 内部问题
   - 角色驱动
   - 心理/情感障碍

关系：
- A问题是症状
- B问题是根源
- 解决B才能真正解决A

【示例】
《玩具总动员》
- A问题：被新玩具取代
- B问题：自我价值认同

《功夫熊猫》
- A问题：打败泰龙
- B问题：相信自己

【设计方法】
1. 先设计外部问题（A）
2. 问：主角有什么内心缺陷导致这个问题？（B）
3. 让B问题在中点浮现
4. 第三幕解决B，从而解决A
    `,
    promptKeywords: ["internal conflict", "external conflict", "character flaw"],
    questions: [
      "主角的外部问题是什么？",
      "根源性的内部问题是什么？"
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 《千面英雄》约瑟夫·坎贝尔 - 5个Skills
  // ─────────────────────────────────────────────────────────────
  "campbell_heros_journey": {
    book: "《千面英雄》",
    name: "英雄之旅12阶段",
    category: "story",
    agent: ["A02"],
    description: "神话学家坎贝尔总结的英雄旅程",
    content: `
【英雄之旅 Hero's Journey】

第一幕：出发
1. 平凡世界
   - 英雄的日常生活
   
2. 冒险召唤
   - 问题或挑战出现
   
3. 拒绝召唤
   - 英雄犹豫、恐惧
   
4. 遇见导师
   - 获得智慧或工具

第二幕：启程
5. 跨越第一道门槛
   - 进入特殊世界
   
6. 考验、盟友、敌人
   - 学习新世界的规则
   
7. 接近核心洞穴
   - 准备迎接最大考验
   
8. 磨难
   - 面临死亡/最大恐惧

第三幕：归来
9. 奖赏
   - 获得宝藏/知识
   
10. 返回之路
    - 回家的旅程
    
11. 复活
    - 最后的考验
    
12. 携宝归来
    - 以新的自我回归
    `,
    promptKeywords: ["hero's journey", "mythic structure", "adventure"],
    questions: [
      "你的故事现在处于英雄之旅的哪个阶段？",
      "英雄面临的最大恐惧是什么？"
    ]
  },

  "campbell_archetypes": {
    book: "《千面英雄》",
    name: "八大原型角色",
    category: "character",
    agent: ["A05"],
    description: "故事中的八种原型人物",
    content: `
【八大原型角色】

1. 英雄 (Hero)
   - 故事的中心
   - 追求目标、成长变化
   
2. 导师 (Mentor)
   - 给予智慧、工具、训练
   - 例：甘道夫、欧比旺
   
3. 门槛守卫 (Threshold Guardian)
   - 阻挡英雄的次要障碍
   - 测试英雄的决心
   
4. 使者 (Herald)
   - 带来变化的消息
   - 触发冒险
   
5. 变形者 (Shapeshifter)
   - 立场不明的角色
   - 制造悬念
   
6. 阴影 (Shadow)
   - 主要反派
   - 英雄的黑暗面
   
7. 盟友 (Ally)
   - 帮助英雄的伙伴
   - 提供支持
   
8. 骗子 (Trickster)
   - 带来喜剧效果
   - 挑战现状
    `,
    promptKeywords: ["archetype", "mentor figure", "shadow villain"],
    questions: [
      "你的故事中有哪些原型角色？",
      "谁是英雄的导师？"
    ]
  },

  "campbell_threshold": {
    book: "《千面英雄》",
    name: "跨越门槛",
    category: "story",
    agent: ["A02", "A06"],
    description: "从平凡世界进入特殊世界的转变",
    content: `
【跨越门槛】

门槛 = 两个世界的边界

平凡世界 → 特殊世界
熟悉 → 陌生
安全 → 危险
规则已知 → 规则未知

【视觉表现】
- 物理门槛：门、桥、隧道
- 环境变化：天气、光线
- 色彩转变：暖→冷/明→暗
- 音乐转变：熟悉→陌生

【设计要点】
1. 让观众感受到变化
2. 门槛有守护者
3. 跨越需要勇气/选择
4. 一旦跨越难以回头

【示例】
- 《哈利波特》：9¾站台
- 《爱丽丝》：兔子洞
- 《黑客帝国》：吞下红药丸
    `,
    promptKeywords: ["threshold crossing", "world transition", "point of no return"],
    questions: [
      "主角从哪个世界进入哪个世界？",
      "这个转变在视觉上如何表现？"
    ]
  },

  "campbell_ordeal": {
    book: "《千面英雄》",
    name: "磨难与重生",
    category: "story",
    agent: ["A02"],
    description: "英雄面临死亡并获得重生",
    content: `
【磨难 Ordeal】

定义：英雄面临最大恐惧/死亡

三种死亡类型：
1. 肉体死亡
   - 濒临死亡体验
   - 假死
   
2. 心理死亡
   - 旧自我的死亡
   - 信念崩塌
   
3. 关系死亡
   - 重要关系的终结
   - 背叛、分离

【设计结构】
1. 进入洞穴（最深的恐惧）
2. 面对死亡
3. 死亡或假死
4. 重生（带着新的认知）

【重生的标志】
- 获得新能力
- 获得关键信息
- 态度转变
- 外貌/符号变化
    `,
    promptKeywords: ["death and rebirth", "transformation", "ordeal"],
    questions: [
      "英雄面临的最大恐惧是什么？",
      "他如何'死去'又'重生'？"
    ]
  },

  "campbell_elixir": {
    book: "《千面英雄》",
    name: "携宝归来",
    category: "story",
    agent: ["A02"],
    description: "英雄带着什么回归日常世界",
    content: `
【携宝归来 Return with Elixir】

宝藏类型：
1. 物质宝藏
   - 实际的物品
   - 财富、武器
   
2. 知识宝藏
   - 真相、秘密
   - 解决方案
   
3. 力量宝藏
   - 新能力
   - 新地位
   
4. 智慧宝藏
   - 人生领悟
   - 成长收获
   
5. 关系宝藏
   - 新的盟友
   - 爱情

【回归的意义】
- 宝藏必须对平凡世界有价值
- 英雄用宝藏帮助他人
- 完成循环，但英雄已变化

【失败的回归】
- 空手而归
- 宝藏被夺走
- 为续集留下悬念
    `,
    promptKeywords: ["return", "elixir", "story resolution"],
    questions: [
      "英雄带回了什么'宝藏'？",
      "这个宝藏如何改变了平凡世界？"
    ]
  },

  // 继续添加更多Skills...
  // 由于篇幅限制，这里展示核心结构
  // 完整版本将包含所有108本书的5个Skills

};

// ═══════════════════════════════════════════════════════════════
// Skills 索引和查询方法
// ═══════════════════════════════════════════════════════════════

const SKILLS_INDEX = {
  // 按类别索引
  byCategory: {
    story: [],
    dialogue: [],
    character: [],
    culture: [],
    directing: [],
    cinematography: [],
    art: [],
    color: [],
    editing: [],
    music: [],
    manga: [],
    anime: [],
    prompt: []
  },
  
  // 按智能体索引
  byAgent: {
    A01: [], A02: [], A03: [], A04: [], A05: [],
    A06: [], A07: [], A08: [], A09: [], A10: [],
    A11: [], A12: [], A13: [], A14: [], A15: [],
    A16: [], A17: [], A18: [], A19: [], A20: [],
    A21: [], A22: [], A23: [], A24: [], A25: []
  },
  
  // 按书籍索引
  byBook: {}
};

// 初始化索引
function initializeIndex() {
  for (const [skillId, skill] of Object.entries(SKILLS_DATABASE)) {
    // 按类别
    if (SKILLS_INDEX.byCategory[skill.category]) {
      SKILLS_INDEX.byCategory[skill.category].push(skillId);
    }
    
    // 按智能体
    for (const agent of skill.agent) {
      if (SKILLS_INDEX.byAgent[agent]) {
        SKILLS_INDEX.byAgent[agent].push(skillId);
      }
    }
    
    // 按书籍
    if (!SKILLS_INDEX.byBook[skill.book]) {
      SKILLS_INDEX.byBook[skill.book] = [];
    }
    SKILLS_INDEX.byBook[skill.book].push(skillId);
  }
}

// 获取特定场景的Skills
function getSkillsForScenario(scenario) {
  const skills = [];
  
  if (scenario.includes('故事') || scenario.includes('剧本')) {
    skills.push(...SKILLS_INDEX.byCategory.story);
  }
  if (scenario.includes('对白') || scenario.includes('台词')) {
    skills.push(...SKILLS_INDEX.byCategory.dialogue);
  }
  if (scenario.includes('角色') || scenario.includes('人物')) {
    skills.push(...SKILLS_INDEX.byCategory.character);
  }
  // ... 更多场景匹配
  
  return [...new Set(skills)];
}

// 根据用户回答推荐Skills
function recommendSkills(answers) {
  const recommended = [];
  
  // 根据故事类型推荐
  if (answers.genre === '奇幻冒险') {
    recommended.push('campbell_heros_journey', 'campbell_archetypes');
  }
  if (answers.genre === '悬疑惊悚') {
    recommended.push('snyder_10_genres'); // whydunit
  }
  
  // 根据情绪基调推荐
  if (answers.mood === '紧张刺激') {
    recommended.push('mcgee_climax', 'mcgee_value_charge');
  }
  
  return recommended;
}

// 初始化
initializeIndex();

// 导出
if (typeof module !== 'undefined') {
  module.exports = { SKILLS_DATABASE, SKILLS_INDEX, getSkillsForScenario, recommendSkills };
}
