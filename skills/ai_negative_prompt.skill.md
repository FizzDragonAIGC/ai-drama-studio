# ⛔ 反向提示词（Negative Prompt）Skill
> 来源：Stable Diffusion社区最佳实践

---

## 📐 反向提示词原理

| 概念 | 说明 |
|------|------|
| 定义 | 告诉AI要避免的元素 |
| 原理 | 降低指定特征的权重 |
| 作用 | 排除不想要的内容 |
| 适用 | SD系列、部分商业平台 |

---

## 🎯 核心作用

| 作用 | 示例 |
|------|------|
| 避免畸形 | bad anatomy, extra limbs |
| 排除风格 | realistic, photographic |
| 提升质量 | blurry, low quality |
| 去除元素 | watermark, text |

---

## 🎬 标准负面提示词模板

### 通用基础版
```
low quality, worst quality, blurry,
bad anatomy, extra limbs, missing limbs,
deformed, distorted, disfigured,
ugly, poorly drawn, bad proportions
```

### 动漫增强版
```
low quality, worst quality, blurry,
bad anatomy, extra fingers, fewer fingers,
missing arms, missing legs, extra arms, extra legs,
poorly drawn face, mutation, deformed,
ugly, bad proportions, gross proportions,
malformed limbs, missing fingers,
too many fingers, fused fingers,
long neck, poorly drawn hands,
poorly drawn feet, poorly drawn face,
out of frame, extra limbs,
bad hands, text, watermark, signature
```

### 写实增强版
```
(worst quality:1.4), (low quality:1.4),
(normal quality:1.4), lowres, jpeg artifacts,
blurry, (bad anatomy:1.3), (bad hands:1.4),
(bad fingers:1.3), (extra fingers:1.3),
(fewer fingers:1.3), (extra limbs:1.2),
(bad proportions:1.3), (deformed:1.3),
(disfigured:1.3), (malformed:1.2),
(mutated:1.2), (ugly:1.2), text, watermark
```

---

## 📋 分类词汇库

### 质量相关
| 中文 | 英文 |
|------|------|
| 低质量 | low quality, worst quality |
| 模糊 | blurry, out of focus |
| 噪点 | noise, grainy |
| 压缩 | jpeg artifacts, compression |
| 低分辨率 | lowres, pixelated |

### 人体相关
| 中文 | 英文 |
|------|------|
| 解剖错误 | bad anatomy |
| 多余肢体 | extra limbs, extra arms/legs |
| 缺失肢体 | missing limbs |
| 畸形 | deformed, disfigured, malformed |
| 变异 | mutation, mutated |

### 手部相关
| 中文 | 英文 |
|------|------|
| 错误的手 | bad hands, poorly drawn hands |
| 多余手指 | extra fingers, too many fingers |
| 缺少手指 | fewer fingers, missing fingers |
| 融合手指 | fused fingers |
| 变形手指 | malformed fingers |

### 面部相关
| 中文 | 英文 |
|------|------|
| 画错的脸 | poorly drawn face |
| 变形脸 | deformed face |
| 多张脸 | multiple faces |
| 克隆脸 | cloned face |
| 眼睛不对称 | asymmetric eyes |

### 杂项
| 中文 | 英文 |
|------|------|
| 水印 | watermark |
| 文字 | text, caption |
| 签名 | signature, artist name |
| 出框 | out of frame, cropped |
| 边框 | border, frame |

---

## 🔧 权重语法

### 强调方式
```
(bad anatomy:1.4)  ← 数字越大排斥越强
((bad hands))      ← 括号增加强度
[blurry]           ← 降低强度

权重范围：0.5-1.5较常用
```

### 组合示例
```
(worst quality:1.4), (low quality:1.4),
(bad anatomy:1.3), ((bad hands)),
(extra fingers:1.2), [simple background]
```

---

## 🎨 场景特定配置

### 角色立绘
```
【关注】解剖、手部、对称性

bad anatomy, asymmetric, bad hands,
extra fingers, fewer fingers,
missing limbs, poorly drawn,
bad proportions, uneven eyes
```

### 人物半身
```
【关注】面部、手部、服装

poorly drawn face, bad eyes,
bad hands, extra fingers,
distorted clothing, wrinkled clothes,
bad proportions
```

### 动作场景
```
【关注】肢体、动态、透视

twisted limbs, impossible pose,
bad anatomy, extra limbs,
wrong perspective, distorted body
```

### 背景场景
```
【关注】透视、一致性

wrong perspective, inconsistent style,
distorted architecture, floating objects,
unrealistic physics
```

---

## ⚡ 优化技巧

### 不要过度
```
❌ 错误：罗列过多负面词
   可能导致生成困难或奇怪结果

✅ 正确：针对性使用
   针对当前任务的主要问题
```

### 迭代调整
```
1. 先用基础负面提示词
2. 观察生成结果的问题
3. 针对性添加负面词
4. 移除不必要的词
```

### 与正向提示词配合
```
正向加强比负向排除更有效：

想要好手：
✓ 正向：detailed hands, perfect fingers
✓ 负向：bad hands, extra fingers

两者配合效果更好
```

---

## 📋 平台差异

| 平台 | 负面提示支持 |
|------|--------------|
| SD WebUI | 完全支持 |
| ComfyUI | 完全支持 |
| Midjourney | 使用 --no 参数 |
| DALL-E | 不直接支持 |
| Leonardo | 支持 |

### Midjourney特殊语法
```
--no text, watermark, blurry
```

---

## ⚠️ 常见误区

| 误区 | 正确理解 |
|------|----------|
| 负面词越多越好 | 精准比数量重要 |
| 能完全排除元素 | 只是降低概率 |
| 所有AI都一样 | 不同模型效果不同 |

---

*Skill版本: 1.0*
*适用: Stable Diffusion系列*
*创建时间: 2026-02-14*
