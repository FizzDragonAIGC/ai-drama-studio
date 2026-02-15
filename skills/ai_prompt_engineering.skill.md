# 🖼️ AI图像/视频Prompt工程 Skill
> 适用于：Midjourney / Stable Diffusion / DALL-E / Runway / Kling

---

## 📐 Prompt结构公式

### 基础公式
```
[主体] + [环境] + [风格] + [技术参数]
```

### 完整公式
```
[主体描述], [动作/姿势], [服装/外观], 
[环境/背景], [光线/氛围], 
[艺术风格], [镜头/构图], 
[质量词], [参数]
```

---

## 🎯 主体描述 (Subject)

### 人物描述
| 要素 | 示例 |
|------|------|
| 年龄 | young woman, elderly man, teenage boy |
| 外貌 | beautiful, handsome, weathered face |
| 表情 | smiling, crying, determined look |
| 发型 | long black hair, bald, curly red hair |
| 体型 | slim, muscular, petite |

### 动作/姿势
| 类型 | 示例 |
|------|------|
| 静态 | standing, sitting, lying down |
| 动态 | running, jumping, fighting |
| 情感 | crying, laughing, screaming |
| 交互 | holding hands, hugging, facing each other |

### 服装
| 时代 | 示例 |
|------|------|
| 古代中国 | Tang dynasty clothing, hanfu, ancient Chinese robes |
| 古代欧洲 | Victorian dress, medieval armor |
| 现代 | business suit, casual clothes, streetwear |
| 未来 | futuristic suit, cyberpunk outfit |

---

## 🌍 环境描述 (Environment)

### 自然环境
| 场景 | Prompt |
|------|--------|
| 森林 | dense forest, misty woods, enchanted forest |
| 海洋 | vast ocean, stormy sea, calm waters |
| 山脉 | snow-capped mountains, rocky peaks |
| 沙漠 | endless desert, sand dunes |
| 天空 | dramatic sky, starry night, sunset clouds |

### 人造环境
| 场景 | Prompt |
|------|--------|
| 城市 | modern city, ancient town, cyberpunk city |
| 室内 | cozy room, dark dungeon, grand palace |
| 街道 | busy street, empty alley, night market |

### 历史场景（中国）
| 朝代 | 典型场景 |
|------|----------|
| 唐代 | Tang dynasty Chang'an, ancient Chinese marketplace, Tang palace |
| 宋代 | Song dynasty tea house, ancient Chinese garden |
| 明清 | Forbidden City, traditional Chinese courtyard |

---

## 🎨 艺术风格 (Style)

### 绘画风格
| 风格 | Prompt |
|------|--------|
| 油画 | oil painting, classical painting |
| 水彩 | watercolor, soft watercolor |
| 水墨 | Chinese ink painting, sumi-e |
| 素描 | pencil sketch, charcoal drawing |
| 动漫 | anime style, manga art |
| 3D | 3D render, CGI, digital art |

### 电影风格
| 风格 | Prompt |
|------|--------|
| 电影感 | cinematic, film still, movie scene |
| 写实 | photorealistic, hyperrealistic |
| 复古 | vintage, retro, 1980s aesthetic |
| 黑色电影 | film noir, dramatic shadows |
| 史诗 | epic, grand scale, dramatic |

### 特殊风格
| 风格 | Prompt |
|------|--------|
| 赛博朋克 | cyberpunk, neon lights, dystopian |
| 蒸汽朋克 | steampunk, Victorian technology |
| 奇幻 | fantasy, magical, ethereal |
| 恐怖 | horror, dark, ominous |
| 梦幻 | dreamy, surreal, ethereal |

---

## 📷 镜头/构图 (Camera)

### 景别
| 景别 | Prompt |
|------|--------|
| 大远景 | extreme wide shot, establishing shot |
| 远景 | wide shot, full body shot |
| 中景 | medium shot, waist up |
| 近景 | close-up, portrait |
| 特写 | extreme close-up, detail shot |

### 角度
| 角度 | Prompt |
|------|--------|
| 平视 | eye level, straight angle |
| 俯视 | high angle, bird's eye view, top down |
| 仰视 | low angle, worm's eye view |
| 荷兰角 | dutch angle, tilted |

### 构图
| 构图 | Prompt |
|------|--------|
| 中心 | centered composition |
| 三分法 | rule of thirds |
| 对称 | symmetrical composition |
| 引导线 | leading lines |
| 框架 | framed composition |

---

## 💡 光线描述 (Lighting)

| 光线类型 | Prompt |
|----------|--------|
| 自然光 | natural lighting, daylight |
| 黄金时刻 | golden hour, warm sunlight |
| 蓝调时刻 | blue hour, twilight |
| 逆光 | backlit, silhouette, rim lighting |
| 侧光 | side lighting, dramatic shadows |
| 霓虹 | neon lighting, colorful lights |
| 烛光 | candlelight, warm glow |
| 月光 | moonlight, night scene |
| 柔光 | soft lighting, diffused light |
| 硬光 | hard lighting, harsh shadows |
| 体积光 | volumetric lighting, god rays |

---

## ✨ 质量词 (Quality Boosters)

### 通用质量词
```
masterpiece, best quality, highly detailed, 
sharp focus, 8k, ultra HD, professional
```

### MJ专用
```
--v 6 --ar 16:9 --q 2 --s 750
```

### 负面提示（SD）
```
Negative: blurry, low quality, distorted, 
ugly, deformed, extra limbs, bad anatomy
```

---

## 🎬 视频Prompt (Runway/Kling)

### 运动描述
| 运动 | Prompt |
|------|--------|
| 镜头推进 | camera pushes in, dolly in |
| 镜头拉远 | camera pulls out, dolly out |
| 横摇 | camera pans left/right |
| 跟随 | camera follows the subject |
| 环绕 | camera orbits around |
| 升降 | crane shot up/down |

### 主体运动
| 运动 | Prompt |
|------|--------|
| 走路 | walking slowly, strolling |
| 跑步 | running, sprinting |
| 转身 | turning around, looking back |
| 风吹 | hair blowing in wind, clothes fluttering |
| 表情变化 | expression changes, starts smiling |

---

## 📋 分镜Prompt模板

### 静态画面（MJ/SD）
```
[角色]: [外貌描述], [服装], [表情], [动作]
[环境]: [场景描述], [时间], [天气]
[风格]: [艺术风格], cinematic
[镜头]: [景别], [角度], [构图]
[光线]: [光线类型], [色调]
[质量]: masterpiece, highly detailed, 8k
```

### 动态画面（Runway/Kling）
```
[开始状态]: [描述]
[动作]: [camera + 主体运动]
[结束状态]: [描述]
[风格]: cinematic, professional
[时长]: 4s
```

---

## 🔧 常见问题修复

| 问题 | 解决方案 |
|------|----------|
| 手指变形 | 添加 "perfect hands, detailed fingers" |
| 面部模糊 | 添加 "detailed face, sharp features" |
| 比例失调 | 添加 "correct proportions, anatomically correct" |
| 风格不一致 | 添加具体艺术家/风格参考 |
| 背景杂乱 | 添加 "simple background" 或 "clean background" |

---

## 🎯 番剧分镜Prompt示例

### 示例1：唐代广州港口（远景）
```
Tang dynasty Guangzhou port, ancient Chinese ships, 
busy marketplace, merchants from different countries, 
exotic goods, morning mist, golden hour lighting,
wide shot, cinematic, oil painting style,
highly detailed, 8k, masterpiece
--ar 16:9 --v 6
```

### 示例2：人物特写（情感）
```
Young Chinese man with determined eyes, 
Tang dynasty clothing, weathered face,
close-up portrait, dramatic side lighting,
cinematic, film still, shallow depth of field,
masterpiece, 8k
--ar 3:4 --v 6
```

### 示例3：动作场景（视频）
```
Camera follows a young man running through 
ancient Chinese marketplace, crowds parting,
Tang dynasty setting, morning light,
cinematic tracking shot, 4s
```

---

*Skill版本: 1.0*
*来源: MJ/SD/Runway最佳实践*
*创建时间: 2026-02-14*
