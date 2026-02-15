# 🎨 Leonardo AI Skill
> 来源：Leonardo.ai官方文档 + 社区最佳实践

---

## 📐 Leonardo特色功能

| 功能 | 说明 | 适用场景 |
|------|------|----------|
| Image Generation | 高质量图像生成 | 角色设计、场景图 |
| AI Canvas | 智能画布编辑 | 局部修改、扩展 |
| Realtime Canvas | 实时生成 | 快速迭代 |
| Motion | 图片转视频 | 动态预览 |
| Character Reference | 角色一致性 | 番剧角色 |

---

## 🎯 核心模型对比

| 模型 | 风格 | 推荐用途 |
|------|------|----------|
| Leonardo Phoenix | 平衡型 | 通用创作 |
| Leonardo Anime XL | 动漫风格 | 番剧角色、场景 |
| Leonardo Kino XL | 电影质感 | 真实感场景 |
| Leonardo Lightning XL | 快速生成 | 草图迭代 |
| SDXL系列 | 可选微调 | 特定风格 |

---

## 🎬 动漫制作设置

### 推荐参数（Anime XL）
```
模型: Leonardo Anime XL
分辨率: 1024×576 (16:9) 或 1024×1024
Guidance Scale: 7-9
Steps: 30-40
Scheduler: DPM++ 2M Karras
```

### 提示词模板
```
【角色】
anime style, [角色描述], [服装], [表情], [姿势],
detailed eyes, high quality, studio lighting

【场景】
anime background, [场景描述], [时间], [天气],
detailed environment, cinematic composition
```

---

## 🔧 角色一致性技巧

### Character Reference功能
1. 上传角色参考图
2. 调整相似度强度（0.3-0.8）
3. 描述新姿势/场景
4. 生成保持一致的新图

### 手动保持一致性
```
固定描述模板：
[角色名] with [发色+发型], [眼睛颜色], wearing [标志性服装],
[体型描述], [标志性配饰]

示例：
young woman with long silver hair and red eyes, 
wearing black military uniform with gold trim,
slender figure, carrying a katana
```

---

## 📋 番剧工作流

### 1. 角色设计
```
Character design sheet, anime style,
front view, side view, back view,
full body, detailed outfit, white background,
[角色详细描述]
```

### 2. 表情差分
```
Expression sheet, same character,
happy, sad, angry, surprised, neutral,
anime style, portrait, [角色特征]
```

### 3. 场景设计
```
Anime background, no characters,
[场景描述], [时间段], [氛围],
wide shot, establishing shot, detailed
```

### 4. 分镜生成
```
Anime screenshot, [角色], [动作],
[场景], [镜头类型], [光线],
high quality animation frame
```

---

## 🎨 Elements（元素）使用

| 元素类型 | 作用 | 强度建议 |
|----------|------|----------|
| Style | 整体风格 | 0.5-0.8 |
| Character | 角色特征 | 0.4-0.7 |
| Environment | 环境风格 | 0.3-0.6 |

### 叠加组合
```
可同时使用多个Elements，注意总强度不超过1.5
例：Anime Style (0.6) + Ghibli Environment (0.4)
```

---

## 💰 Token优化

| 功能 | Token消耗 | 建议 |
|------|-----------|------|
| 快速预览 | 低 | Lightning模型 |
| 精细生成 | 中 | Phoenix/Anime XL |
| Alchemy增强 | 高 | 最终成品时用 |

---

## ⚠️ 常见问题

| 问题 | 解决方案 |
|------|----------|
| 角色不一致 | 使用Character Reference |
| 手部畸形 | 添加"perfect hands"或裁切 |
| 风格偏离 | 明确指定"anime style" |
| 细节不足 | 提高Steps，使用Alchemy |

---

*Skill版本: 1.0*
*平台: Leonardo.ai*
*创建时间: 2026-02-14*
