# 🚫 负面提示词 Skill
> 避免不良生成的负面Prompt库

---

## 📐 基础负面词

### 质量问题
```
worst quality, low quality,
normal quality, lowres,
blurry, blur, out of focus,
jpeg artifacts, compression artifacts,
pixelated, grainy, noisy
```

### 解剖问题
```
bad anatomy, wrong anatomy,
malformed, deformed, disfigured,
mutated, mutation,
poorly drawn, bad proportions,
anatomical nonsense
```

---

## 🎯 身体部位

### 手部问题
```
bad hands, poorly drawn hands,
mutated hands, deformed hands,
missing fingers, extra fingers,
too many fingers, fewer fingers,
fused fingers, long fingers,
ugly fingers
```

### 脸部问题
```
bad face, poorly drawn face,
ugly face, deformed face,
asymmetric face, distorted face,
extra face, multiple faces,
cloned face
```

### 眼睛问题
```
bad eyes, ugly eyes,
deformed eyes, asymmetric eyes,
cross-eyed, wall-eyed,
extra eyes, missing eyes
```

### 身体问题
```
bad body, malformed body,
extra limbs, missing limbs,
extra arms, extra legs,
extra head, conjoined,
fused body, long body,
long neck
```

---

## 📊 风格问题

### 文字/水印
```
text, watermark, signature,
username, artist name,
logo, copyright,
words, letters, writing
```

### 边框/裁切
```
cropped, out of frame,
border, frame,
cut off, partially visible
```

### 艺术问题
```
amateur, ugly, poorly drawn,
bad art, kitsch, low effort,
simple, simplistic
```

---

## 🎭 场景专用

### 人像负面词
```
(worst quality:2), (low quality:2),
bad anatomy, bad hands,
bad face, poorly drawn face,
deformed, ugly, blurry,
extra limbs, cloned face,
disfigured, gross proportions,
malformed limbs, missing arms,
missing legs, extra arms,
extra legs, fused fingers,
too many fingers, long neck
```

### 动漫负面词
```
(worst quality:2), (low quality:2),
bad anatomy, bad hands,
text, error, missing fingers,
extra digit, fewer digits,
cropped, jpeg artifacts,
signature, watermark, username,
blurry, bad feet,
poorly drawn hands,
poorly drawn face, mutation,
deformed, extra fingers,
extra limbs, extra arms,
extra legs, malformed limbs
```

### 风景负面词
```
(worst quality:2), (low quality:2),
blurry, low resolution,
text, watermark, signature,
cropped, out of frame,
ugly, pixelated, grainy,
oversaturated, overexposed,
underexposed
```

---

## 📋 平台专用

### Stable Diffusion
```
完整负面Prompt:
(worst quality:2), (low quality:2),
normal quality, lowres,
bad anatomy, bad hands, text,
error, missing fingers,
extra digit, fewer digits,
cropped, worst quality,
low quality, normal quality,
jpeg artifacts, signature,
watermark, username, blurry,
artist name, bad feet,
poorly drawn hands,
poorly drawn face, mutation,
deformed, ugly, blurry,
bad proportions, extra limbs,
cloned face, disfigured,
gross proportions,
malformed limbs, missing arms,
missing legs, extra arms,
extra legs, fused fingers,
too many fingers, long neck
```

### Midjourney
```
使用 --no 参数:
--no blur, text, watermark,
extra fingers, deformed
```

---

## 🔧 使用技巧

### 权重调整 (SD)
```
强调排除：
(worst quality:2)
(low quality:2)
(bad anatomy:1.5)
(extra fingers:1.5)
```

### 分类使用
```
人物必加：
bad anatomy, bad hands,
extra fingers, deformed

风景必加：
blurry, text, watermark

通用必加：
worst quality, low quality
```

### 精简版
```
最精简负面词（SD）:
(worst quality:2), (low quality:2),
blurry, bad anatomy

稍详细版:
(worst quality:2), (low quality:2),
bad anatomy, bad hands,
extra fingers, blurry,
watermark, text
```

---

## 📊 常见问题对策

| 问题 | 负面词 |
|------|--------|
| 手指变形 | bad hands, extra fingers, deformed hands |
| 脸部崩坏 | bad face, deformed face |
| 模糊 | blurry, out of focus |
| 水印 | watermark, text, signature |
| 多余肢体 | extra limbs, extra arms, extra legs |
| 比例失调 | bad proportions, wrong proportions |
| 低质量 | worst quality, low quality |

---

*Skill版本: 1.0*
*创建时间: 2026-02-14*
