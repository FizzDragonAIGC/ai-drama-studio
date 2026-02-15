# 🟩 绿幕技术 Skill
> AI番剧制作 - 绿幕抠像与合成

---

## 📐 绿幕基础

| 概念 | 说明 | 应用 |
|------|------|------|
| **色键抠像** | 基于颜色分离前后景 | 角色提取 |
| **绿幕** | 最常用背景色 | 与肤色对比明显 |
| **蓝幕** | 金发角色适用 | 特定场景 |
| **溢色** | 绿色反射到主体 | 需要处理 |
| **边缘细节** | 头发丝等细节 | 精细抠像 |

---

## 🎯 AI生成绿幕素材

### 绿幕角色Prompt
```
[character description], 
standing on green screen background,
solid chroma green background, #00FF00,
studio lighting, even illumination,
full body shot, clear edges,
no green clothing, high contrast
```

### 参数设置
| 要素 | 建议 |
|------|------|
| 背景色 | 纯绿 #00FF00 |
| 光线 | 均匀无阴影 |
| 服装 | 避免绿色 |
| 边缘 | 清晰锐利 |

---

## 🔧 抠像技术

### 抠像质量检查
| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 边缘锯齿 | 对比度不足 | 增加边缘清晰度 |
| 绿色溢出 | 反光 | 去溢色处理 |
| 头发丢失 | 细节不足 | 精细遮罩 |
| 半透明区域 | 阈值过高 | 调整容差 |

### 去溢色Prompt
```
[character], neutral lighting,
no color spill, clean edges,
studio photography, white balance corrected
```

---

## 📋 绿幕拍摄要点

### 光线设置
| 光源 | 作用 | 注意事项 |
|------|------|----------|
| 背景光 | 均匀照亮绿幕 | 无阴影无热点 |
| 主光 | 照亮主体 | 与场景光匹配 |
| 补光 | 消除阴影 | 柔和自然 |
| 轮廓光 | 分离主体 | 增强边缘 |

### 常见错误
- ❌ 绿幕光线不均
- ❌ 主体离绿幕太近
- ❌ 穿绿色服装
- ❌ 过度曝光

---

## 🎬 合成流程

```
【绿幕合成步骤】

1. 抠像
   ├─ 粗略抠图
   └─ 边缘细化

2. 去溢色
   ├─ 检测绿色溢出
   └─ 颜色校正

3. 背景合成
   ├─ 放置新背景
   └─ 调整位置比例

4. 光影匹配
   ├─ 统一光源方向
   └─ 添加接触阴影

5. 色彩统一
   ├─ 匹配色温
   └─ 统一对比度

6. 边缘融合
   ├─ 轻微模糊
   └─ 环境光溢出
```

---

## 🎨 替代背景类型

| 背景类型 | Prompt关键词 |
|----------|-------------|
| 自然风景 | natural landscape, outdoor scene |
| 城市场景 | urban environment, cityscape |
| 室内空间 | interior space, room setting |
| 奇幻世界 | fantasy world, magical realm |
| 科幻场景 | sci-fi environment, futuristic |
| 抽象背景 | abstract background, color gradient |

---

*Skill版本: 1.0*
*分类: VFX特效*
*创建时间: 2026-02-14*
