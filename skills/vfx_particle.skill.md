# ✨ 粒子效果 Skill
> AI番剧制作 - 粒子系统与特效

---

## 📐 粒子基础

| 概念 | 说明 | 应用场景 |
|------|------|----------|
| **发射器** | 粒子产生源 | 定义出生位置 |
| **粒子寿命** | 存活时间 | 效果持续性 |
| **物理属性** | 重力、风力 | 运动表现 |
| **外观变化** | 颜色、大小 | 视觉效果 |
| **碰撞反应** | 与物体交互 | 真实感 |

---

## 🎯 粒子类型

### 自然粒子
| 类型 | 特征 | Prompt关键词 |
|------|------|-------------|
| 雪花 | 缓慢飘落 | falling snow, snowflakes |
| 雨滴 | 快速下落 | rain drops, rainfall |
| 落叶 | 飘舞旋转 | falling leaves, autumn leaves |
| 花瓣 | 轻盈飘散 | cherry blossoms, petals floating |
| 尘埃 | 缓慢漂浮 | dust particles, floating dust |
| 萤火虫 | 发光移动 | fireflies, glowing particles |

### 魔法粒子
| 类型 | 特征 | Prompt关键词 |
|------|------|-------------|
| 星尘 | 闪烁发光 | stardust, sparkling particles |
| 能量粒子 | 流动聚集 | energy particles, magical sparks |
| 光点 | 明亮点状 | light orbs, glowing dots |
| 符文粒子 | 符号形状 | runic particles, mystical symbols |
| 灵魂火焰 | 幽灵效果 | soul particles, ghostly wisps |

### 物理粒子
| 类型 | 特征 | Prompt关键词 |
|------|------|-------------|
| 火花 | 快速飞溅 | sparks, metal sparks |
| 碎片 | 爆炸飞散 | debris, shrapnel |
| 泡沫 | 漂浮破裂 | bubbles, foam particles |
| 蒸汽 | 上升消散 | steam, vapor particles |

---

## 🔧 粒子参数设计

```
【粒子系统设计】

发射设置：
├─ 发射形状：点/线/面/体积
├─ 发射速率：数量/秒
├─ 发射角度：扩散范围
└─ 初始速度：起始速度

粒子属性：
├─ 大小：初始→结束
├─ 颜色：初始→结束
├─ 透明度：初始→结束
├─ 旋转：速度/方向
└─ 寿命：存活时间

物理设置：
├─ 重力：下落/上升
├─ 风力：方向/强度
├─ 湍流：随机运动
└─ 阻力：速度衰减
```

---

## 📋 AI粒子Prompt模板

### 魔法粒子
```
[character] surrounded by [particle type],
[color] magical particles, glowing effects,
particle swirl, energy emanating,
cinematic lighting, fantasy atmosphere,
detailed particle effects
```

### 自然粒子
```
[scene] with [natural particles],
[particle behavior], atmospheric effect,
volumetric particles, depth of field,
natural lighting, photorealistic
```

### 战斗粒子
```
[action scene], [particle type] effects,
dynamic particles, motion blur,
explosive particles, debris flying,
intense action, cinematic impact
```

---

## 🎨 粒子颜色方案

| 效果类型 | 推荐颜色 | Prompt描述 |
|----------|----------|-----------|
| 治愈魔法 | 绿色/白色 | green healing particles |
| 火焰魔法 | 橙红/黄色 | orange fire particles |
| 冰霜魔法 | 蓝色/白色 | blue ice particles |
| 雷电魔法 | 紫色/蓝色 | purple lightning particles |
| 暗黑魔法 | 紫黑/红色 | dark purple particles |
| 神圣魔法 | 金色/白色 | golden holy particles |
| 自然魔法 | 绿色/棕色 | green nature particles |

---

## 💡 粒子效果技巧

### 层次感
1. 前景大粒子（模糊）
2. 中景主粒子
3. 背景小粒子（淡化）

### 运动感
- 运动模糊
- 拖尾效果
- 速度线

### 发光效果
- 核心高亮
- 光晕扩散
- 环境反光

---

*Skill版本: 1.0*
*分类: VFX特效*
*创建时间: 2026-02-14*
