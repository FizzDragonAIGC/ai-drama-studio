# 🎬 图生视频（Image to Video）Skill
> 来源：Runway/Pika/SVD技术实践

---

## 📐 图生视频概念

| 概念 | 说明 |
|------|------|
| 定义 | 将静态图片动态化 |
| 优势 | 更好的一致性控制 |
| 核心 | 关键帧+动作描述 |

---

## 🎯 主流工具

| 工具 | 特点 | 适用 |
|------|------|------|
| Runway Gen-3 | 质量高 | 专业制作 |
| Pika | 简单易用 | 快速预览 |
| Stable Video Diffusion | 开源 | 本地运行 |
| Kling | 长时长 | 国风内容 |
| Luma Dream Machine | 效果好 | 通用 |

---

## 🎬 工作流程

### 1. 关键帧准备
```
【要求】
- 高分辨率（1024+）
- 清晰无噪点
- 主体明确
- 适合动态化的构图
```

### 2. 动作描述
```
【结构】
[主体动作] + [次要运动] + [镜头运动]

【示例】
character gently turns head,
hair flowing in wind,
slow zoom in on face
```

### 3. 参数设置
```
Motion强度：控制动作幅度
Duration：视频时长
CFG：遵循提示的程度
Seed：随机种子（可复现）
```

---

## 📋 动作类型分类

### 人物动作
| 类型 | 描述词 |
|------|--------|
| 微表情 | subtle expression change, blinking |
| 头部 | head turn, nodding, looking around |
| 身体 | breathing, swaying, walking |
| 手势 | hand movement, pointing |
| 头发 | hair flowing, wind blown hair |

### 环境动作
| 类型 | 描述词 |
|------|--------|
| 风 | wind effect, leaves blowing |
| 水 | water rippling, flowing |
| 光 | light flickering, sun rays moving |
| 粒子 | particles floating, dust motes |
| 云 | clouds drifting, sky moving |

### 镜头运动
| 运动 | 描述词 |
|------|--------|
| 推近 | zoom in, push in, dolly forward |
| 拉远 | zoom out, pull back |
| 横移 | pan left/right, tracking |
| 环绕 | orbit, circling |
| 升降 | crane up/down |

---

## 🔧 番剧制作应用

### 角色动态
```
【静态立绘→呼吸动态】
提示词：
subtle breathing motion, gentle swaying,
hair slightly moving, blinking eyes,
very subtle movement, anime style

Motion: 2-4（低强度保持稳定）
```

### 背景动态
```
【场景图→环境氛围】
提示词：
gentle wind through trees,
clouds slowly moving,
light rays shifting,
ambient motion, peaceful

Motion: 3-5
```

### 特效场景
```
【特效图→动态特效】
提示词：
magic particles swirling,
energy flowing, glowing effect,
dynamic movement

Motion: 5-7（高强度强调动态）
```

---

## 🎨 Stable Video Diffusion

### 本地运行设置
```
【ComfyUI节点】
SVD_img2vid
输入：图像 + Motion Bucket
输出：视频帧序列

【参数】
motion_bucket_id: 127（动作强度）
fps: 6-14
frames: 14-25
```

### 优化技巧
```
【提升稳定性】
- 降低motion_bucket_id
- 使用高质量输入图
- 固定seed复现

【增强动态】
- 提高motion_bucket_id
- 增加帧数
- 后期插帧
```

---

## ⚡ 质量优化

### 输入图优化
```
【推荐】
- 构图留有动态空间
- 主体不要太靠边
- 表情/姿势处于可动起点
- 避免复杂纹理（易闪烁）
```

### 后处理
```
1. 生成多个版本选择最佳
2. 用视频编辑软件裁剪
3. 需要时添加转场
4. 统一调色
5. 可用插帧工具提高流畅度
```

---

## 📋 常用组合

### 对话场景
```
关键帧：角色半身像
动作：subtle talking motion, gentle gestures
镜头：static or very slow push in
Motion: 3-4
```

### 走路场景
```
关键帧：角色行走姿态
动作：walking forward, body moving
镜头：tracking shot, following
Motion: 5-6
```

### 情绪场景
```
关键帧：情绪表情
动作：emotional expression, tear falling
镜头：slow zoom in
Motion: 2-3
```

---

## ⚠️ 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| 角色变形 | Motion太高 | 降低强度 |
| 闪烁 | 纹理复杂 | 简化输入图 |
| 不动 | Motion太低 | 提高强度+明确描述 |
| 背景动太多 | 全局Motion | 局部遮罩控制 |

---

## 💡 进阶技巧

### 多段拼接
```
1. 生成多个短片段
2. 确保动作能衔接
3. 后期smooth transition
4. 添加音效增强连续性
```

### 局部控制（Pika）
```
使用Modify Region：
1. 画出要动的区域
2. 只描述该区域动作
3. 其他区域保持静止
```

---

*Skill版本: 1.0*
*适用: 主流图生视频平台*
*创建时间: 2026-02-14*
