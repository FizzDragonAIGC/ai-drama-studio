# 🎬 演员指导 Skill
> 来源：《Directing Actors》Judith Weston + 《导演功课》David Mamet

---

## 📐 什么是Actor Direction（演员指导）

**定义**：导演引导演员表演的技术和方法

### 在AI番剧中的意义
| 传统电影 | AI番剧 |
|----------|--------|
| 指导真人演员 | 设计角色表演参数 |
| 即兴调整 | 预设表情和姿态 |
| 对话沟通 | Prompt描述 |

---

## 🎯 表演核心元素

### 1. 目标（Objective）
```
角色在这场戏想要什么？
┌─────────────────────────────────┐
│ Super-Objective (全剧目标)      │
│ └─ Scene Objective (场景目标)   │
│    └─ Beat Objective (节拍目标) │
└─────────────────────────────────┘
```

### 2. 障碍（Obstacle）
什么阻止角色达成目标？
- 外部障碍（其他角色、环境）
- 内部障碍（恐惧、矛盾）

### 3. 战术（Tactic）
角色如何克服障碍？
- 恳求、威胁、诱惑、欺骗...

### 4. 状态（State）
角色的情感和身体状态
- 情绪：高兴、愤怒、恐惧...
- 身体：疲惫、紧张、放松...

---

## 🔧 表演层次设计

### 表情层（Face）
| 情感 | 关键特征 | Prompt词 |
|------|----------|----------|
| 快乐 | 眼角上扬、嘴角上扬 | happy, smiling, joyful |
| 悲伤 | 眉头下垂、嘴角下撇 | sad, teary, melancholic |
| 愤怒 | 眉头紧锁、嘴唇紧抿 | angry, furious, glaring |
| 恐惧 | 眼睛睁大、嘴巴微张 | scared, terrified, wide-eyed |
| 惊讶 | 眉毛上扬、嘴巴O型 | surprised, shocked, amazed |
| 厌恶 | 皱鼻子、上唇上扬 | disgusted, grimacing |

### 肢体层（Body）
| 状态 | 姿态特征 | Prompt词 |
|------|----------|----------|
| 自信 | 挺胸、开放姿态 | confident pose, standing tall |
| 紧张 | 缩肩、交叉手臂 | tense, arms crossed, nervous |
| 放松 | 自然站立、开放 | relaxed posture, casual |
| 防御 | 后退、保护姿态 | defensive, stepping back |
| 攻击 | 前倾、指向 | aggressive, leaning forward |

### 声音层（Voice）- 字幕设计
| 情感 | 字幕暗示 |
|------|----------|
| 紧张 | "我...我没有..." |
| 愤怒 | "你说什么！？" |
| 悲伤 | "是这样啊......" |
| 犹豫 | "那个......也许......不是" |

---

## 📋 角色表演设计表

```
┌─────────────────────────────────────────┐
│ 角色：[名字]                            │
│ 场景：[#] - [场景描述]                  │
├─────────────────────────────────────────┤
│ 目标：[这场戏想要什么]                  │
│ 障碍：[什么阻止TA]                      │
│ 战术：[TA怎么做]                        │
├─────────────────────────────────────────┤
│ 情感起点：[开始时的情绪]                │
│ 情感终点：[结束时的情绪]                │
│ 情感转折：[在哪里发生变化]              │
├─────────────────────────────────────────┤
│ 表情：[描述]                            │
│ 姿态：[描述]                            │
│ 动作：[关键动作]                        │
└─────────────────────────────────────────┘
```

---

## 🎯 表演强度等级

```
等级   强度         适用场景
──────────────────────────────
1     极微         日常对话
2     轻微         一般情绪
3     中等         小冲突
4     强烈         重要时刻
5     极致         高潮场景
──────────────────────────────
```

### 示例：悲伤的5个级别
| 级别 | 表现 | Prompt描述 |
|------|------|------------|
| 1 | 轻微叹息 | slightly melancholic |
| 2 | 眼神黯淡 | sad eyes, downcast |
| 3 | 含泪 | teary-eyed, holding back tears |
| 4 | 流泪 | crying, tears streaming |
| 5 | 崩溃痛哭 | breaking down, sobbing uncontrollably |

---

## 🎬 AI番剧应用

### 表情/姿态Prompt模板
```
[角色描述], [情感形容词], [表情细节], [姿态细节],
[动作（如有）], [视线方向]

示例：
"young woman with long black hair, 
melancholic expression, downcast eyes, 
slight frown, hunched shoulders, 
looking away, hands clasped"
```

### 多角度表情一致性
```
同一情感不同角度的prompt：
正面：sad expression, facing camera, teary eyes
侧面：profile view, sad, single tear rolling down
背面：back view, shoulders slumped, head down
```

### 表演动态设计（视频）
```
起始帧：neutral expression → 结束帧：surprised

AI视频prompt：
"girl's expression changes from calm to shocked,
eyes widening, mouth opening, emotional transition"
```

---

## 💡 表演设计原则

### Do's
- ✅ 给每个角色明确的目标
- ✅ 让情感变化有理由
- ✅ 细节表演比夸张更好
- ✅ 保持角色性格一致性

### Don'ts
- ❌ 所有情感都是极致
- ❌ 无理由的情绪变化
- ❌ 所有角色反应相同
- ❌ 忘记角色的前史和性格

---

*Skill版本: 1.0*
*适用: AI番剧导演模块*
*创建时间: 2026-02-14*
