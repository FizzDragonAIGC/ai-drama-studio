# 🎬 Runway视频生成 Skill
> 来源：Runway Gen-2/Gen-3官方文档

---

## 📐 Runway产品线

| 产品 | 功能 | 适用场景 |
|------|------|----------|
| Gen-3 Alpha | 最新视频生成 | 高质量短视频 |
| Gen-2 | 成熟视频模型 | 稳定性要求高 |
| Gen-1 | 视频到视频 | 风格转换 |

---

## 🎯 Gen-3 Alpha核心功能

### 生成模式
| 模式 | 输入 | 输出 | 时长 |
|------|------|------|------|
| Text to Video | 文字描述 | 视频 | 5-10秒 |
| Image to Video | 静态图片 | 视频 | 5-10秒 |

### 视频规格
- 分辨率：1280×768 / 768×1280
- 帧率：24fps
- 时长：5秒或10秒

---

## 🎬 提示词结构

### 完整格式
```
[镜头运动] + [主体动作] + [场景描述] + [风格/氛围]
```

### 镜头运动词汇
| 中文 | 英文 | 效果 |
|------|------|------|
| 推镜 | dolly in, push in | 靠近主体 |
| 拉镜 | dolly out, pull back | 远离主体 |
| 横移 | tracking shot, pan | 水平跟随 |
| 升降 | crane shot, tilt | 垂直运动 |
| 环绕 | orbit, 360 rotation | 围绕主体 |
| 静止 | static shot, locked | 固定机位 |

### 动作描述
```
✅ 好的描述：
"A woman slowly turns her head to look at camera, 
her hair gently flowing in the wind"

❌ 避免：
"A woman" (太简单，动作不明确)
```

---

## 📋 番剧制作工作流

### 1. 关键帧制作
先用图像AI生成关键帧：
```
动漫风格的少女，站在樱花树下，
侧脸，风吹动头发，粉色花瓣飘落
```

### 2. 动态化（Image to Video）
```
提示词补充动作：
"gentle wind blowing through hair, 
cherry blossom petals slowly falling,
subtle breathing motion, cinematic"
```

### 3. 参数设置
```
Motion: 5-7 (动作幅度)
Duration: 5s (短镜头) / 10s (长镜头)
Seed: 固定种子可复现
```

---

## 🔧 进阶技巧

### 镜头语言转化
| 电影语言 | Runway提示 |
|----------|------------|
| 建立镜头 | wide establishing shot, slow push in |
| 特写 | extreme close-up, subtle motion |
| 过肩镜头 | over the shoulder, slight movement |
| 主观镜头 | POV shot, first person view |

### 保持稳定性
```
添加稳定词汇：
- smooth motion
- steady camera
- cinematic movement
- professional footage
```

### 循环视频技巧
```
描述可循环的动作：
"seamless loop, continuous motion,
breathing animation, idle animation"
```

---

## 🎨 风格控制

### 动漫风格
```
anime style, 2D animation, cel shaded,
Japanese animation aesthetic, 
vibrant colors, clean lines
```

### 电影质感
```
cinematic, film grain, anamorphic lens,
professional color grading, 
hollywood production quality
```

### 风格化
```
[艺术风格] aesthetic, stylized,
inspired by [参考作品/导演]
```

---

## ⚠️ 限制与解决

| 限制 | 解决方案 |
|------|----------|
| 10秒最长 | 多段拼接 |
| 角色变形 | 减小Motion值 |
| 动作不连贯 | 细化动作描述 |
| 风格不稳定 | 使用图生视频 |

---

## 💰 积分优化

| 策略 | 说明 |
|------|------|
| 先预览 | 用短时长测试提示词 |
| 固定种子 | 满意后记录种子 |
| 批量规划 | 一次想好多个镜头 |

---

*Skill版本: 1.0*
*平台: Runway Gen-3 Alpha*
*创建时间: 2026-02-14*
