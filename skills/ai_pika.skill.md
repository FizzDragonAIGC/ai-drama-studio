# 🎬 Pika Labs视频生成 Skill
> 来源：Pika Labs官方文档 + Discord社区

---

## 📐 Pika核心功能

| 功能 | 说明 | 特点 |
|------|------|------|
| Text to Video | 文字生成视频 | 理解力强 |
| Image to Video | 图片动态化 | 效果稳定 |
| Video to Video | 视频风格转换 | 保持运动 |
| Lip Sync | 口型同步 | 对话场景 |
| Expand Canvas | 画面扩展 | 改变构图 |

---

## 🎯 Pika 1.0/1.5特性

### 视频规格
- 分辨率：最高1080p
- 时长：3秒基础，可扩展
- 宽高比：16:9, 9:16, 1:1

### 独特功能
| 功能 | 作用 |
|------|------|
| Modify Region | 局部区域动态化 |
| Sound Effects | AI配音效 |
| Extend Video | 视频延长 |

---

## 🎬 提示词技巧

### 结构
```
[主体] + [动作] + [环境] + [镜头] + [风格]
```

### 动作关键词
| 动作类型 | 英文关键词 |
|----------|------------|
| 细微动作 | subtle movement, slight motion |
| 说话 | talking, speaking, moving lips |
| 行走 | walking, strolling, wandering |
| 转身 | turning around, looking back |
| 眨眼 | blinking, eye movement |

### 相机运动
```
- zoom in slowly（缓慢推进）
- pan left/right（横摇）
- camera orbiting（环绕）
- static camera（固定）
- dolly forward（推轨）
```

---

## 📋 番剧应用场景

### 角色对话
```
图片：角色半身像
提示词：character talking, subtle gestures,
natural head movement, emotional expression
```

### 环境氛围
```
图片：场景背景
提示词：gentle wind effect, leaves falling,
light rays moving, ambient motion
```

### 动作场景
```
图片：动作姿态
提示词：dynamic action pose, motion blur,
energetic movement, impact effect
```

---

## 🔧 Modify Region使用

### 步骤
1. 上传图片
2. 画出要动的区域
3. 描述该区域的动作
4. 其他区域保持静止

### 应用场景
| 场景 | 选区 | 动作描述 |
|------|------|----------|
| 角色说话 | 嘴部 | lips moving, speaking |
| 眼神转动 | 眼睛 | eyes looking around |
| 头发飘动 | 头发 | hair flowing in wind |
| 背景动态 | 背景元素 | clouds moving slowly |

---

## 🎨 风格关键词

### 动漫风格
```
anime style, 2D animation, 
Japanese animation, cel shaded,
vibrant anime colors
```

### 真实感
```
photorealistic, cinematic,
natural lighting, film quality,
professional footage
```

### 风格化
```
stylized, artistic,
[specific style] aesthetic,
painterly effect
```

---

## ⚡ 参数调优

### Motion强度
| 值 | 效果 | 适用 |
|----|------|------|
| 低(1-3) | 微妙动态 | 静态场景 |
| 中(4-6) | 自然运动 | 日常动作 |
| 高(7-10) | 明显运动 | 动作场景 |

### Guidance Scale
| 值 | 效果 |
|----|------|
| 低 | 更自由，可能偏离 |
| 高 | 更严格遵循提示 |

### Negative Prompt
```
常用负面提示：
blurry, distorted, deformed,
low quality, artifacts, glitch
```

---

## 💡 工作流建议

### 角色动画流程
1. 先用Midjourney/SD生成静态关键帧
2. Pika的Image to Video动态化
3. 使用Modify Region精细控制
4. Extend延长至需要的时长

### 批量制作
```
准备多张关键帧
统一风格提示词
批量生成后筛选
后期剪辑组合
```

---

## ⚠️ 常见问题

| 问题 | 解决 |
|------|------|
| 角色变形 | 降低Motion强度 |
| 动作太少 | 提高Motion或明确描述 |
| 风格不一致 | 使用图生视频 |
| 时长太短 | 使用Extend功能 |

---

*Skill版本: 1.0*
*平台: Pika Labs 1.5*
*创建时间: 2026-02-14*
