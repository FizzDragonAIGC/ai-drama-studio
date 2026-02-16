# Skills Report - AI番劇系統

## 📊 總覽

| 指標 | 數量 |
|------|------|
| Skills文件總數 | 276 |
| 配置中引用 | 272 |
| 未使用 | ~50 (主要是被合併的舊版) |

---

## 🔧 智能體Skills配置

### 總導演組 (7 Agents)
| Agent | Skills數 | 主要Skills |
|-------|---------|-----------|
| director | 16 | directing_*, editing_*, cinematography_* |
| concept | 5 | pro_concept_*, genre_*, audience_* |
| interview | 14 | interview_*, narrative_*, theme_* |
| screenwriter | 8 | screenwriting_*, dialogue_* |
| adaptation | 6 | adaptation_*, chapter_* |
| narrative | 18 | narrative_*, chapter_*, pacing_* |
| storyboard | 12 | storyboard_*, camera_*, prompt_* |

### 美術組 (6 Agents)
| Agent | Skills數 | 主要Skills |
|-------|---------|-----------|
| artdirector | 5 | art_styles_*, lighting_*, color_* |
| character | 5 | character_design_complete, appearance, relationship |
| costume | 4 | costume_*, era_*, culture_* |
| scene | 5 | scene_*, environment_*, worldbuilding_* |
| color | 4 | color_*, palette_*, lighting_* |
| expression | 3 | expression_*, emotion_* |

### 特效組 (5 Agents)
| Agent | Skills數 | 主要Skills |
|-------|---------|-----------|
| vfx | 5 | vfx_*, compositing_* |
| prompt | 8 | prompt_*, midjourney_*, flux_* |
| platform | 6 | platform_*, jimeng_*, runway_* |
| manga | 4 | manga_*, panel_*, sequential_* |
| lighting | 4 | lighting_*, atmosphere_* |

---

## ⚠️ 未使用的Skills (可清理)

這些Skills已被合併到綜合版本中：

```
character_design_age
character_design_body_type
character_design_contrast
character_design_ensemble
character_design_expression
character_design_face
character_design_hero
character_design_mentor
character_design_model_sheet
character_design_personality
character_design_posture
character_design_proportion
character_design_shape_language
character_design_sidekick
character_design_silhouette
character_design_turnaround
character_design_villain
```

**建議**: 保留備用，不刪除

---

## 🎯 Skills使用頻率 (Top 10)

| Skill | 引用次數 | 用途 |
|-------|---------|------|
| lighting_aesthetic_master | 4 | 光影美學 |
| lighting_cinematic | 3 | 電影燈光 |
| color_emotion | 3 | 色彩情緒 |
| aesthetic_visual | 3 | 視覺美學 |
| worldbuilding_bible | 2 | 世界觀設定 |
| weather_atmosphere | 2 | 氣氛天氣 |
| short_form_pacing | 2 | 短片節奏 |
| editing_rhythm | 2 | 剪輯節奏 |
| directing_blocking | 2 | 調度走位 |
| culture_history | 2 | 文化歷史 |

---

## ✅ 測試結果

測試進行中... 見 `/tmp/full_agent_test.txt`

---

*生成時間: 2026-02-16*
