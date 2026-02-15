# 🎨 DALL-E使用指南 Skill
> 来源：OpenAI DALL-E官方文档 + 实战经验

---

## 📐 DALL-E版本对比

| 特性 | DALL-E 2 | DALL-E 3 |
|------|----------|----------|
| 文本理解 | 基础 | 深度语义理解 |
| 最大分辨率 | 1024×1024 | 1024×1792 / 1792×1024 |
| 风格控制 | 提示词依赖 | 自然语言描述 |
| 人物一致性 | 较弱 | 改进但仍有限 |
| 文字渲染 | 差 | 显著提升 |

---

## 🎯 提示词结构

### 标准公式
```
[主体] + [动作/状态] + [环境] + [风格] + [光线] + [视角] + [品质词]
```

### 示例
```
一位穿着红色旗袍的年轻女子，站在雨中的上海弄堂，手持油纸伞，
赛博朋克风格，霓虹灯光，电影感画面，低角度拍摄，8K高清
```

---

## 🎬 风格关键词库

### 艺术风格
| 风格 | 关键词 |
|------|--------|
| 油画 | oil painting, impasto, brushstrokes visible |
| 水彩 | watercolor, soft edges, flowing colors |
| 赛博朋克 | cyberpunk, neon lights, dystopian |
| 吉卜力 | Studio Ghibli style, Miyazaki inspired |
| 皮克斯 | Pixar 3D animation style |
| 新海诚 | Makoto Shinkai style, detailed clouds |

### 品质提升词
| 效果 | 关键词 |
|------|--------|
| 高清 | 8K, ultra HD, highly detailed |
| 专业 | professional photography, studio lighting |
| 电影感 | cinematic, film grain, anamorphic |
| 艺术性 | masterpiece, award-winning |

---

## 🔧 DALL-E 3特有技巧

### 自然语言描述
DALL-E 3理解完整句子，不需要堆砌关键词：
```
❌ 旧写法：cat, cute, fluffy, sitting, window, sunlight, cozy
✅ 新写法：一只蓬松的橘猫慵懒地蜷缩在洒满阳光的窗台上
```

### 风格指定
```
以[艺术家/风格]的风格绘制...
例：以莫奈印象派的风格绘制一片睡莲池塘
```

### 避免内容
使用否定描述要小心：
```
❌ 不要有文字（可能仍出现）
✅ 画面干净简洁，纯图像无文字元素
```

---

## 📋 番剧制作应用

### 角色设计
```
【角色立绘】
动漫风格的少年主角，蓝色短发，穿着白色校服，
表情坚定，全身立绘，白色背景，角色设计概念图
```

### 场景概念
```
【背景设计】
黄昏时分的日本乡村车站，远处山峦起伏，
新海诚风格，精致的云彩和光影，16:9宽银幕构图
```

### 分镜预览
```
【分镜图】
电影分镜板风格，角色从左侧入画，推镜头，
黑白草图，标注镜头运动方向
```

---

## ⚠️ 限制与解决方案

| 限制 | 解决方案 |
|------|----------|
| 角色一致性差 | 详细描述特征，使用参考图 |
| 文字容易出错 | 后期用Canva添加文字 |
| 手部异常 | 尽量避免特写，或后期修复 |
| 版权人物 | 描述特征而非名字 |

---

## 💡 API调用示例

```python
from openai import OpenAI

client = OpenAI()
response = client.images.generate(
    model="dall-e-3",
    prompt="你的提示词",
    size="1792x1024",  # 横向
    quality="hd",
    n=1
)
image_url = response.data[0].url
```

---

*Skill版本: 1.0*
*适用: DALL-E 2/3*
*创建时间: 2026-02-14*
