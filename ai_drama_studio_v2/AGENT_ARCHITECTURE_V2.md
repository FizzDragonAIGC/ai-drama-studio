# AI番剧系统 智能体架构 V2

## 核心问题
- **maxSkills = 5** 限制每个智能体只能加载5个skill
- **280个skills** 大量技能无法被使用
- **需要层级化** 让专业智能体承载相关技能

---

## 🏗️ 新架构：三层智能体系统

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          🎬 FizzDragon AI番剧系统                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     📋 第一层：核心流程智能体 (8个)                    │   │
│  │                     (每个5 skills，主工作流触发)                      │   │
│  │                                                                       │   │
│  │  [🎤访谈] → [💡概念] → [📑章节] → [🎭角色] → [🎨美术] → [✍️剧本] → [🎥分镜] │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    ↓ 按需触发                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                   🎯 第二层：专业领域智能体 (16个)                     │   │
│  │                   (深度专业知识，特定场景触发)                         │   │
│  │                                                                       │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                  │   │
│  │  │ 📝编剧组 │  │ 🎬导演组 │  │ 🎨视觉组 │  │ 🤖AI平台 │                  │   │
│  │  ├─────────┤  ├─────────┤  ├─────────┤  ├─────────┤                  │   │
│  │  │中国剧本  │  │光影大师  │  │色彩大师  │  │MJ专家   │                  │   │
│  │  │好莱坞剧本│  │运镜大师  │  │特效大师  │  │可灵专家  │                  │   │
│  │  │番剧剧本  │  │动作导演  │  │漫画大师  │  │即梦专家  │                  │   │
│  │  │短剧剧本  │  │表演指导  │  │场景大师  │  │Flux专家  │                  │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    ↓ 类型特化                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                   🎭 第三层：类型片智能体 (12个)                       │   │
│  │                   (特定类型深度优化)                                   │   │
│  │                                                                       │   │
│  │  [动作] [悬疑] [爱情] [奇幻] [武侠] [仙侠] [喜剧] [恐怖]               │   │
│  │  [战争] [科幻] [犯罪] [剧情]                                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Skills合并计划

### 🔄 合并原则
1. **同类技能合并** - 把5-10个相关skill合并为1个超级skill
2. **保留核心方法论** - 确保书籍理论被保留
3. **减少冗余** - 删除重复内容

### 📝 编剧组 Skills 合并

| 原Skills (28个) | 合并为 | 新Skill |
|----------------|--------|---------|
| screenwriting_mcgee_story, screenwriting_save_the_cat, screenwriting_syd_field, screenwriting_sequence_approach, screenwriting_premise, screenwriting_conflict, screenwriting_subplot, screenwriting_scene_writing | 1 | `script_master_theory.skill.md` |
| screenwriting_action_lines, screenwriting_exposition, screenwriting_foreshadowing, screenwriting_payoff, screenwriting_flashback, screenwriting_montage, screenwriting_voiceover, screenwriting_opening, screenwriting_twist, screenwriting_adaptation | 1 | `script_techniques.skill.md` |
| script_action_lines, script_flashback, script_montage, script_scene_heading, script_subtext, script_transition, script_visual_writing, script_voiceover, script_writing_complete | 1 | `script_format_complete.skill.md` |
| dialogue_craft, tv_drama_writing | 1 | `script_dialogue_drama.skill.md` |

**合并后：28个 → 4个超级Skills**

### 🎭 角色组 Skills 合并

| 原Skills (22个) | 合并为 | 新Skill |
|----------------|--------|---------|
| character_design_* (18个) | 1 | `character_design_master.skill.md` ✅ 已有 |
| character_bible, character_appearance_table, character_relationship_map, pro_character_soul | 1 | `character_psychology_complete.skill.md` |

**合并后：22个 → 2个超级Skills**

### 🎬 导演组 Skills 合并

| 原Skills (30个) | 合并为 | 新Skill |
|----------------|--------|---------|
| directing_* (20个) | 1 | `directing_master.skill.md` |
| director_* (8个大师风格) | 1 | `director_styles.skill.md` |
| cinematography_*, camera_* | 1 | `cinematography_complete.skill.md` |

**合并后：30个 → 3个超级Skills**

### 🎨 视觉组 Skills 合并

| 原Skills (8个) | 保留/合并 | 说明 |
|----------------|----------|------|
| painting_with_light | ✅保留 | 核心书籍 |
| color_film_psychology | ✅保留 | 核心书籍 |
| color_and_light_gurney | ✅保留 | 核心书籍 |
| visual_story_structure | ✅保留 | 核心书籍 |
| lighting_aesthetic_master | ✅保留 | 综合光影 |
| lighting_cinematic, color_emotion, aesthetic_visual, art_styles_detailed | 1 | `visual_style_complete.skill.md` |

**合并后：8个 → 5个核心Skills**

### 🤖 AI平台 Skills 合并

| 原Skills (35个) | 合并为 | 新Skill |
|----------------|--------|---------|
| ai_midjourney, prompt_*, midjourney_sref_library | 1 | `platform_midjourney.skill.md` |
| ai_kling, ai_txt2video, ai_img2video, video_cinematic_camera | 1 | `platform_kling.skill.md` |
| jimeng_prompt_templates + 相关 | 1 | `platform_jimeng.skill.md` |
| ai_flux, ai_stable_diffusion | 1 | `platform_flux.skill.md` |
| ai_runway, ai_pika | 1 | `platform_runway.skill.md` |

**合并后：35个 → 5个平台Skills**

### 🎬 VFX Skills 合并

| 原Skills (15个) | 合并为 | 新Skill |
|----------------|--------|---------|
| vfx_* (15个) | 1 | `vfx_complete.skill.md` |

**合并后：15个 → 1个超级Skill**

### 🎯 类型片 Skills 合并

| 原Skills (12个) | 保留 | 说明 |
|----------------|------|------|
| genre_* (12个) | 各保留 | 类型片智能体各用1个 |

---

## 🔧 新智能体配置

### 第一层：核心流程智能体

```javascript
// 1. 访谈师 - 创意挖掘
interview: {
    skills: [
        'interview_master',          // 合并14个访谈skills
        'interview_hitchcock_truffaut', // 希区柯克访谈法
        'interview_metzler_creative',   // 创意访谈
        'interview_seidman_depth',      // 深度访谈
        'psychology_motivation'         // 角色心理
    ]
}

// 2. 概念生成器 - 高概念设计
concept: {
    skills: [
        'concept_high_concept',      // 高概念设计
        'hook_design',               // 钩子设计
        'addictive_design',          // 上瘾设计
        'viral_elements',            // 病毒传播
        'audience_persona'           // 受众画像
    ]
}

// 3. 章节规划师 - 集数规划
narrative: {
    skills: [
        'chapter_smart_allocation',   // 智能分配
        'chapter_savethecat_15beats', // 15节拍
        'chapter_mckee_sequence',     // McKee序列
        'chapter_hook_cliffhanger',   // 章末钩子
        'chapter_serialized_drama'    // 连载剧法
    ]
}

// 4. 角色设计师 - 人物设计
character: {
    skills: [
        'character_design_master',      // 角色设计大师(合并版)
        'character_psychology_complete', // 角色心理完整版
        'character_relationship_map',   // 关系图谱
        'pro_character_soul',           // 角色灵魂
        'body_language'                 // 肢体语言
    ]
}

// 5. 美术总监 - 视觉风格
artdirector: {
    skills: [
        'painting_with_light',       // Alton用光
        'color_film_psychology',     // 电影色彩心理
        'color_and_light_gurney',    // Gurney色彩
        'visual_story_structure',    // 视觉叙事结构
        'lighting_aesthetic_master'  // 综合光影美学
    ]
}

// 6. 编剧 - 剧本撰写
screenwriter: {
    skills: [
        'script_master_theory',     // 编剧理论大师(合并版)
        'script_format_complete',   // 剧本格式完整版
        'script_dialogue_drama',    // 对白与剧情
        'script_techniques',        // 编剧技巧
        'scene_description'         // 场景描写
    ]
}

// 7. 分镜师 - 分镜设计
storyboard: {
    skills: [
        'cinematography_complete',  // 摄影完整版
        'directing_master',         // 导演技法
        'video_cinematic_camera',   // 电影级运镜
        'pro_storyboard_visual',    // 分镜视觉
        'aspect_ratios'             // 画幅比例
    ]
}

// 8. Prompt生成器 - AI绘图
prompt: {
    skills: [
        'prompt_vocabulary_master', // Prompt词汇大师
        'prompt_video_master',      // 视频Prompt
        'quality_modifiers',        // 质量修饰词
        'prompt_architecture',      // 建筑Prompt
        'prompt_portrait'           // 人像Prompt
    ]
}
```

### 第二层：专业领域智能体

```javascript
// ========== 编剧组 ==========

// 中国剧本智能体
script_chinese: {
    skills: [
        'script_format_chinese',    // 中国剧本格式 [新建]
        'culture_chinese_drama',    // 中国影视文化 [新建]
        'dialogue_chinese',         // 中文对白 [新建]
        'tv_drama_writing',         // 电视剧写作
        'script_techniques'         // 编剧技巧
    ]
}

// 好莱坞剧本智能体
script_hollywood: {
    skills: [
        'script_format_hollywood',  // 好莱坞格式 [新建]
        'screenwriting_save_the_cat', 
        'screenwriting_syd_field',
        'screenwriting_mcgee_story',
        'dialogue_craft'
    ]
}

// 番剧剧本智能体
script_anime: {
    skills: [
        'script_format_anime',      // 番剧格式 [新建]
        'anime_narrative',          
        'manga_narrative',
        'short_form_series',
        'dialogue_craft'
    ]
}

// 短剧剧本智能体
script_shortform: {
    skills: [
        'short_drama',              
        'short_form_hook',
        'short_form_cliffhanger',
        'short_form_pacing',
        'short_form_vertical'
    ]
}

// ========== 导演组 ==========

// 光影大师
lighting_master: {
    skills: [
        'painting_with_light',
        'lighting_aesthetic_master',
        'lighting_cinematic',
        'color_emotion',
        'color_and_light_gurney'
    ]
}

// 运镜大师
camera_master: {
    skills: [
        'cinematography_complete',
        'camera_movement_advanced',
        'video_cinematic_camera',
        'directing_master',
        'aspect_ratios'
    ]
}

// 动作导演
action_director: {
    skills: [
        'action_choreography',
        'action_martial_arts',
        'fight_wuxia',
        'fight_street',
        'action_poses'
    ]
}

// 表演指导
acting_director: {
    skills: [
        'acting_method',
        'acting_stanislavski',
        'acting_microexpression',
        'acting_subtext',
        'body_language'
    ]
}

// ========== 视觉组 ==========

// 色彩大师
color_master: {
    skills: [
        'color_film_psychology',
        'color_and_light_gurney',
        'color_emotion',
        'visual_story_structure',
        'emotion_visual'
    ]
}

// 特效大师
vfx_master: {
    skills: [
        'vfx_complete',            // 合并版
        'vfx_magic',
        'vfx_superhero_powers',
        'anime_effects',
        'weather_atmosphere'
    ]
}

// 漫画大师
manga_master: {
    skills: [
        'manga_panel_design',
        'manga_page_layout',
        'manga_flow',
        'manga_visual_effects',
        'webtoon_design'
    ]
}

// 场景大师
scene_master: {
    skills: [
        'scene_description',
        'scene_types',
        'background_elements',
        'materials_textures',
        'perspective_depth'
    ]
}

// ========== AI平台组 ==========

// MJ专家
platform_mj: {
    skills: [
        'platform_midjourney',     // 合并版
        'midjourney_sref_library',
        'prompt_vocabulary_master',
        'quality_modifiers',
        'art_styles_detailed'
    ]
}

// 可灵专家
platform_kling: {
    skills: [
        'platform_kling',          // 合并版
        'video_cinematic_camera',
        'prompt_video_master',
        'ai_txt2video',
        'ai_lip_sync'
    ]
}

// 即梦专家
platform_jimeng: {
    skills: [
        'jimeng_prompt_templates',
        'platform_jimeng',         // 合并版
        'prompt_portrait',
        'prompt_architecture',
        'quality_modifiers'
    ]
}

// Flux专家
platform_flux: {
    skills: [
        'platform_flux',           // 合并版
        'ai_flux',
        'prompt_vocabulary_master',
        'ai_controlnet',
        'ai_lora'
    ]
}
```

### 第三层：类型片智能体

```javascript
// 每个类型片智能体配置
genre_action: { skills: ['genre_action', 'action_choreography', 'fight_wuxia', 'directing_climax', 'vfx_explosion'] }
genre_mystery: { skills: ['genre_mystery', 'directing_suspense', 'directing_tension', 'hook_design', 'script_subtext'] }
genre_romance: { skills: ['genre_romance', 'short_form_romance', 'emotion_visual', 'dialogue_craft', 'tear_jerker_design'] }
genre_fantasy: { skills: ['genre_fantasy', 'vfx_magic', 'worldbuilding_bible', 'character_design_hero', 'scene_master'] }
genre_wuxia: { skills: ['genre_wuxia', 'fight_wuxia', 'action_martial_arts', 'culture_history', 'costume_traditional'] }
genre_xianxia: { skills: ['genre_xianxia', 'vfx_magic', 'worldbuilding_bible', 'action_special_moves', 'vfx_superhero_powers'] }
genre_comedy: { skills: ['genre_comedy', 'comedy_design', 'short_form_comedy', 'dialogue_craft', 'acting_method'] }
genre_horror: { skills: ['genre_horror', 'directing_suspense', 'lighting_cinematic', 'vfx_creature', 'sound_design'] }
genre_war: { skills: ['genre_war', 'vfx_explosion', 'vfx_destruction', 'action_choreography', 'emotion_visual'] }
genre_scifi: { skills: ['genre_scifi', 'vfx_environment', 'worldbuilding_bible', 'ai_consistency', 'scene_types'] }
genre_crime: { skills: ['genre_crime', 'genre_thriller', 'directing_suspense', 'script_subtext', 'psychology_motivation'] }
genre_drama: { skills: ['genre_drama', 'tv_drama_writing', 'tear_jerker_design', 'acting_stanislavski', 'emotion_visual'] }
```

---

## 🔄 工作流触发规则

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            🔄 工作流触发规则                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  【Step 1: 上传小说】                                                        │
│       ↓                                                                     │
│  【Step 2: 访谈】→ 触发: interview                                          │
│       ↓                                                                     │
│  【Step 3: 概念】→ 触发: concept                                            │
│       ↓ 根据类型选择                                                         │
│       ├── 动作片 → 触发: genre_action (额外参考)                             │
│       ├── 悬疑片 → 触发: genre_mystery                                       │
│       └── 其他类型...                                                        │
│       ↓                                                                     │
│  【Step 4: 章节】→ 触发: narrative                                          │
│       ↓ 根据集数                                                             │
│       ├── ≤30集 → 标准模式                                                  │
│       └── >30集 → 批次模式 (25集/批)                                        │
│       ↓                                                                     │
│  【Step 5: 角色】→ 触发: character                                          │
│       ↓                                                                     │
│  【Step 6: 设计】→ 触发: artdirector                                        │
│       ↓ 根据风格选择                                                         │
│       ├── 需要光影设计 → 额外触发: lighting_master                           │
│       ├── 需要特效 → 额外触发: vfx_master                                    │
│       └── 漫画风格 → 额外触发: manga_master                                  │
│       ↓                                                                     │
│  【Step 7: 画风】→ 用户选择                                                  │
│       ↓                                                                     │
│  【Step 8: 剧本】→ 触发: screenwriter                                       │
│       ↓ 根据文化/格式选择                                                    │
│       ├── 中国剧 → 额外触发: script_chinese                                  │
│       ├── 好莱坞 → 额外触发: script_hollywood                                │
│       ├── 番剧 → 额外触发: script_anime                                      │
│       └── 短剧 → 额外触发: script_shortform                                  │
│       ↓                                                                     │
│  【Step 9: 分镜】→ 触发: storyboard                                         │
│       ↓ 根据动作需求                                                         │
│       ├── 动作戏 → 额外触发: action_director                                 │
│       └── 表演戏 → 额外触发: acting_director                                 │
│       ↓                                                                     │
│  【Step 10: Prompt】→ 触发: prompt                                          │
│       ↓ 根据平台选择                                                         │
│       ├── Midjourney → 触发: platform_mj                                    │
│       ├── 可灵 → 触发: platform_kling                                       │
│       ├── 即梦 → 触发: platform_jimeng                                      │
│       └── Flux → 触发: platform_flux                                        │
│       ↓                                                                     │
│  【完成】→ 输出分镜表 + Prompts                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📈 智能体数量统计

| 层级 | 数量 | 说明 |
|------|------|------|
| 第一层：核心流程 | 8个 | 主工作流必触发 |
| 第二层：专业领域 | 16个 | 按需触发 |
| 第三层：类型片 | 12个 | 根据类型触发 |
| **总计** | **36个** | 比原来31个多5个，但更专业 |

## 📉 Skills数量统计

| 类别 | 原数量 | 合并后 | 减少 |
|------|--------|--------|------|
| 编剧类 | 28 | 4 | -24 |
| 角色类 | 22 | 2 | -20 |
| 导演类 | 30 | 3 | -27 |
| 视觉类 | 8 | 5 | -3 |
| AI平台 | 35 | 5 | -30 |
| VFX | 15 | 1 | -14 |
| 其他 | 142 | 保留 | - |
| **总计** | **280** | **~160** | **-120** |

---

## ✅ 下一步行动

1. [ ] 创建合并版Skills (9个超级Skill)
2. [ ] 创建文化剧本Skills (中国/好莱坞/番剧/短剧)
3. [ ] 更新agents-config.js
4. [ ] 更新前端触发逻辑
5. [ ] 测试新架构
