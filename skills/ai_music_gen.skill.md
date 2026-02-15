# 🎵 AI音乐生成 Skill
> 来源：Suno/Udio/MusicGen技术实践

---

## 📐 AI音乐生成概述

| 概念 | 说明 |
|------|------|
| 定义 | 用AI自动生成音乐 |
| 类型 | 纯音乐/带人声 |
| 应用 | BGM、配乐、主题曲 |

---

## 🎯 主流平台对比

| 平台 | 类型 | 特点 | 适用 |
|------|------|------|------|
| Suno | 商业 | 完整歌曲+人声 | 主题曲 |
| Udio | 商业 | 高质量音乐 | 专业BGM |
| MusicGen | 开源 | 纯音乐 | 本地使用 |
| AIVA | 商业 | 古典/影视配乐 | 正式配乐 |
| Mubert | 商业 | 无限流生成 | 背景音乐 |

---

## 🎬 Suno使用

### 简单模式
```
【步骤】
1. 输入歌词或描述
2. 选择风格标签
3. 生成
4. 下载

【风格标签示例】
anime opening, J-pop, electronic,
orchestral, epic, emotional ballad
```

### 自定义模式
```
【歌词格式】
[Verse]
歌词内容...

[Chorus]
副歌内容...

[Bridge]
过渡段...

【风格提示】
Style: anime opening, energetic J-rock
Instruments: electric guitar, drums, synth
Tempo: 140 BPM
Mood: exciting, heroic
```

---

## 📋 Udio使用

### 提示词结构
```
[风格] + [情绪] + [乐器] + [场景描述]
```

### 示例
```
【史诗配乐】
epic orchestral score, cinematic,
full orchestra with choir,
heroic battle theme,
building intensity

【日常BGM】
light acoustic, peaceful,
piano and strings,
slice of life anime scene,
warm and gentle
```

---

## 🔧 MusicGen本地使用

### 安装
```bash
pip install audiocraft
```

### 生成代码
```python
from audiocraft.models import MusicGen

model = MusicGen.get_pretrained('medium')
model.set_generation_params(duration=30)

descriptions = ["epic orchestral anime battle theme"]
wav = model.generate(descriptions)
```

### 模型选择
| 模型 | 参数量 | 质量 | 速度 |
|------|--------|------|------|
| small | 300M | 一般 | 快 |
| medium | 1.5B | 良好 | 中 |
| large | 3.3B | 优秀 | 慢 |

---

## 🎨 番剧配乐应用

### BGM类型规划
```
【场景类型 → 音乐风格】

日常场景：
light acoustic, gentle piano,
warm strings, peaceful

战斗场景：
epic orchestral, intense drums,
powerful brass, driving rhythm

悲伤场景：
emotional piano, melancholic strings,
slow tempo, minor key

搞笑场景：
playful, bouncy, comedic,
light percussion, quirky sounds

紧张场景：
suspenseful, dark ambient,
low strings, building tension
```

### 配乐需求清单
```
【标准番剧配乐套装】
1. 主题曲 (OP)
2. 片尾曲 (ED)
3. 日常BGM (3-5首)
4. 战斗BGM (2-3首)
5. 情感BGM (3-5首)
6. 悬念BGM (2-3首)
7. 转场/过渡曲 (2-3首)
```

---

## ⚡ 风格关键词库

### 动漫风格
| 类型 | 关键词 |
|------|--------|
| 热血番 | epic, energetic, J-rock, powerful |
| 日常番 | light, acoustic, gentle, peaceful |
| 恋爱番 | romantic, emotional, piano, strings |
| 悬疑番 | mysterious, dark, ambient, tension |
| 搞笑番 | playful, bouncy, comedic, quirky |

### 乐器关键词
| 乐器 | 英文 |
|------|------|
| 钢琴 | piano, grand piano |
| 小提琴 | violin, strings |
| 电吉他 | electric guitar |
| 合成器 | synthesizer, synth |
| 管弦乐 | orchestra, orchestral |
| 鼓 | drums, percussion |

### 情绪关键词
| 情绪 | 英文 |
|------|------|
| 史诗 | epic, grand, majestic |
| 温暖 | warm, gentle, heartwarming |
| 悲伤 | sad, melancholic, emotional |
| 紧张 | tense, suspenseful, anxious |
| 欢快 | happy, joyful, upbeat |

---

## 📋 工作流建议

### 配乐制作流程
```
1. 分析场景情绪需求
2. 确定风格和乐器
3. 编写提示词
4. 生成多个版本
5. 筛选最佳
6. 后期调整长度/循环
7. 与画面同步测试
```

### 版本管理
```
命名规范：
[场景类型]_[情绪]_[版本号].mp3

示例：
battle_epic_v01.mp3
daily_peaceful_v02.mp3
```

---

## 🔧 后期处理

### 常用处理
| 处理 | 工具 | 用途 |
|------|------|------|
| 裁剪 | Audacity | 调整长度 |
| 循环 | FL Studio | 无缝循环 |
| 混音 | Audition | 音量平衡 |
| 压缩 | 各DAW | 动态控制 |

### 循环点处理
```
找到合适的循环点
淡入淡出处理
确保无缝衔接
```

---

## ⚠️ 版权说明

| 平台 | 商用授权 |
|------|----------|
| Suno | Pro计划可商用 |
| Udio | 需确认授权 |
| MusicGen | 开源可商用 |

### 使用建议
```
- 确认授权范围
- 保留生成记录
- 重要项目使用多来源
```

---

## 💡 进阶技巧

### 风格延续
```
生成满意片段后：
- 使用"继续"功能
- 保持相同风格词
- 拼接成完整曲目
```

### 参考曲目
```
描述时引用参考：
"similar to [参考曲目],
with [改变的元素]"
```

---

*Skill版本: 1.0*
*适用: Suno/Udio/MusicGen*
*创建时间: 2026-02-14*
