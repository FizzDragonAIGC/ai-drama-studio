# 章節多版本方案 Skill

> 當用戶的章節配置與故事長度不匹配時，提供多個精簡/擴充版本供選擇

## 核心理念
**不是簡單刪減，而是提供不同的聚焦方案**

每個版本都應該是一個完整的故事，有不同的主題聚焦點。

---

## 🔥 八維度全面分析框架（必須！）

每個版本必須從以下8個維度進行深度分析：

### 1️⃣ 故事主線 (Main Plot)
- 這個版本的核心故事線是什麼？
- 用一句話概括主線
- 主線的起承轉合在哪幾集？

### 2️⃣ 核心角色 (Key Characters)
- 主角是誰？動機是什麼？
- 主要配角有哪些？功能是什麼？
- 刪減/保留了哪些角色？為什麼？

### 3️⃣ 重點情節 (Key Scenes)
- 必須保留的5-10個高光時刻
- 每個場景的戲劇價值
- 刪除了哪些場景？為什麼可以刪？

### 4️⃣ 情感曲線 (Emotional Arc)
- 整體情感走向：開心→悲傷→希望？
- 情感高潮在第幾集？
- 觀眾會在哪裡哭/笑/緊張？

### 5️⃣ 衝突設計 (Conflict Design)
- 主要衝突是什麼？（人vs人/人vs自然/人vs自己）
- 衝突如何升級？
- 衝突如何解決？

### 6️⃣ 節奏安排 (Pacing)
- 快節奏段落在哪？（動作/緊張）
- 慢節奏段落在哪？（情感/反思）
- 每集的節奏變化

### 7️⃣ 主題表達 (Theme)
- 這個版本想表達什麼主題？
- 主題如何通過情節呈現？
- 結局如何點題？

### 8️⃣ 觀眾定位 (Target Audience)
- 適合什麼類型的觀眾？
- 觀眾看完會有什麼感受？
- 與其他版本相比的獨特賣點

---

## 版本模板（必須按此格式輸出）

```json
{
  "version_name": "主線聚焦版",
  "version_code": "A",
  "analysis": {
    "main_plot": {
      "summary": "一句話概括",
      "core_line": "詳細主線描述",
      "structure": {
        "開端": "第1-2集",
        "發展": "第3-5集", 
        "高潮": "第6-7集",
        "結局": "第8集"
      }
    },
    "key_characters": {
      "protagonist": {
        "name": "角色名",
        "motivation": "動機",
        "arc": "成長軌跡"
      },
      "supporting": [
        {"name": "配角1", "function": "功能"},
        {"name": "配角2", "function": "功能"}
      ],
      "removed": ["被刪角色1", "被刪角色2"],
      "remove_reason": "刪除原因"
    },
    "key_scenes": [
      {"episode": 1, "scene": "場景描述", "value": "戲劇價值"},
      {"episode": 3, "scene": "場景描述", "value": "戲劇價值"},
      {"episode": 6, "scene": "場景描述", "value": "戲劇價值"}
    ],
    "emotional_arc": {
      "overall": "整體情感走向",
      "climax_episode": 6,
      "cry_moments": ["第X集XX場景"],
      "laugh_moments": ["第X集XX場景"],
      "tense_moments": ["第X集XX場景"]
    },
    "conflict_design": {
      "main_conflict": "主要衝突",
      "conflict_type": "人vs人/人vs環境/人vs自己",
      "escalation": "衝突如何升級",
      "resolution": "如何解決"
    },
    "pacing": {
      "fast_sections": ["第X集", "第X集"],
      "slow_sections": ["第X集", "第X集"],
      "episode_rhythm": "每集節奏安排"
    },
    "theme": {
      "core_theme": "核心主題",
      "expression": "如何通過情節表達",
      "ending_message": "結局傳達的信息"
    },
    "target_audience": {
      "who": "目標觀眾描述",
      "feeling": "觀後感受",
      "unique_selling_point": "獨特賣點"
    }
  },
  "chapters_preview": [
    {"episode": 1, "title": "集名", "summary": "本集摘要"},
    {"episode": 2, "title": "集名", "summary": "本集摘要"}
  ],
  "comparison": {
    "vs_other_versions": "與其他版本的差異",
    "best_for": "最適合什麼情況"
  }
}
```

---

## 版本類型

### 壓縮版本（匹配度 < 0.7 時生成3個版本）

#### 版本A：主線聚焦型
- 聚焦核心主線，刪除所有支線
- 適合：快節奏觀眾、時間有限

#### 版本B：情感聚焦型  
- 聚焦情感線，簡化動作情節
- 適合：喜歡深度情感的觀眾

#### 版本C：衝突聚焦型
- 聚焦核心衝突，其他為輔
- 適合：喜歡緊張刺激的觀眾

### 擴充版本（匹配度 > 1.5 時生成3個版本）

#### 版本A：深度擴展型
- 擴展角色背景和心理
- 增加回憶/閃回

#### 版本B：支線擴展型
- 增加配角支線
- 世界觀擴展

#### 版本C：節奏擴展型
- 增加日常/喘息場景
- 情感鋪墊加長

---

## 輸出要求

1. **必須輸出3個完整版本**
2. **每個版本必須包含8個維度的完整分析**
3. **必須有具體的章節預覽**
4. **必須有版本間的對比說明**
