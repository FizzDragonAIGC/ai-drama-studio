# 🎬 文生视频（Text to Video）Skill
> 来源：Runway/Pika/Kling/Sora技术概览

---

## 📐 主流平台对比

| 平台 | 时长 | 分辨率 | 特点 |
|------|------|--------|------|
| Runway Gen-3 | 10秒 | 1080p | 质量高 |
| Pika 1.5 | 3-4秒 | 1080p | 简单易用 |
| Kling可灵 | 2分钟 | 1080p | 长视频 |
| Sora | 60秒 | 1080p | 顶级（待开放）|
| Stable Video | 4秒 | 1024p | 开源 |

---

## 🎯 提示词结构

### 通用公式
```
[主体] + [动作] + [场景] + [镜头运动] + [风格] + [氛围]
```

### 详细模板
```
【主体描述】
A [年龄][性别][外观特征] character,
wearing [服装描述]

【动作描述】
[动作动词] + [动作细节] + [速度/方式]

【场景描述】
in a [场景类型], [环境细节], [光线条件]

【镜头运动】
[镜头类型] shot, camera [运动方式]

【风格氛围】
[视觉风格], [情绪氛围], [质量词]
```

---

## 🎬 镜头运动词汇

### 基础运动
| 中文 | 英文 | 效果 |
|------|------|------|
| 推镜头 | push in, dolly in | 靠近主体 |
| 拉镜头 | pull out, dolly out | 远离主体 |
| 横移 | tracking, pan | 水平移动 |
| 升降 | crane, tilt | 垂直移动 |
| 环绕 | orbit, arc | 围绕主体 |
| 跟随 | follow shot | 跟踪移动 |

### 组合运动
```
push in while orbiting（推进同时环绕）
crane up with slow pan（升降加横摇）
tracking shot following character（跟踪移动）
```

---

## 📋 番剧分镜应用

### 开场镜头
```
Establishing shot of a Japanese high school,
cherry blossoms falling, morning sunlight,
slow push in, anime style, peaceful atmosphere
```

### 角色登场
```
Young anime girl with long black hair walks into frame,
wearing school uniform, looking around curiously,
medium shot, slight camera follow, soft lighting
```

### 对话场景
```
Two characters talking, subtle head movements,
over the shoulder shot, minimal camera movement,
indoor setting, natural lighting, anime style
```

### 动作场景
```
Warrior character draws sword with swift motion,
dramatic pose, cape flowing in wind,
dynamic camera orbit, speed lines effect,
intense atmosphere, dramatic lighting
```

---

## 🔧 风格关键词

### 动漫风格
```
anime style, 2D animation, cel shaded,
Japanese animation aesthetic,
vibrant anime colors, clean lines
```

### 电影质感
```
cinematic, film grain, anamorphic lens,
professional color grading,
hollywood production quality
```

### 特效增强
```
motion blur, lens flare, depth of field,
particle effects, volumetric lighting
```

---

## ⚡ 平台特定技巧

### Runway Gen-3
```
【优势】理解复杂描述
【技巧】
- 描述越具体越好
- 明确镜头运动
- 指定动作幅度
```

### Pika
```
【优势】简单快速
【技巧】
- 使用Motion强度控制
- Modify Region局部动态
- 适合静态图动态化
```

### Kling可灵
```
【优势】长视频、中文理解
【技巧】
- 中文描述更准确
- 分段描述复杂动作
- 利用图生视频提高一致性
```

---

## 🎨 质量提升

### 提示词优化
```
【增强词】
smooth motion, high quality, detailed,
professional, 4K quality, cinematic

【避免词】
blurry, distorted, glitchy,
low quality, artifacts
```

### 迭代方法
```
1. 短视频测试提示词
2. 记录有效的表述
3. 组合优化
4. 正式生成
```

---

## 📋 工作流建议

### 番剧制作流程
```
1. 写分镜脚本
2. 为每个镜头写提示词
3. 先用图生图生成关键帧
4. 关键帧转视频
5. 后期剪辑组合
```

### 批量管理
```
【文件命名】
scene01_shot01_take01.mp4
scene01_shot01_take02.mp4
...

【提示词记录】
spreadsheet记录每个镜头的:
- 提示词
- 参数
- 效果评分
```

---

## ⚠️ 常见问题

| 问题 | 解决 |
|------|------|
| 动作不连贯 | 细化动作描述 |
| 角色变形 | 降低Motion/使用图生视频 |
| 风格不一致 | 统一风格描述词 |
| 时长太短 | 使用扩展功能/后期拼接 |

---

## 💡 未来趋势

| 方向 | 说明 |
|------|------|
| 更长时长 | 分钟级视频生成 |
| 更高一致性 | 角色/风格保持 |
| 更精细控制 | 分轨道控制 |
| 音频整合 | 同步音效/对话 |

---

*Skill版本: 1.0*
*适用: 主流文生视频平台*
*创建时间: 2026-02-14*
