# 🎨 Midjourney Skill
> AI图像生成 - Midjourney专项

---

## 📐 Prompt结构

### 基础公式
```
/imagine [主体] + [环境] + [风格] + [参数]
```

### 完整公式
```
[主体描述], [动作/状态], [环境/背景], 
[光线], [镜头/角度], [风格], [艺术家参考], 
[媒介], [色彩], [情绪], --参数
```

---

## 🎯 核心参数

| 参数 | 作用 | 示例 |
|------|------|------|
| --ar | 宽高比 | --ar 16:9, --ar 9:16 |
| --v | 版本 | --v 6.1 |
| --s | 风格化程度 | --s 100 (0-1000) |
| --c | 混沌度 | --c 20 (0-100) |
| --q | 质量 | --q 2 (0.25-2) |
| --no | 排除元素 | --no text, blur |
| --seed | 种子值 | --seed 12345 |
| --tile | 无缝贴图 | 用于背景 |
| --niji | 动漫风格 | 日本动画 |
| --style | 风格变体 | --style raw |

---

## 📊 画面类型Prompt

### 人物特写
```
portrait of [人物], [表情], [光线], 
cinematic lighting, 8k, detailed face, 
sharp focus --ar 3:4 --s 150
```

### 全身人物
```
full body shot of [人物], [服装], [姿势], 
[背景], studio lighting, fashion photography 
--ar 2:3 --s 200
```

### 场景/环境
```
[环境描述], [时间], [天气], [气氛],
cinematic, epic, volumetric lighting,
matte painting --ar 21:9 --s 300
```

### 物品/道具
```
[物品], product photography, 
studio lighting, white background,
highly detailed, 8k --ar 1:1
```

---

## 🎭 风格关键词

### 艺术媒介
| 关键词 | 效果 |
|--------|------|
| oil painting | 油画质感 |
| watercolor | 水彩 |
| pencil sketch | 素描 |
| digital art | 数字艺术 |
| 3D render | 3D渲染 |
| photography | 摄影 |
| anime | 动漫 |
| manga | 漫画 |

### 艺术风格
| 关键词 | 效果 |
|--------|------|
| impressionist | 印象派 |
| art nouveau | 新艺术 |
| art deco | 装饰艺术 |
| cyberpunk | 赛博朋克 |
| steampunk | 蒸汽朋克 |
| fantasy | 奇幻 |
| realistic | 写实 |
| surrealist | 超现实 |

### 光线关键词
| 关键词 | 效果 |
|--------|------|
| cinematic lighting | 电影灯光 |
| golden hour | 黄金时段 |
| blue hour | 蓝调时段 |
| volumetric lighting | 体积光 |
| rim lighting | 轮廓光 |
| dramatic lighting | 戏剧光 |
| soft lighting | 柔光 |
| studio lighting | 棚拍光 |

### 镜头关键词
| 关键词 | 效果 |
|--------|------|
| close-up | 特写 |
| medium shot | 中景 |
| wide shot | 远景 |
| bird's eye view | 鸟瞰 |
| low angle | 仰拍 |
| Dutch angle | 荷兰角 |
| over the shoulder | 过肩 |
| POV | 主观 |

---

## 📋 角色一致性技巧

### 方法1：Character Reference
```
[角色描述] --cref [角色图片URL] --cw 100
```
- --cw 0-100 控制参考强度

### 方法2：Style Reference  
```
[描述] --sref [风格图片URL] --sw 100
```
- --sw 0-1000 控制风格强度

### 方法3：Seed锁定
```
保持相同 --seed 值和相似描述
```

---

## 🔧 番剧制作专用Prompt

### 镜头类型模板

**叙事镜头**：
```
[角色] in [场景], [动作], 
cinematic, anime style, 
Studio Ghibli inspired,
--ar 16:9 --niji --s 200
```

**戏剧镜头**：
```
dramatic moment, [角色] [表情],
intense lighting, close-up,
emotional, anime style,
--ar 16:9 --niji --s 300
```

**情绪镜头**：
```
atmospheric shot, [场景],
[情绪色彩], poetic, dreamy,
cinematic composition,
--ar 21:9 --s 400
```

---

## 📊 常见问题解决

| 问题 | 解决方案 |
|------|----------|
| 手部变形 | 添加 "detailed hands, correct anatomy" |
| 文字乱码 | 添加 "--no text, words, letters" |
| 风格不稳 | 使用 --sref 锁定风格 |
| 角色不一致 | 使用 --cref 或保持seed |
| 构图太满 | 添加 "negative space, minimalist" |

---

## 🎬 工作流程

### Step 1: 概念探索
```
快速生成多个方向
--c 30 --s 100
```

### Step 2: 风格确定
```
选择喜欢的，降低混沌度
--c 10 --s 200
```

### Step 3: 细节优化
```
调整描述，提高质量
--q 2 --s 300
```

### Step 4: 变体生成
```
使用 V按钮 或调整描述
锁定seed保持一致
```

---

## 🎨 番剧Prompt模板库

### 日常场景
```
slice of life scene, [角色] [日常动作],
warm morning light, cozy atmosphere,
anime style, soft colors, --ar 16:9 --niji
```

### 战斗场景
```
action scene, [角色] [战斗动作],
dynamic pose, speed lines, impact effect,
dramatic lighting, anime style, --ar 16:9 --niji
```

### 情感场景
```
emotional scene, [角色] [情感状态],
soft lighting, [情绪色彩],
cinematic composition, anime style,
--ar 16:9 --niji --s 400
```

### 背景/场景
```
[环境] background, no people,
[时间] [天气], detailed environment,
anime background art, concept art,
--ar 16:9 --niji --s 300
```

---

*Skill版本: 1.0*
*平台: Midjourney v6+*
*创建时间: 2026-02-14*
