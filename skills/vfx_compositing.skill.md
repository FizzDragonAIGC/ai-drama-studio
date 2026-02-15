# 🎬 VFX合成技术 Skill
> AI番剧制作 - 视觉特效合成

---

## 📐 合成基础概念

| 概念 | 说明 | AI应用 |
|------|------|--------|
| **图层叠加** | 多层画面组合 | 分层生成后合并 |
| **遮罩** | 选择性显示区域 | 精确区域控制 |
| **混合模式** | 图层交互方式 | 光效叠加方式 |
| **色彩匹配** | 统一色调 | 风格一致性 |
| **边缘融合** | 消除合成痕迹 | 自然过渡 |

---

## 🎯 合成类型

### 前景/背景合成
| 类型 | 说明 | Prompt关键词 |
|------|------|-------------|
| 角色+场景 | 人物置入背景 | character in environment |
| 多层景深 | 前中后景 | foreground, midground, background |
| 天空替换 | 更换天空 | sky replacement, dramatic sky |
| 地面扩展 | 场景延伸 | environment extension |

### 特效合成
| 类型 | 说明 | Prompt关键词 |
|------|------|-------------|
| 魔法光效 | 能量特效 | magical glow, energy effects |
| 爆炸火焰 | 破坏效果 | explosion overlay, fire composite |
| 烟雾氛围 | 气氛营造 | smoke atmosphere, fog layer |
| 粒子效果 | 飘散元素 | particle effects, sparkles |

---

## 🔧 合成工作流程

```
【合成流程】

1. 素材准备
   └─ 分层生成各元素
   
2. 基础合成
   └─ 按景深排列图层
   
3. 遮罩处理
   └─ 精确边缘抠像
   
4. 色彩统一
   └─ 调整各层色调
   
5. 光影匹配
   └─ 统一光源方向
   
6. 细节融合
   └─ 消除合成痕迹
   
7. 最终调色
   └─ 整体氛围调整
```

---

## 📋 混合模式参考

| 混合模式 | 效果 | 适用场景 |
|----------|------|----------|
| 正常 | 直接覆盖 | 基础叠加 |
| 滤色 | 提亮 | 光效、火焰 |
| 叠加 | 增强对比 | 纹理叠加 |
| 柔光 | 轻微增强 | 柔和光效 |
| 正片叠底 | 变暗 | 阴影、暗角 |
| 颜色减淡 | 强烈提亮 | 发光效果 |

---

## 🎨 AI合成Prompt模板

### 场景合成
```
[character description], standing in [environment],
[lighting condition], [atmosphere],
seamless composite, photorealistic integration,
matched lighting, color graded
```

### 特效合成
```
[base scene], with [effect type] overlay,
[effect color] glow, volumetric light,
cinematic composition, VFX composite,
realistic integration
```

---

## 💡 合成技巧

### 透视匹配
- 保持消失点一致
- 人物比例符合场景
- 光影方向统一

### 色彩融合
- 使用统一LUT
- 匹配白平衡
- 统一饱和度

### 边缘处理
- 轻微羽化
- 环境光溢出
- 景深模糊

---

*Skill版本: 1.0*
*分类: VFX特效*
*创建时间: 2026-02-14*
