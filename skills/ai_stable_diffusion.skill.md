# 🖼️ Stable Diffusion Skill
> AI图像生成 - Stable Diffusion专项

---

## 📐 Prompt结构

### 基础结构
```
正向Prompt (Positive):
[质量词], [主体], [细节], [环境], [风格], [光线]

负向Prompt (Negative):
[排除内容]
```

### 权重语法
```
(word)      = 1.1倍强调
((word))    = 1.21倍强调
(word:1.5)  = 1.5倍强调
[word]      = 0.9倍弱化
```

---

## 🎯 核心参数

| 参数 | 说明 | 推荐值 |
|------|------|--------|
| Steps | 迭代步数 | 20-50 |
| CFG Scale | 提示词遵循度 | 7-12 |
| Sampler | 采样器 | DPM++ 2M Karras |
| Size | 尺寸 | 512x768, 768x512 |
| Seed | 种子 | -1随机 |

### 采样器选择
| 采样器 | 特点 |
|--------|------|
| DPM++ 2M Karras | 高质量，推荐 |
| Euler a | 快速，有创意 |
| DDIM | 稳定，适合对比 |
| UniPC | 快速高质量 |

---

## 📊 质量词汇表

### 正向质量词
```
masterpiece, best quality, highly detailed,
8k uhd, sharp focus, professional,
intricate details, photorealistic
```

### 负向必备词
```
(worst quality:2), (low quality:2), 
(normal quality:2), lowres, bad anatomy,
bad hands, text, error, missing fingers,
extra digit, fewer digits, cropped,
jpeg artifacts, signature, watermark,
username, blurry
```

---

## 🎭 风格Checkpoint

### 写实风格
| 模型 | 特点 |
|------|------|
| Realistic Vision | 真实人像 |
| CyberRealistic | 赛博写实 |
| ChilloutMix | 亚洲写实 |

### 动漫风格
| 模型 | 特点 |
|------|------|
| Anything V5 | 通用动漫 |
| Counterfeit | 精细动漫 |
| MeinaMix | 柔和动漫 |
| AbyssOrangeMix | 高质量 |

### 艺术风格
| 模型 | 特点 |
|------|------|
| DreamShaper | 艺术绘画 |
| RevAnimated | 2.5D |
| Protogen | 混合风格 |

---

## 📋 ControlNet类型

| 类型 | 用途 | 输入 |
|------|------|------|
| Canny | 边缘检测 | 线稿 |
| Depth | 深度图 | 深度信息 |
| OpenPose | 姿势控制 | 骨架 |
| Scribble | 涂鸦 | 草图 |
| Tile | 高清放大 | 低分辨率图 |
| IP-Adapter | 风格/角色 | 参考图 |
| Reference | 参考 | 参考图 |

---

## 🔧 角色一致性方案

### 方案1：LoRA训练
```
准备20-50张角色图
训练专属LoRA
使用：<lora:角色名:0.8>
```

### 方案2：IP-Adapter
```
上传角色参考图
设置权重0.5-0.8
生成新姿势/场景
```

### 方案3：Prompt固定
```
详细描述外貌
固定seed
使用相同正负Prompt
```

---

## 📊 番剧制作Workflow

### ComfyUI工作流

```
输入 → 预处理 → 生成 → 后处理 → 输出
  │        │        │        │
  ↓        ↓        ↓        ↓
文本/图片  ControlNet  采样   放大/修复
```

### A1111工作流

```
1. 选择模型
2. 写Prompt
3. 设置参数
4. 生成
5. img2img优化
6. 高清放大
```

---

## 🎬 番剧Prompt模板

### 人物镜头
```
正向：
masterpiece, best quality, 1girl/1boy,
[角色特征], [服装], [表情],
[姿势], [背景], [光线],
anime style, detailed eyes

负向：
(worst quality:2), (low quality:2),
bad anatomy, bad hands, deformed,
extra limbs, missing fingers
```

### 场景背景
```
正向：
masterpiece, best quality, no humans,
[场景描述], [时间], [天气],
detailed background, concept art,
anime background, studio ghibli style

负向：
(worst quality:2), (low quality:2),
blurry, text, watermark, people
```

### 战斗场景
```
正向：
masterpiece, best quality, action scene,
[角色] [动作], dynamic pose,
motion blur, impact effect,
dramatic lighting, anime style

负向：
(worst quality:2), (low quality:2),
static pose, bad anatomy
```

---

## 📋 常见问题

| 问题 | 解决 |
|------|------|
| 手指变形 | 负向添加bad hands，使用ADetailer |
| 脸部崩坏 | 使用ADetailer，降低CFG |
| 构图问题 | 使用ControlNet Canny/Depth |
| 风格不一致 | 固定模型+LoRA+seed |
| 细节不够 | 使用Hires.fix放大 |

---

## 🔧 推荐设置

### 人物生成
```
Steps: 28
CFG: 7
Sampler: DPM++ 2M Karras
Size: 512x768 (竖)
Hires.fix: 2x
Denoising: 0.4-0.5
```

### 场景生成
```
Steps: 30
CFG: 8
Sampler: DPM++ 2M Karras
Size: 768x512 (横) 或 896x512 (宽屏)
Hires.fix: 2x
```

---

*Skill版本: 1.0*
*平台: Stable Diffusion WebUI / ComfyUI*
*创建时间: 2026-02-14*
