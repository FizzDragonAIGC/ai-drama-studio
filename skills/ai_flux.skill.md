# 🌊 Flux AI Skill
> Flux图像生成专项指南

---

## 📐 Flux模型概述

### 版本对比
| 版本 | 特点 | 适用 |
|------|------|------|
| Flux.1 Pro | 最高质量 | 商业用途 |
| Flux.1 Dev | 开发版 | 测试/学习 |
| Flux.1 Schnell | 快速生成 | 快速迭代 |

### 核心优势
- 自然语言理解强
- 文字渲染能力好
- 人体结构准确
- 风格多样性高

---

## 🎯 Prompt结构

### Flux偏好
Flux对自然语言描述效果最好，不需要过多关键词堆叠。

### 基础格式
```
A [主体] [动作/状态], [细节描述].
[环境/背景]. [光线]. [风格].
```

### 示例
```
A young woman with long black hair standing on a rooftop at sunset.
The city skyline stretches behind her, golden hour lighting.
Cinematic photography style, shallow depth of field.
```

---

## 📊 风格关键词

### 摄影风格
| 风格 | Prompt |
|------|--------|
| 电影感 | cinematic photography, film still |
| 人像 | portrait photography, studio lighting |
| 街拍 | street photography, candid |
| 时尚 | fashion photography, editorial |
| 纪实 | documentary style, realistic |

### 艺术风格
| 风格 | Prompt |
|------|--------|
| 油画 | oil painting style, painterly |
| 水彩 | watercolor painting, soft edges |
| 数字艺术 | digital art, illustration |
| 概念艺术 | concept art, detailed |
| 动漫 | anime style, Japanese animation |

### 渲染风格
| 风格 | Prompt |
|------|--------|
| 3D渲染 | 3D render, CGI, octane render |
| 像素艺术 | pixel art, 8-bit style |
| 矢量 | vector art, flat design |
| 写实 | photorealistic, hyperrealistic |

---

## 🎭 人物描述

### 面部特征
```
详细描述：
- 发型/发色
- 眼睛颜色/形状
- 面部表情
- 肤色

示例：
A woman with wavy auburn hair, bright green eyes,
warm smile, fair skin with freckles
```

### 服装描述
```
具体描述：
- 服装类型
- 颜色
- 材质
- 细节

示例：
wearing a flowing white summer dress with floral embroidery,
light fabric catching the breeze
```

### 姿势描述
```
自然语言描述动作：
- sitting cross-legged on the floor
- leaning against a wall with arms crossed
- walking through rain with an umbrella
- looking back over her shoulder
```

---

## 📋 场景描述

### 环境构建
```
层次描述：
1. 前景元素
2. 主体位置
3. 背景环境
4. 远景/天空

示例：
Foreground: wildflowers and tall grass
Subject: a small cottage with smoke rising from chimney
Background: rolling hills and forests
Sky: dramatic sunset with orange and purple clouds
```

### 时间/天气
```
自然描述：
- during golden hour, warm sunlight
- on a foggy morning, misty atmosphere
- under a starry night sky, moonlight
- in the rain, wet reflections
```

---

## 🔧 高级技巧

### 文字渲染
Flux擅长渲染文字：
```
A neon sign reading "OPEN 24 HOURS" in red letters,
glowing in a dark alley, cyberpunk atmosphere
```

### 角色一致性
```
使用详细的角色描述保持一致：
A young woman with short blue hair cut in a bob style,
violet eyes, wearing round glasses,
small beauty mark below her left eye...
```

### 情绪氛围
```
直接描述情绪：
A melancholic scene, feeling of loneliness,
autumn atmosphere, nostalgic mood
```

---

## 📊 番剧专用Prompt

### 人物镜头
```
Anime style portrait of [角色描述],
[表情], [视角],
soft lighting, detailed eyes,
Japanese animation quality,
vibrant colors
```

### 动作场景
```
Dynamic anime action scene,
[角色] [动作],
speed lines, motion blur,
dramatic angle, intense lighting,
anime style, high energy
```

### 场景背景
```
Anime background art, no characters,
[场景描述], [时间],
detailed environment, atmospheric,
Japanese animation style,
Studio Ghibli inspired
```

### 情感场景
```
Emotional anime scene,
[角色] [情感状态],
[环境], [光线],
soft colors, atmospheric,
touching, cinematic composition
```

---

## 🎬 Flux vs其他平台

| 方面 | Flux | MJ | SD |
|------|------|-----|-----|
| 语言理解 | 自然语言最佳 | 关键词堆叠 | 权重语法 |
| 文字渲染 | 优秀 | 一般 | 较差 |
| 人体结构 | 准确 | 准确 | 需要修复 |
| 风格控制 | 描述为主 | 参数丰富 | LoRA/模型 |
| 速度 | Schnell很快 | 中等 | 取决于配置 |

---

## 📋 Prompt检查清单

- [ ] 使用自然语言描述？
- [ ] 主体清晰？
- [ ] 细节具体？
- [ ] 环境描述完整？
- [ ] 光线/氛围说明？
- [ ] 风格定义？
- [ ] 避免关键词堆叠？

---

## 🔧 常见问题

| 问题 | 解决方案 |
|------|----------|
| 风格不对 | 更详细描述目标风格 |
| 人物变形 | 简化姿势描述 |
| 背景杂乱 | 明确描述背景元素 |
| 不够写实 | 添加 photorealistic, detailed |
| 太过写实 | 添加 illustration, artistic |

---

*Skill版本: 1.0*
*平台: Flux.1*
*创建时间: 2026-02-14*
