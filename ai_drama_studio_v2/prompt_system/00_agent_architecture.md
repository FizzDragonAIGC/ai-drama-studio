# 🎬 Prompt生成智能体系统架构

## 系统目标
将故事/剧本 → 转化为可直接用于AI生成的专业级Prompt

## 输出目标
- **图像Prompt**：Midjourney / Stable Diffusion / Flux / DALL-E
- **视频Prompt**：Runway / Kling / Pika / Sora
- **音乐Prompt**：Suno / Udio
- **音效Prompt**：ElevenLabs / 音效库描述

---

# 智能体总览

## 系统流程图

```
用户输入
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│  第一层：理解层（解析输入）                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ 故事分析师   │  │ 人物提取师  │  │ 场景提取师   │          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
└─────────┼────────────────┼────────────────┼─────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│  第二层：设计层（创意决策）                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ 视觉导演    │  │ 分镜设计师  │  │ 音乐总监    │          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
└─────────┼────────────────┼────────────────┼─────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│  第三层：执行层（Prompt生成）                                 │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐   │
│  │图像Prompt │ │视频Prompt │ │音乐Prompt │ │音效Prompt │   │
│  │  专家     │ │  专家     │ │  专家     │ │  专家     │   │
│  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘   │
└────────┼─────────────┼─────────────┼─────────────┼──────────┘
         │             │             │             │
         ▼             ▼             ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│  第四层：优化层（质量控制）                                   │
│  ┌─────────────┐  ┌─────────────┐                           │
│  │ 一致性检查  │  │ Prompt优化  │                           │
│  └─────────────┘  └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
    最终Prompt输出
```

---

# 详细智能体设计

## 第一层：理解层（3个智能体）

### 1. 故事分析师 (Story Analyst)

**职责**：理解故事的核心要素

**输入**：
- 用户输入的故事/剧本文本
- 用户指定的风格偏好（可选）
- 用户指定的时代背景（可选）

**输出**：
```json
{
  "title": "边城",
  "genre": ["爱情", "文艺", "悲剧"],
  "era": "民国1920年代",
  "location": "湘西茶峒",
  "mood": ["宁静", "忧伤", "纯真"],
  "themes": ["爱情的错过", "命运的无常", "等待与希望"],
  "narrative_structure": "三幕剧",
  "total_duration": "60分钟",
  "episode_count": 6,
  "chapter_breakdown": [
    {"chapter": 1, "summary": "介绍茶峒...", "duration": "10min"}
  ]
}
```

---

### 2. 人物提取师 (Character Extractor)

**职责**：提取并深度分析每个人物

**输入**：
- 故事分析师的输出
- 原文文本

**输出**：
```json
{
  "characters": [
    {
      "id": "cuicui",
      "name": "翠翠",
      "role": "protagonist",
      "age": "15-16",
      "gender": "female",
      
      "visual_description": {
        "face": "圆润清秀，皮肤微黑",
        "hair": "黑色长辫，红绳扎",
        "body": "纤细灵动",
        "clothing": {
          "daily": "蓝布短衫、黑布裤",
          "formal": "蓝印花布衣裳"
        },
        "accessories": ["红绳手链", "银耳环（节日）"],
        "color_palette": ["靛蓝", "黑色", "素白"]
      },
      
      "expression_patterns": {
        "happy": "眼睛弯成月牙，露出酒窝",
        "sad": "低头不语，眼眶发红",
        "shy": "脸红低头，咬下唇",
        "angry": "撅嘴，扭头跑开"
      },
      
      "movement_patterns": {
        "idle": "玩辫子，发呆看水",
        "nervous": "手指绞在一起",
        "happy": "轻快小跑，像小鹿"
      }
    }
  ]
}
```

---

### 3. 场景提取师 (Scene Extractor)

**职责**：提取并描述所有场景

**输入**：
- 故事分析师的输出
- 原文文本

**输出**：
```json
{
  "scenes": [
    {
      "id": "ferry_crossing",
      "name": "渡口",
      "type": "exterior",
      "time_of_day": ["dawn", "day", "dusk", "night"],
      
      "environment": {
        "geography": "溪边，靠近白塔",
        "vegetation": "竹林、芭茅草",
        "water": "清澈溪水，可见河底石子",
        "architecture": "简朴木屋，渡船"
      },
      
      "props": ["渡船", "竹篙", "缆绳", "白塔", "石阶"],
      
      "atmosphere": {
        "sound": ["水流声", "鸟鸣", "竹叶沙沙"],
        "smell": "泥土、青草、河水",
        "lighting": "自然光，晨雾或夕阳"
      },
      
      "color_palette": ["青绿", "土黄", "湖蓝", "晨雾白"],
      
      "visual_reference": "参考侯孝贤电影《刺客聂隐娘》的自然光影"
    }
  ]
}
```

---

## 第二层：设计层（3个智能体）

### 4. 视觉导演 (Visual Director)

**职责**：决定整体视觉风格和调性

**输入**：
- 故事分析师输出
- 场景提取师输出
- 用户的风格偏好（可选）

**输出**：
```json
{
  "visual_style": {
    "overall_aesthetic": "诗意写实",
    "reference_directors": ["侯孝贤", "李安", "宫崎骏"],
    "reference_films": ["刺客聂隐娘", "卧虎藏龙"],
    
    "color_grading": {
      "primary": "低饱和度自然色调",
      "shadows": "偏青绿",
      "highlights": "暖黄",
      "contrast": "中等偏低"
    },
    
    "lighting_philosophy": {
      "primary": "自然光为主",
      "key_moments": "晨昏光线",
      "night": "月光+油灯暖光"
    },
    
    "camera_philosophy": {
      "movement": "缓慢、克制",
      "framing": "大量留白，人物在环境中",
      "depth": "深焦为主，情绪时刻浅焦"
    },
    
    "aspect_ratio": "2.35:1 宽银幕",
    
    "era_accuracy": {
      "allowed": ["木器", "竹器", "陶器", "棉麻布"],
      "forbidden": ["塑料", "电器", "现代布料"]
    }
  }
}
```

---

### 5. 分镜设计师 (Storyboard Designer)

**职责**：为每个镜头设计具体参数

**输入**：
- 视觉导演的风格指南
- 人物提取师的人物数据
- 场景提取师的场景数据
- 当前章节/集的剧本

**输出**：
```json
{
  "shots": [
    {
      "shot_id": "BC-E01-S001",
      "timecode": "00:00-00:08",
      "duration": 8,
      
      "content": {
        "description": "晨雾中的渡口全景，白塔若隐若现",
        "action": "空镜，河面雾气飘动",
        "characters": [],
        "dialogue": null
      },
      
      "camera": {
        "shot_type": "extreme_wide",
        "angle": "eye_level",
        "movement": "static",
        "lens": "35mm",
        "focus": "deep"
      },
      
      "lighting": {
        "time": "dawn",
        "key": "soft natural",
        "mood": "ethereal"
      },
      
      "emotion": {
        "type": "peaceful",
        "intensity": 3,
        "layer": "narrative"
      },
      
      "composition": {
        "rule": "rule_of_thirds",
        "subject_position": "center-right",
        "negative_space": "left (fog)"
      }
    }
  ]
}
```

---

### 6. 音乐总监 (Music Director)

**职责**：设计每个镜头/场景的音乐方案

**输入**：
- 故事分析师的情绪分析
- 分镜设计师的镜头列表
- 视觉导演的整体调性

**输出**：
```json
{
  "music_design": {
    "overall_style": {
      "genre": "中国民族风+现代配乐",
      "primary_instruments": ["二胡", "笛子", "古筝", "钢琴"],
      "mood": "苍凉、悠远、抒情"
    },
    
    "themes": [
      {
        "name": "翠翠主题",
        "description": "清澈、天真、带一点忧伤",
        "instruments": "笛子主奏，古筝点缀",
        "tempo": "中慢 BPM 70"
      },
      {
        "name": "爱情主题",
        "description": "朦胧、甜蜜、青涩",
        "instruments": "二胡+钢琴",
        "tempo": "慢 BPM 60"
      }
    ],
    
    "shot_music": [
      {
        "shot_id": "BC-E01-S001",
        "music_cue": {
          "type": "ambient",
          "description": "极淡的环境音，风声，远处水声",
          "instruments": "none (ambient only)",
          "dynamics": "pp (极弱)"
        }
      }
    ]
  }
}
```

---

## 第三层：执行层（4个智能体）

### 7. 图像Prompt专家 (Image Prompt Expert)

**职责**：生成各平台的图像Prompt

**输入**：
- 分镜设计师的镜头数据
- 人物提取师的人物视觉数据
- 场景提取师的场景数据
- 视觉导演的风格指南

**输出**：
```json
{
  "shot_id": "BC-E01-S015",
  
  "prompts": {
    "midjourney": {
      "v6": "young Chinese girl, 15 years old, Miao ethnicity, black long braid with red ribbon, blue traditional cloth shirt, standing at wooden ferry dock, misty river morning, white pagoda in background, Hunan province 1920s, soft natural lighting, Hou Hsiao-hsien cinematography style, watercolor atmosphere, peaceful mood --ar 21:9 --v 6 --s 250",
      
      "niji": "少女, 中国风, 蓝色布衣, 长辫子, 河边渡口, 清晨薄雾, 白塔, 水墨画风格, 宁静氛围 --niji 6 --ar 21:9"
    },
    
    "stable_diffusion": {
      "positive": "1girl, chinese traditional, blue hanfu, long black braid, red hair ribbon, standing on wooden dock, misty river, white pagoda background, rural China, 1920s, morning light, soft lighting, cinematic, masterpiece, best quality, intricate details",
      
      "negative": "modern clothes, plastic, electricity, cars, buildings, ugly, deformed, blurry, low quality",
      
      "model": "Realistic Vision v5 / majicMIX realistic",
      "sampler": "DPM++ 2M Karras",
      "steps": 30,
      "cfg": 7
    },
    
    "flux": "A young Chinese girl around 15 years old standing at a traditional wooden ferry crossing on a misty river at dawn. She wears a simple blue cloth shirt with her long black hair in a braid tied with a red ribbon. In the background, a white stone pagoda emerges from the morning mist. The scene captures the tranquil atmosphere of rural Hunan province in the 1920s. Soft, natural lighting creates a watercolor-like quality. Cinematographic style reminiscent of Hou Hsiao-hsien films.",
    
    "dalle": "A serene scene at a traditional Chinese ferry crossing during misty dawn. A 15-year-old girl in a blue traditional cloth shirt stands at the wooden dock, her long black braid tied with a red ribbon. Behind her, a white stone pagoda rises through the morning mist over a calm river. Rural Hunan province, 1920s China. Soft natural lighting, cinematic composition, watercolor atmosphere."
  }
}
```

---

### 8. 视频Prompt专家 (Video Prompt Expert)

**职责**：生成各平台的视频Prompt

**输入**：
- 图像Prompt专家的输出（作为首帧参考）
- 分镜设计师的运镜数据
- 镜头时长

**输出**：
```json
{
  "shot_id": "BC-E01-S015",
  "duration": 6,
  
  "prompts": {
    "runway_gen3": {
      "prompt": "A young Chinese girl in blue traditional clothes stands at a misty ferry dock. Camera slowly pushes in. Morning mist drifts across the river. Soft natural lighting. Peaceful atmosphere.",
      "motion": "slow push in",
      "camera_movement": "dolly forward",
      "motion_amount": 3
    },
    
    "kling": {
      "prompt": "少女站在河边渡口，蓝色布衣，长辫子。镜头缓慢推近。清晨薄雾飘动。宁静氛围。",
      "motion_mode": "standard",
      "camera": "push_in"
    },
    
    "pika": {
      "prompt": "young Chinese girl at misty ferry dock, blue clothes, slow camera push, morning atmosphere",
      "motion_guidance": "gentle fog movement, subtle hair movement",
      "camera_control": "slow dolly in"
    },
    
    "sora": {
      "prompt": "Cinematic shot of a 15-year-old Chinese girl standing at a traditional wooden ferry dock on a misty river at dawn. She wears a simple blue cloth shirt with her long black hair in a braid. The camera slowly pushes in towards her as morning mist drifts across the water. A white stone pagoda is visible in the background through the haze. The lighting is soft and natural, creating a dreamy, watercolor-like atmosphere. Style: Hou Hsiao-hsien cinematography.",
      "duration": "6 seconds",
      "aspect_ratio": "21:9"
    }
  }
}
```

---

### 9. 音乐Prompt专家 (Music Prompt Expert)

**职责**：生成音乐Prompt

**输入**：
- 音乐总监的设计
- 当前场景的情绪
- 时长需求

**输出**：
```json
{
  "shot_id": "BC-E01-S015",
  "scene": "渡口清晨",
  
  "prompts": {
    "suno": {
      "style": "Chinese traditional, ambient, cinematic score",
      "prompt": "Gentle Chinese folk melody with dizi flute, soft and melancholic, peaceful morning atmosphere, minimal arrangement, BPM 65, in G minor, cinematic, no vocals",
      "tags": ["instrumental", "chinese", "ambient", "cinematic", "peaceful"]
    },
    
    "udio": {
      "prompt": "Peaceful Chinese cinematic ambient music. Soft dizi flute playing a gentle melancholic melody. Occasional guzheng plucks. Minimal arrangement. Morning mist atmosphere. Traditional Chinese instruments. No percussion. Very soft dynamics. Suitable for film scene.",
      "style": "cinematic ambient",
      "mood": "peaceful, melancholic",
      "instruments": "dizi, guzheng",
      "tempo": "slow"
    }
  },
  
  "music_direction": {
    "entry": "fade in from silence",
    "dynamics": "pp → p",
    "duration": "loop for scene duration",
    "transition_to_next": "sustain, gentle fade"
  }
}
```

---

### 10. 音效Prompt专家 (SFX Prompt Expert)

**职责**：生成环境音和音效Prompt

**输入**：
- 场景提取师的场景数据
- 分镜设计师的镜头数据

**输出**：
```json
{
  "shot_id": "BC-E01-S015",
  
  "sfx_layers": {
    "ambient_bed": {
      "description": "River water flowing gently, distant birds chirping",
      "elevenlabs_prompt": "Peaceful river ambience with gentle water flow and occasional bird calls. Rural Chinese countryside morning. No traffic or modern sounds.",
      "freesound_tags": ["river", "water", "birds", "morning", "peaceful", "rural"]
    },
    
    "foley": [
      {
        "type": "footstep",
        "surface": "wooden dock",
        "character": "翠翠",
        "description": "Light barefoot steps on weathered wooden planks"
      }
    ],
    
    "spot_effects": [
      {
        "timecode": "00:03",
        "effect": "distant rooster crow",
        "volume": -20
      }
    ]
  },
  
  "mix_notes": {
    "ambient_level": "-15dB",
    "reverb": "natural outdoor, medium",
    "stereo_width": "wide"
  }
}
```

---

## 第四层：优化层（2个智能体）

### 11. 一致性检查员 (Consistency Checker)

**职责**：确保跨镜头的视觉/听觉一致性

**输入**：
- 所有智能体的输出

**检查项**：
```json
{
  "checks": {
    "character_consistency": {
      "翠翠": {
        "clothing": "确保同一场景内服装一致",
        "hair": "辫子位置和配饰一致",
        "expression_continuity": "情绪过渡自然"
      }
    },
    
    "scene_consistency": {
      "lighting": "同一场景时间内光线一致",
      "props": "道具位置连续",
      "background": "背景元素一致"
    },
    
    "style_consistency": {
      "color_grading": "全片色调一致",
      "aspect_ratio": "统一21:9",
      "quality_keywords": "所有prompt包含质量关键词"
    },
    
    "audio_consistency": {
      "music_theme": "同一场景使用相同主题",
      "ambient_bed": "场景内环境音连续"
    }
  },
  
  "flags": [
    {
      "shot_id": "BC-E01-S023",
      "issue": "翠翠服装从蓝色变成了绿色",
      "severity": "high",
      "suggestion": "统一为 'blue traditional cloth shirt'"
    }
  ]
}
```

---

### 12. Prompt优化师 (Prompt Optimizer)

**职责**：优化Prompt质量，适配不同平台

**输入**：
- 执行层的所有Prompt
- 一致性检查员的反馈

**优化方向**：
```json
{
  "optimization_rules": {
    "midjourney": {
      "max_length": 400,
      "must_include": ["--ar", "--v 6"],
      "style_keywords": ["cinematic", "8k", "detailed"],
      "avoid": ["blurry", "ugly", "deformed"]
    },
    
    "stable_diffusion": {
      "separate_negative": true,
      "weight_syntax": "(important:1.2)",
      "quality_tags": ["masterpiece", "best quality"]
    },
    
    "runway": {
      "max_length": 300,
      "motion_clarity": "明确指定运动方向",
      "avoid": "过于复杂的场景描述"
    },
    
    "suno": {
      "include_bpm": true,
      "include_key": true,
      "include_instruments": true,
      "avoid": "版权音乐参考"
    }
  },
  
  "batch_optimizations": [
    {
      "original": "a girl standing",
      "optimized": "young Chinese girl, 15 years old, standing gracefully",
      "reason": "增加细节避免随机性"
    }
  ]
}
```

---

# 数据流总结

```
┌──────────────────────────────────────────────────────────────┐
│                         用户输入                              │
│  • 故事/剧本文本                                              │
│  • 风格偏好（可选）                                           │
│  • 时代/地区（可选）                                          │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  第一层：理解层                                               │
│  故事分析师 ──→ 人物提取师 ──→ 场景提取师                     │
│       │              │              │                        │
│   故事结构        人物数据        场景数据                     │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  第二层：设计层                                               │
│  视觉导演 ────→ 分镜设计师 ────→ 音乐总监                     │
│       │              │              │                        │
│   风格指南        镜头列表        音乐设计                     │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  第三层：执行层                                               │
│  图像Prompt ─┬─ 视频Prompt ─┬─ 音乐Prompt ─┬─ 音效Prompt      │
│      │       │       │       │       │       │               │
│   MJ/SD/    │   Runway/    │   Suno/     │   音效           │
│   Flux/     │   Kling/     │   Udio      │   描述           │
│   DALL-E    │   Pika       │             │                   │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  第四层：优化层                                               │
│  一致性检查 ────→ Prompt优化                                  │
│       │               │                                       │
│   问题标记         最终Prompt                                 │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
                        最终输出
                    (JSON / Excel)
```

---

# 智能体数量总结

| 层级 | 智能体 | 数量 |
|------|--------|------|
| 理解层 | 故事分析师、人物提取师、场景提取师 | 3 |
| 设计层 | 视觉导演、分镜设计师、音乐总监 | 3 |
| 执行层 | 图像/视频/音乐/音效 Prompt专家 | 4 |
| 优化层 | 一致性检查、Prompt优化 | 2 |
| **总计** | | **12** |

---

# 可简化方案

如果资源有限，可以合并为 **6个智能体**：

| 智能体 | 合并内容 |
|--------|----------|
| 1. 故事理解 | 故事分析 + 人物提取 + 场景提取 |
| 2. 视觉设计 | 视觉导演 + 分镜设计 |
| 3. 音频设计 | 音乐总监 |
| 4. 图像Prompt | 图像专家 |
| 5. 视频Prompt | 视频专家 |
| 6. 音频Prompt | 音乐专家 + 音效专家 |

优化层可以用规则引擎替代智能体。
