# 🖼️ 图生图（Image to Image）Skill
> 来源：Stable Diffusion img2img技术实践

---

## 📐 img2img原理

| 概念 | 说明 |
|------|------|
| 定义 | 以图像为基础生成新图像 |
| 原理 | 参考图加噪后重新去噪 |
| 核心 | Denoising控制参考程度 |

---

## 🎯 应用场景

| 场景 | Denoising | 说明 |
|------|-----------|------|
| 微调细节 | 0.2-0.4 | 保持大部分原图 |
| 风格转换 | 0.5-0.7 | 改变风格保持结构 |
| 重新诠释 | 0.7-0.9 | 仅参考构图 |
| 草图上色 | 0.5-0.7 | 线稿变精致 |

---

## 🎬 参数详解

### Denoising Strength
```
0.0 = 完全保留原图
0.5 = 平衡状态
1.0 = 完全忽略原图

【公式】
实际步数 = 总步数 × Denoising
```

### 分辨率
```
【建议】
与原图保持相同比例
可以适当放大

【注意】
差距过大可能变形
使用Hi-Res Fix更好
```

---

## 📋 工作流程

### 基础流程
```
1. 上传参考图
2. 调整分辨率
3. 设置Denoising
4. 编写提示词
5. 生成
```

### 提示词策略
| Denoising | 提示词策略 |
|-----------|------------|
| 低(0.2-0.4) | 描述想要改变的细节 |
| 中(0.5-0.6) | 完整描述目标图像 |
| 高(0.7-0.9) | 描述完全新的内容 |

---

## 🔧 番剧制作应用

### 草图精致化
```
【输入】粗略草图
【Denoising】0.5-0.6
【提示词】
detailed anime illustration,
clean lines, professional quality,
[场景/角色描述]
```

### 姿势参考
```
【输入】简笔画姿势
【Denoising】0.7-0.8
【提示词】
[角色描述], [姿势], 
high quality anime art
```

### 色调调整
```
【输入】原始图
【Denoising】0.2-0.3
【提示词】
same scene, [新的光线/色调],
[时间变化，如golden hour]
```

### 增加细节
```
【输入】简单图
【Denoising】0.3-0.5
【提示词】
highly detailed, intricate details,
enhanced textures, refined
```

---

## 🎨 配合ControlNet

### 结构保持
```
img2img + ControlNet Depth
保持空间结构的同时改变内容

设置：
- Denoising: 0.6-0.8
- ControlNet Weight: 0.5-0.7
```

### 姿势迁移
```
img2img + ControlNet OpenPose
参考图片提取姿势应用到新图

设置：
- 从参考图提取pose
- Denoising: 0.7-0.9
- 提示词描述新角色
```

### 线稿上色
```
img2img + ControlNet Lineart
保持线稿轮廓，添加颜色和细节

设置：
- ControlNet Lineart Weight: 0.8
- Denoising: 0.5-0.7
- 提示词描述颜色
```

---

## ⚡ 批量处理

### 批量img2img
```
【场景】多张图统一风格

【设置】
1. 准备图片文件夹
2. 使用Batch processing
3. 统一Denoising和提示词
4. 批量生成
```

### 输出管理
```
建议输出结构：
/output
  /original（原图备份）
  /processed（处理后）
  /selected（精选）
```

---

## 💡 高级技巧

### 迭代优化
```
对结果不满意时：
上一结果 → 新输入 → 微调
逐步逼近理想效果
```

### Loopback
```
启用Loopback脚本
自动将结果作为下一轮输入
设置迭代次数和Denoising递减
```

### 参考多图
```
使用Reference Only或IP-Adapter
可参考多张图的不同特征
```

---

## ⚠️ 常见问题

| 问题 | 解决 |
|------|------|
| 变化太小 | 提高Denoising |
| 变化太大 | 降低Denoising |
| 结构丢失 | 配合ControlNet |
| 风格不一致 | 使用Style LoRA |
| 色调偏移 | 检查模型和VAE |

---

## 📋 速查表

| 目标 | Denoising | ControlNet |
|------|-----------|------------|
| 细微调整 | 0.2-0.3 | 不需要 |
| 上色 | 0.5-0.6 | Lineart |
| 风格转换 | 0.5-0.7 | 可选Depth |
| 姿势参考 | 0.7-0.8 | OpenPose |
| 构图参考 | 0.8-0.9 | Scribble |

---

*Skill版本: 1.0*
*适用: Stable Diffusion WebUI*
*创建时间: 2026-02-14*
