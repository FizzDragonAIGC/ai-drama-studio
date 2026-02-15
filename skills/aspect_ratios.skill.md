# 📐 宽高比指南 Skill
> 不同平台和用途的宽高比选择

---

## 📐 常用宽高比

### 横屏
| 比例 | 用途 | Prompt/参数 |
|------|------|-------------|
| 16:9 | 电影、YouTube | --ar 16:9 |
| 21:9 | 超宽电影 | --ar 21:9 |
| 3:2 | 经典摄影 | --ar 3:2 |
| 4:3 | 老电视、iPad | --ar 4:3 |
| 2:1 | 电影宽幅 | --ar 2:1 |

### 竖屏
| 比例 | 用途 | Prompt/参数 |
|------|------|-------------|
| 9:16 | TikTok、Reels、抖音 | --ar 9:16 |
| 4:5 | Instagram帖子 | --ar 4:5 |
| 2:3 | 手机壁纸 | --ar 2:3 |
| 3:4 | 竖版照片 | --ar 3:4 |

### 方形
| 比例 | 用途 | Prompt/参数 |
|------|------|-------------|
| 1:1 | Instagram、头像 | --ar 1:1 |

---

## 🎯 平台选择

### 视频平台
| 平台 | 推荐比例 |
|------|----------|
| YouTube | 16:9 |
| TikTok | 9:16 |
| Instagram Reels | 9:16 |
| B站 | 16:9 |
| 抖音 | 9:16 |
| 电影院 | 21:9, 2.39:1 |
| Netflix | 16:9 |

### 图片平台
| 平台 | 推荐比例 |
|------|----------|
| Instagram帖子 | 1:1, 4:5 |
| Instagram故事 | 9:16 |
| Twitter | 16:9, 2:1 |
| Pinterest | 2:3, 9:16 |
| 壁纸 | 16:9 (PC), 9:16 (手机) |

---

## 📊 场景选择

### 横屏适合
```
- 风景/全景
- 动作场景
- 群戏
- 电影感
- 环境展示

Prompt:
wide shot, cinematic,
landscape orientation,
panoramic, --ar 16:9
```

### 竖屏适合
```
- 人像/特写
- 单人焦点
- 手机内容
- 短视频
- 直播

Prompt:
portrait orientation,
vertical composition,
single subject focus,
--ar 9:16
```

### 方形适合
```
- 头像
- 产品图
- 社交媒体
- 对称构图

Prompt:
square composition,
centered subject,
balanced, --ar 1:1
```

---

## 🎭 构图适配

### 横屏构图
```
宽幅构图：
- 使用水平引导线
- 左右布局
- 空间感强
- 适合运动/追逐

Prompt:
wide composition,
horizontal layout,
using rule of thirds horizontally
```

### 竖屏构图
```
竖幅构图：
- 使用垂直引导线
- 上下布局
- 人物占主导
- 适合近景/特写

Prompt:
vertical composition,
full body or portrait,
vertical framing,
mobile-friendly layout
```

---

## 📋 AI平台参数

### Midjourney
```
--ar 16:9  (横屏)
--ar 9:16  (竖屏)
--ar 1:1   (方形)
--ar 21:9  (超宽)
--ar 4:5   (Instagram)
```

### Stable Diffusion
```
横屏：768x512, 896x512, 1024x576
竖屏：512x768, 512x896, 576x1024
方形：512x512, 768x768
```

### Flux
```
在prompt中描述：
"...in landscape format"
"...vertical composition"
"...square frame"
或使用平台自带选项
```

---

## 🔧 转换技巧

### 横屏转竖屏
```
- 裁切时保留主体
- 可能需要重新构图
- 注意重要元素不被切掉
- 或使用outpainting扩展
```

### 竖屏转横屏
```
- 使用outpainting左右扩展
- 添加环境元素
- 保持主体中心
```

---

## 📊 番剧制作选择

### 标准番剧
```
比例：16:9
分辨率：1920x1080 (1080p)
         3840x2160 (4K)
用途：YouTube、B站、流媒体
```

### 短剧/竖屏番剧
```
比例：9:16
分辨率：1080x1920
用途：TikTok、抖音、快手
```

### 电影级番剧
```
比例：21:9 或 2.39:1
分辨率：2560x1080
用途：电影感、大银幕感
```

---

*Skill版本: 1.0*
*创建时间: 2026-02-14*
