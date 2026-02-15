# 🗣️ AI口型同步（Lip Sync）Skill
> 来源：Wav2Lip/SadTalker/D-ID技术实践

---

## 📐 口型同步原理

| 概念 | 说明 |
|------|------|
| 定义 | 让角色嘴型与音频同步 |
| 输入 | 角色图/视频 + 音频 |
| 输出 | 口型匹配的视频 |
| 核心 | 音素到口型映射 |

---

## 🎯 主流工具对比

| 工具 | 类型 | 质量 | 易用性 |
|------|------|------|--------|
| Wav2Lip | 开源 | 中 | 需技术 |
| SadTalker | 开源 | 高 | 中等 |
| D-ID | 商业 | 高 | 简单 |
| HeyGen | 商业 | 高 | 简单 |
| Pika Lip Sync | 商业 | 中高 | 简单 |
| Sync Labs | 商业 | 高 | 简单 |

---

## 🎬 SadTalker使用

### 安装（Colab/本地）
```bash
git clone https://github.com/OpenTalker/SadTalker
cd SadTalker
pip install -r requirements.txt
# 下载预训练模型
```

### 基本使用
```bash
python inference.py \
  --source_image "character.png" \
  --driven_audio "dialogue.wav" \
  --result_dir "./results"
```

### 参数说明
| 参数 | 作用 | 建议 |
|------|------|------|
| still | 减少头部运动 | 动漫角色用 |
| preprocess | 预处理模式 | crop/full |
| expression_scale | 表情幅度 | 0.5-1.5 |
| pose_style | 头部姿态风格 | 0-45 |

---

## 📋 Wav2Lip使用

### 基本命令
```bash
python inference.py \
  --checkpoint_path "wav2lip.pth" \
  --face "character.mp4" \
  --audio "dialogue.wav" \
  --outfile "result.mp4"
```

### 高质量模式
```bash
# 使用Wav2Lip_GAN获得更好效果
--checkpoint_path "wav2lip_gan.pth"
```

---

## 🔧 番剧制作工作流

### 准备阶段
```
1. 角色立绘/视频
   - 正面或3/4角度
   - 嘴部清晰可见
   - 表情中性

2. 配音音频
   - 清晰无杂音
   - WAV格式最佳
   - 单声道16kHz+
```

### 生成流程
```
【标准流程】
1. 准备角色图/视频
2. 准备配音音频
3. 选择合适工具
4. 调整参数生成
5. 检查同步效果
6. 后期微调
```

### 批量处理
```
【多角色对话】
1. 分离每个角色的音频
2. 准备各角色图像
3. 分别生成口型视频
4. 后期按时间轴组合
```

---

## 🎨 动漫角色适配

### 挑战
```
- 动漫风格夸张
- 口型简化
- 2D到3D映射困难
```

### 解决方案
```
【方法1：简化口型】
只需3-5种基本口型：
- 闭合 (M/B/P)
- 小开 (A/E/I)
- 大开 (O/U)
- 中间态

【方法2：表情图组合】
预制多组表情图
按音频节奏切换
传统动画方式
```

### SadTalker动漫设置
```bash
python inference.py \
  --source_image "anime_char.png" \
  --driven_audio "voice.wav" \
  --still \  # 减少头部运动
  --preprocess crop \
  --expression_scale 0.8  # 适度表情
```

---

## ⚡ 质量优化

### 输入图像要求
| 要素 | 要求 |
|------|------|
| 分辨率 | 512×512以上 |
| 角度 | 正面或轻微侧面 |
| 嘴部 | 清晰可见 |
| 背景 | 简洁最佳 |
| 光线 | 均匀无强阴影 |

### 音频处理
```
【预处理】
- 去除背景噪音
- 规范化音量
- 确保清晰度

【工具】
Audacity（免费）
Adobe Audition（专业）
```

### 后处理
```
1. 检查同步时间点
2. 修复明显错误帧
3. 平滑过渡
4. 添加微表情增强
```

---

## 📋 常见音素对应

| 音素 | 口型 | 视觉特征 |
|------|------|----------|
| A/あ | 大开 | 嘴巴大张 |
| I/い | 微笑状 | 嘴角横拉 |
| U/う | 嘟嘴 | 嘴唇前突 |
| E/え | 中开 | 嘴巴中等张开 |
| O/お | 圆形 | 嘴唇成圆形 |
| M/B/P | 闭合 | 双唇闭合 |
| F/V | 咬唇 | 上齿咬下唇 |

---

## ⚠️ 常见问题

| 问题 | 解决 |
|------|------|
| 嘴型不匹配 | 检查音频质量 |
| 变形失真 | 使用更高分辨率 |
| 不自然 | 降低expression_scale |
| 头部乱动 | 启用still模式 |
| 边缘问题 | 调整crop参数 |

---

## 💡 替代方案

### Live2D口型
```
使用Live2D Cubism
预设口型参数
音频驱动参数变化
更适合2D动画
```

### 手动关键帧
```
传统动画方式
重要台词手动制作
配合自动生成
```

---

*Skill版本: 1.0*
*适用: SadTalker/Wav2Lip等*
*创建时间: 2026-02-14*
