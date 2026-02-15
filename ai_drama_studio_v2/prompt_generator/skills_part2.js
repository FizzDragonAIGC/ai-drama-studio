// Skills 数据库 Part 2 - 视觉、镜头、美术类

const SKILLS_PART2 = {

  // ═══════════════════════════════════════════════════════════════
  // 🎥 《电影镜头设计》史蒂文·卡茨 - 5个Skills
  // ═══════════════════════════════════════════════════════════════

  "katz_shot_types": {
    book: "《电影镜头设计》",
    name: "景别系统",
    category: "cinematography",
    agent: ["A06", "A07"],
    content: `
【景别系统】

1. 大远景 (Extreme Long Shot)
   - 人物极小，环境为主
   - 用途：建立地点、史诗感
   - Prompt: extreme wide shot, vast landscape, tiny figure

2. 远景 (Long Shot / Wide Shot)
   - 人物全身，环境占60%
   - 用途：展示环境与人物关系
   - Prompt: wide shot, full body, environmental context

3. 全景 (Full Shot)
   - 人物全身为主
   - 用途：展示动作、服装
   - Prompt: full body shot, head to toe

4. 中景 (Medium Shot)
   - 膝盖以上
   - 用途：日常对话
   - Prompt: medium shot, waist up

5. 中近景 (Medium Close-up)
   - 胸部以上
   - 用途：重要对话
   - Prompt: medium close-up, chest up

6. 近景 (Close-up)
   - 肩部以上/面部
   - 用途：情感表达
   - Prompt: close-up, face, emotional

7. 大特写 (Extreme Close-up)
   - 面部局部/细节
   - 用途：强调、悬念
   - Prompt: extreme close-up, eyes only, detail shot
    `,
    promptKeywords: ["shot size", "framing", "camera distance"],
    questions: ["这个画面需要什么景别？"]
  },

  "katz_camera_angles": {
    book: "《电影镜头设计》",
    name: "拍摄角度",
    category: "cinematography",
    agent: ["A06", "A07"],
    content: `
【拍摄角度】

1. 平视 (Eye Level)
   - 与人物眼睛平齐
   - 中立、客观
   - Prompt: eye level shot

2. 仰视 (Low Angle)
   - 从下往上拍
   - 威严、强大、威胁
   - Prompt: low angle shot, looking up, powerful

3. 俯视 (High Angle)
   - 从上往下拍
   - 渺小、脆弱、被观察
   - Prompt: high angle shot, looking down, vulnerable

4. 鸟瞰 (Bird's Eye)
   - 正上方垂直向下
   - 全知视角、上帝视角
   - Prompt: bird's eye view, overhead shot, top-down

5. 荷兰角 (Dutch Angle)
   - 倾斜画面
   - 不安、疯狂、紧张
   - Prompt: dutch angle, tilted frame, disorienting

6. 虫瞰 (Worm's Eye)
   - 从地面极低角度
   - 极端威压感
   - Prompt: worm's eye view, extreme low angle
    `,
    promptKeywords: ["camera angle", "perspective", "point of view"],
    questions: ["这个角色此刻是强势还是弱势？需要什么角度？"]
  },

  "katz_camera_movement": {
    book: "《电影镜头设计》",
    name: "镜头运动",
    category: "cinematography",
    agent: ["A06", "A07", "A25"],
    content: `
【镜头运动】

1. 推 (Push In / Dolly In)
   - 摄影机向前移动
   - 增强紧张、进入角色内心
   - Prompt: camera pushing in, approaching, intensifying

2. 拉 (Pull Out / Dolly Out)
   - 摄影机向后移动
   - 揭示环境、疏离感
   - Prompt: camera pulling back, revealing, distancing

3. 横移 (Tracking / Dolly)
   - 水平跟随移动
   - 跟随动作
   - Prompt: tracking shot, following movement

4. 摇 (Pan)
   - 摄影机水平旋转
   - 展示环境、跟随视线
   - Prompt: panning shot, horizontal sweep

5. 升降 (Crane / Boom)
   - 摄影机垂直移动
   - 史诗感、情绪变化
   - Prompt: crane shot, ascending, descending

6. 手持 (Handheld)
   - 不稳定运动
   - 紧张、真实、临场感
   - Prompt: handheld camera, shaky, documentary style

7. 环绕 (Orbit)
   - 围绕主体旋转
   - 强调、戏剧性
   - Prompt: orbiting shot, circling around subject
    `,
    promptKeywords: ["camera movement", "dynamic shot", "motion"],
    questions: ["画面是静止还是运动？运动方向是什么？"]
  },

  "katz_composition": {
    book: "《电影镜头设计》",
    name: "构图法则",
    category: "cinematography",
    agent: ["A06", "A07", "A08"],
    content: `
【构图法则】

1. 三分法 (Rule of Thirds)
   - 画面分9宫格
   - 主体放在交叉点
   - Prompt: rule of thirds composition

2. 中心构图 (Center Composition)
   - 主体在正中
   - 稳定、对称、力量
   - Prompt: centered composition, symmetrical

3. 对角线构图 (Diagonal)
   - 主体沿对角线
   - 动感、张力
   - Prompt: diagonal composition, dynamic

4. 框架构图 (Frame within Frame)
   - 用前景元素框住主体
   - 聚焦、层次
   - Prompt: framed composition, doorway, window frame

5. 引导线 (Leading Lines)
   - 线条引向主体
   - 引导视线
   - Prompt: leading lines, perspective lines

6. 负空间 (Negative Space)
   - 大量留白
   - 孤独、思考、呼吸
   - Prompt: negative space, minimalist, isolated subject

7. 黄金螺旋 (Golden Spiral)
   - 斐波那契螺旋
   - 自然美感
   - Prompt: golden ratio composition
    `,
    promptKeywords: ["composition", "framing", "visual balance"],
    questions: ["主体在画面的什么位置？用什么构图？"]
  },

  "katz_storyboard": {
    book: "《电影镜头设计》",
    name: "分镜设计流程",
    category: "cinematography",
    agent: ["A07"],
    content: `
【分镜设计流程】

Step 1: 理解场景
- 场景的目的是什么？
- 核心情感是什么？
- 关键动作是什么？

Step 2: 确定关键帧
- 场景开始画面
- 转折点画面
- 高潮画面
- 结束画面

Step 3: 选择镜头
- 每个关键帧用什么景别？
- 用什么角度？
- 有无运动？

Step 4: 画出草图
- 简单线条即可
- 标注镜头信息
- 标注时长

Step 5: 镜头组接
- 镜头之间如何衔接？
- 节奏是什么？
- 有无跳轴问题？

【分镜表模板】
| 编号 | 画面草图 | 景别 | 角度 | 动作描述 | 对白 | 时长 | 备注 |
    `,
    promptKeywords: ["storyboard", "shot planning", "sequence"],
    questions: ["这个场景需要多少个镜头？关键帧是什么？"]
  },

  // ═══════════════════════════════════════════════════════════════
  // 🎨 《色彩与光线》詹姆斯·格尔尼 - 5个Skills
  // ═══════════════════════════════════════════════════════════════

  "gurney_light_sources": {
    book: "《色彩与光线》",
    name: "光源类型",
    category: "color",
    agent: ["A12", "A13"],
    content: `
【光源类型】

自然光源：
1. 直射阳光
   - 硬光、强对比
   - Prompt: direct sunlight, hard shadows, high contrast

2. 阴天光
   - 柔光、低对比
   - Prompt: overcast lighting, soft shadows, diffused light

3. 日出/日落
   - 暖色、长影子
   - Prompt: golden hour, warm light, long shadows

4. 蓝调时刻
   - 冷色、神秘
   - Prompt: blue hour, twilight, cool tones

5. 月光
   - 冷蓝、浪漫或诡异
   - Prompt: moonlight, silvery blue, nocturnal

人工光源：
1. 火光
   - 暖橙、摇曳
   - Prompt: firelight, flickering, warm orange glow

2. 室内灯
   - 暖黄
   - Prompt: indoor lighting, warm ambient

3. 霓虹灯
   - 高饱和、赛博朋克
   - Prompt: neon lights, cyberpunk, colorful glow

4. 屏幕光
   - 冷蓝、现代
   - Prompt: screen glow, blue light, digital age
    `,
    promptKeywords: ["lighting", "light source", "illumination"],
    questions: ["场景的主要光源是什么？"]
  },

  "gurney_color_temperature": {
    book: "《色彩与光线》",
    name: "色温与情绪",
    category: "color",
    agent: ["A13"],
    content: `
【色温与情绪】

暖色调 (Warm)
- 红、橙、黄
- 情绪：温暖、热情、危险、愤怒
- 场景：日落、火焰、室内、回忆
- Prompt: warm color palette, orange tones, cozy atmosphere

冷色调 (Cool)
- 蓝、绿、紫
- 情绪：冷静、忧郁、神秘、科技
- 场景：夜晚、海洋、未来、悲伤
- Prompt: cool color palette, blue tones, melancholic

中性色调 (Neutral)
- 灰、米、棕
- 情绪：平静、自然、怀旧
- 场景：日常、回忆、写实
- Prompt: neutral tones, muted colors, natural palette

对比色温
- 冷暖对比增加视觉张力
- 光影形成色温差
- Prompt: warm highlights cool shadows, color contrast
    `,
    promptKeywords: ["color temperature", "warm cool", "color mood"],
    questions: ["这个场景应该用暖色调还是冷色调？"]
  },

  "gurney_color_harmony": {
    book: "《色彩与光线》",
    name: "配色方案",
    category: "color",
    agent: ["A13"],
    content: `
【配色方案】

1. 单色配色 (Monochromatic)
   - 一种颜色的不同明暗
   - 统一、和谐
   - Prompt: monochromatic color scheme, single hue

2. 类似色 (Analogous)
   - 色轮上相邻的颜色
   - 和谐、自然
   - Prompt: analogous colors, harmonious palette

3. 互补色 (Complementary)
   - 色轮上对立的颜色
   - 强对比、活力
   - Prompt: complementary colors, orange and blue, red and green

4. 分裂互补 (Split Complementary)
   - 一色+其互补色两侧的颜色
   - 对比但不极端
   - Prompt: split complementary scheme

5. 三色配色 (Triadic)
   - 色轮上等距三色
   - 丰富、平衡
   - Prompt: triadic color scheme, balanced colors

6. 限制调色板 (Limited Palette)
   - 只用3-4种颜色
   - 统一、风格化
   - Prompt: limited color palette, cohesive colors
    `,
    promptKeywords: ["color scheme", "color harmony", "palette"],
    questions: ["想要什么配色方案？对比强还是和谐？"]
  },

  "gurney_atmosphere": {
    book: "《色彩与光线》",
    name: "大气效果",
    category: "color",
    agent: ["A12", "A13"],
    content: `
【大气效果】

1. 空气透视 (Aerial Perspective)
   - 远处物体更淡、更蓝
   - 增加深度感
   - Prompt: aerial perspective, atmospheric depth, distant haze

2. 雾气 (Fog/Mist)
   - 降低对比度
   - 神秘、朦胧
   - Prompt: foggy atmosphere, misty, low visibility

3. 烟尘 (Smoke/Dust)
   - 光束可见
   - 戏剧性
   - Prompt: volumetric light, dust particles, god rays

4. 雨天 (Rain)
   - 反射、湿润表面
   - 忧郁、浪漫
   - Prompt: rainy atmosphere, wet surfaces, reflections

5. 雪景 (Snow)
   - 高反射、冷色
   - 纯净、寒冷
   - Prompt: snowy scene, white landscape, cold atmosphere

6. 逆光 (Backlit)
   - 主体剪影或边缘光
   - 戏剧性、神圣
   - Prompt: backlit, silhouette, rim lighting
    `,
    promptKeywords: ["atmosphere", "environmental effects", "mood"],
    questions: ["场景有什么大气效果？天气如何？"]
  },

  "gurney_shadow": {
    book: "《色彩与光线》",
    name: "阴影设计",
    category: "color",
    agent: ["A12"],
    content: `
【阴影设计】

阴影类型：
1. 本影 (Form Shadow)
   - 物体自身背光面
   - 显示立体感
   
2. 投影 (Cast Shadow)
   - 物体投在其他表面的影子
   - 显示空间关系

阴影特征：
1. 硬阴影 (Hard Shadow)
   - 边缘清晰
   - 点光源/直射光
   - Prompt: hard shadows, sharp edges

2. 软阴影 (Soft Shadow)
   - 边缘模糊
   - 漫射光/大面积光源
   - Prompt: soft shadows, diffused, gentle

阴影颜色：
- 阴影不是黑色！
- 通常带有环境色的补色
- 户外阴影偏蓝（天空反射）
- Prompt: colored shadows, blue shadows in sunlight

【情绪表达】
- 强阴影 = 戏剧性、神秘
- 弱阴影 = 温柔、平和
- 多个阴影 = 不安、分裂
    `,
    promptKeywords: ["shadow", "lighting contrast", "chiaroscuro"],
    questions: ["阴影是硬还是软？阴影的颜色是什么？"]
  },

  // ═══════════════════════════════════════════════════════════════
  // 📖 《理解漫画》斯科特·麦克劳德 - 5个Skills
  // ═══════════════════════════════════════════════════════════════

  "mccloud_closure": {
    book: "《理解漫画》",
    name: "Closure脑补理论",
    category: "manga",
    agent: ["A08", "A22"],
    content: `
【Closure 脑补理论】

定义：读者在格与格之间自动补全缺失内容

这是漫画最核心的魔法！
漫画发生在格与格之间的空白处

六种格间转换：

1. 瞬间到瞬间 (Moment-to-moment)
   - 同一动作的分解
   - Closure需求：最低
   - 例：眨眼的三帧

2. 动作到动作 (Action-to-action)
   - 同一主体的连续动作
   - Closure需求：低
   - 例：挥拳→击中

3. 主体到主体 (Subject-to-subject)
   - 同一场景不同主体
   - Closure需求：中
   - 例：对话双方

4. 场景到场景 (Scene-to-scene)
   - 时空跨越
   - Closure需求：高
   - 例：白天→夜晚

5. 视角到视角 (Aspect-to-aspect)
   - 同一场景不同角度
   - Closure需求：中
   - 例：房间的多个角落

6. 非线性 (Non-sequitur)
   - 无逻辑关联
   - Closure需求：最高
   - 例：抽象艺术表达
    `,
    promptKeywords: ["sequential art", "panel transition", "visual narrative"],
    questions: ["两个画面之间省略了什么？读者需要脑补什么？"]
  },

  "mccloud_time_space": {
    book: "《理解漫画》",
    name: "时间=空间",
    category: "manga",
    agent: ["A08", "A22"],
    content: `
【时间 = 空间】

在漫画中：
- 空间代表时间
- 格子大小 = 时间感知
- 格间距 = 时间流逝

格子大小规则：
┌─────────────┐
│   大格子     │ = 时间长、重要
└─────────────┘

┌───┐
│小 │ = 时间短、快节奏
└───┘

格间距规则：
| | | = 快速
|   |   | = 正常
|      |      | = 缓慢、停顿

横向 vs 纵向：
← 横向阅读 = 时间流逝
↓ 纵向排列 = 同时发生

【设计技巧】
- 动作场景：小格密集
- 情感场景：大格留白
- 紧张时刻：格子变窄
- 震惊时刻：跨页大格
    `,
    promptKeywords: ["panel size", "pacing", "timing in comics"],
    questions: ["这个时刻应该用大格还是小格？"]
  },

  "mccloud_icon_spectrum": {
    book: "《理解漫画》",
    name: "图像抽象光谱",
    category: "manga",
    agent: ["A08", "A09"],
    content: `
【图像抽象光谱】

写实 ←─────────────────→ 抽象
照片 → 素描 → 简化 → 符号 → 文字

越写实：
- 越具体
- 越难代入
- 越像"那个人"

越抽象：
- 越普遍
- 越易代入
- 越像"任何人"

【漫画的选择】
日漫风格：
- 角色简化抽象
- 背景写实详细
- 读者代入角色，沉浸于世界

西方漫画：
- 角色写实
- 更强调个性

【应用】
- 主角可以更简化（代入感）
- 反派可以更写实（距离感）
- 情感场景更抽象
- 动作场景更具体
    `,
    promptKeywords: ["art style", "abstraction level", "iconic vs realistic"],
    questions: ["角色应该画得多写实？多抽象？"]
  },

  "mccloud_panel_design": {
    book: "《理解漫画》",
    name: "格子设计",
    category: "manga",
    agent: ["A08"],
    content: `
【格子设计】

格子边框类型：

1. 标准方框
   - 正常叙事
   - 最常用

2. 无边框/出血
   - 无限延伸感
   - 时间暂停
   - Prompt: borderless panel, bleeding edges

3. 圆角边框
   - 回忆、梦境
   - 温柔感

4. 锯齿边框
   - 惊讶、爆炸
   - 冲击感

5. 虚线边框
   - 想象、回忆
   - 非现实

6. 打破边框
   - 角色突破格子
   - 强调、冲击
   - Prompt: breaking the frame, dynamic composition

格子形状：
- 横长格：稳定、叙述
- 竖长格：紧张、动态
- 斜格：不安、运动
- 圆形格：聚焦、特殊
    `,
    promptKeywords: ["panel layout", "comic frame", "page design"],
    questions: ["这个格子需要什么形状？需要打破边框吗？"]
  },

  "mccloud_word_image": {
    book: "《理解漫画》",
    name: "图文关系",
    category: "manga",
    agent: ["A08", "A22"],
    content: `
【图文关系七种类型】

1. 文字主导 (Word Specific)
   - 文字完整传达信息
   - 图像只是装饰
   - 比例：文字 90%

2. 图像主导 (Picture Specific)
   - 图像完整传达信息
   - 文字可省略
   - 比例：图像 90%

3. 双重叙述 (Duo-Specific)
   - 文字图像说同样的事
   - 冗余但强调
   - 比例：各50%

4. 交叉 (Intersecting)
   - 文字图像部分重叠
   - 互相补充
   - 最常用

5. 互依 (Interdependent)
   - 文字图像缺一不可
   - 共同创造意义
   - 最有效率

6. 平行 (Parallel)
   - 文字图像讲不同的事
   - 制造张力或讽刺

7. 蒙太奇 (Montage)
   - 文字成为图像的一部分
   - 拟声词、音效
   - Prompt: onomatopoeia, sound effects, integrated text
    `,
    promptKeywords: ["text and image", "word balloon", "visual narrative"],
    questions: ["文字和图像的关系是什么？谁主导？"]
  },

  // ═══════════════════════════════════════════════════════════════
  // ✂️ 《眨眼之间》沃尔特·默奇 - 5个Skills
  // ═══════════════════════════════════════════════════════════════

  "murch_6_rules": {
    book: "《眨眼之间》",
    name: "剪辑六法则",
    category: "editing",
    agent: ["A15"],
    content: `
【剪辑六法则】

按优先级排序（满足高层可掩盖低层问题）：

1. 情感 (Emotion) - 51%
   最重要！观众最终记住的是感受
   问：这个剪切点在情感上对吗？

2. 故事 (Story) - 23%
   推动叙事前进
   问：这个剪切推动了故事吗？

3. 节奏 (Rhythm) - 10%
   剪辑的音乐感
   问：节奏感对吗？

4. 视线追踪 (Eye Trace) - 7%
   观众眼睛的自然路径
   问：观众眼睛在哪里？

5. 二维平面 (2D Plane) - 5%
   画面构图的连贯
   问：画面衔接舒服吗？

6. 三维空间 (3D Space) - 4%
   空间逻辑、轴线
   问：空间关系清楚吗？

【核心原则】
情感优先！
技术正确但情感错误 = 失败
技术错误但情感正确 = 可能成功
    `,
    promptKeywords: ["editing priority", "emotional cut", "story rhythm"],
    questions: ["这个剪切点情感上对吗？"]
  },

  "murch_blink": {
    book: "《眨眼之间》",
    name: "眨眼理论",
    category: "editing",
    agent: ["A15"],
    content: `
【眨眼理论】

核心观点：
眨眼是思维的标点符号
剪辑点应该在观众"眨眼"的地方

眨眼发生在：
- 思维完成一个单元时
- 情绪转换时
- 注意力转移时

【应用】
1. 观察演员眨眼
   - 演员眨眼 = 自然剪切点
   - 尤其在情绪转换时

2. 感受自己的眨眼冲动
   - 看素材时注意自己想眨眼的时刻
   - 那就是剪切点

3. 不要在"中间"剪
   - 动作中间 ❌
   - 句子中间 ❌
   - 思维完成时 ✅

【帧数选择】
- 太早剪：仓促、不完整
- 太晚剪：拖沓、节奏慢
- 正好：自然、流畅
    `,
    promptKeywords: ["cut point", "natural editing", "timing"],
    questions: ["观众在这里会'眨眼'吗？"]
  },

  "murch_rhythm": {
    book: "《眨眼之间》",
    name: "剪辑节奏",
    category: "editing",
    agent: ["A15"],
    content: `
【剪辑节奏】

节奏 = 镜头长度的变化模式

节奏类型：
1. 快节奏
   - 短镜头密集
   - 紧张、兴奋、混乱
   - 动作场景

2. 慢节奏
   - 长镜头为主
   - 沉思、抒情、庄严
   - 情感场景

3. 渐快
   - 镜头逐渐变短
   - 紧张升级
   - 走向高潮

4. 渐慢
   - 镜头逐渐变长
   - 情绪沉淀
   - 高潮后回落

5. 节拍变化
   - 快慢交替
   - 呼吸感
   - 避免单调

【音乐思维】
把剪辑当作作曲：
- 镜头 = 音符
- 场景 = 乐句
- 全片 = 交响曲
    `,
    promptKeywords: ["editing rhythm", "pacing", "tempo"],
    questions: ["这个场景的节奏应该是快还是慢？"]
  },

  "murch_transition": {
    book: "《眨眼之间》",
    name: "转场技巧",
    category: "editing",
    agent: ["A15"],
    content: `
【转场技巧】

1. 硬切 (Hard Cut)
   - 最常用、最干净
   - 同一场景内或相关场景
   - Prompt: direct cut, straight cut

2. 叠化 (Dissolve)
   - 柔和过渡
   - 时间流逝、回忆
   - Prompt: dissolve transition, cross-fade

3. 淡入淡出 (Fade)
   - 淡入黑/白
   - 段落结束、时间跨度大
   - Prompt: fade to black, fade in

4. 划像 (Wipe)
   - 一个画面推开另一个
   - 复古、漫画感
   - Prompt: wipe transition

5. 匹配剪辑 (Match Cut)
   - 形状/动作/声音匹配
   - 诗意、关联性
   - Prompt: match cut, visual rhyme

6. 跳切 (Jump Cut)
   - 同一主体跳跃
   - 焦虑、时间压缩
   - Prompt: jump cut, discontinuous

7. 声音桥接 (Sound Bridge)
   - 声音先于/后于画面
   - 流畅连接
   - Prompt: sound bridge, audio transition
    `,
    promptKeywords: ["transition", "scene change", "cut type"],
    questions: ["场景之间用什么转场？"]
  },

  "murch_less_is_more": {
    book: "《眨眼之间》",
    name: "以少胜多",
    category: "editing",
    agent: ["A15"],
    content: `
【以少胜多原则】

核心理念：
不要给观众看一切
让观众的想象力参与

实践方法：

1. 省略显而易见的
   - 不需要展示每个动作
   - 观众会自动补全

2. 用声音代替画面
   - 画外音暗示
   - 想象比展示更强

3. 用反应代替动作
   - 展示角色反应
   - 而非事件本身

4. 用结果代替过程
   - 跳过中间步骤
   - 直接到结果

5. 留有余地
   - 不要解释一切
   - 让观众思考

【例子】
暴力场景：
❌ 完整展示
✅ 展示前+反应+结果
    `,
    promptKeywords: ["implication", "suggestion", "restraint"],
    questions: ["有什么可以省略让观众想象？"]
  }
};

// 合并到主数据库
if (typeof SKILLS_DATABASE !== 'undefined') {
  Object.assign(SKILLS_DATABASE, SKILLS_PART2);
}
