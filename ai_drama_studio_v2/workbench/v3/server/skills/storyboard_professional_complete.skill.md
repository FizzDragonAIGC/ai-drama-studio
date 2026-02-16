# 專業級分鏡表完整技能

> 📚 **參考書籍**
> - Cinematics Storyboard Workshop (Gregg Davidson)
> - The Filmmaker's Eye (Gustavo Mercado)
> - Master Shots Vol 1-3 (Christopher Kenworthy)
> - Directing Actors (Judith Weston)

## 專業分鏡表必備25個元素

### 1. 基礎信息
| 元素 | 說明 | 範例 |
|------|------|------|
| shot_id | 鏡頭唯一編號 | E001_S001 |
| episode | 集數 | 1-100 |
| scene | 場次 | 1-5 |
| shot_number | 場內鏡頭序號 | 1-40 |
| duration | 時長(秒) | 2.5 |

### 2. 攝影元素 (Cinematography)
| 元素 | 選項 | 說明 |
|------|------|------|
| shot_type | ECU/CU/MCU/MS/MLS/LS/ELS/OTS/POV/2Shot | 景別 |
| camera_angle | Eye/High/Low/Dutch/Bird/Worm | 角度 |
| camera_movement | Static/Pan/Tilt/Dolly/Truck/Crane/Handheld/Steadicam/Drone | 運鏡 |
| lens | Wide/Normal/Telephoto/Macro | 鏡頭 |
| focus | Deep/Shallow/Rack/Split | 焦點 |

### 3. 燈光元素 (Lighting)
| 元素 | 選項 | 說明 |
|------|------|------|
| key_light | Hard/Soft/Natural/Practical | 主光 |
| lighting_style | High-key/Low-key/Rembrandt/Split/Butterfly | 風格 |
| color_temp | Warm(3200K)/Neutral(5600K)/Cool(7000K) | 色溫 |
| light_direction | Front/Side/Back/Top/Bottom | 方向 |
| shadows | Harsh/Soft/None | 陰影 |

### 4. 構圖元素 (Composition)
| 元素 | 選項 | 說明 |
|------|------|------|
| framing | Rule-of-thirds/Center/Golden-ratio/Symmetry | 構圖法則 |
| depth | Foreground/Midground/Background | 景深層次 |
| headroom | Tight/Normal/Loose | 頭頂空間 |
| lead_room | Left/Right/Center | 視線空間 |
| negative_space | Yes/No | 負空間 |

### 5. 表演元素 (Performance)
| 元素 | 說明 | 範例 |
|------|------|------|
| character | 角色名 | 小豆子 |
| emotion | 情緒狀態 | 恐懼/決絕/悲傷 |
| action | 動作描述 | 緊握母親衣角 |
| eyeline | 視線方向 | 看向門外 |
| blocking | 走位 | 從左入畫，停在中央 |

### 6. 美術元素 (Art Direction)
| 元素 | 說明 | 範例 |
|------|------|------|
| location | 場景地點 | 關家科班練功棚 |
| time_of_day | 時段 | 黃昏 |
| weather | 天氣 | 雪天 |
| props | 道具 | 菜刀、磨刀石 |
| costume | 服裝 | 破舊棉襖 |
| color_palette | 色彩基調 | 灰藍冷色 |

### 7. 聲音元素 (Audio)
| 元素 | 說明 | 範例 |
|------|------|------|
| dialogue | 對白 | "娘，我手冷" |
| sfx | 音效 | 雪地腳步聲 |
| music | 配樂提示 | 緊張弦樂漸強 |
| ambience | 環境音 | 遠處鞭炮聲 |

### 8. 轉場與節奏
| 元素 | 選項 | 說明 |
|------|------|------|
| transition_in | Cut/Dissolve/Fade/Wipe | 入場轉場 |
| transition_out | Cut/Dissolve/Fade/Wipe | 出場轉場 |
| pacing | Fast/Medium/Slow | 節奏 |
| beat | Setup/Build/Climax/Release | 敘事節拍 |

### 9. AI生成標記
| 元素 | 說明 | 範例 |
|------|------|------|
| prompt_style | 畫風提示 | 電影級寫實 |
| prompt_camera | 攝影提示 | cinematic lighting |
| prompt_mood | 情緒提示 | melancholic |
| reference | 參考畫面 | 《霸王別姬》電影 |

## 分鏡表CSV格式

```csv
shot_id,episode,scene,shot_number,duration,shot_type,camera_angle,camera_movement,lens,focus,key_light,lighting_style,color_temp,light_direction,shadows,framing,depth,headroom,lead_room,character,emotion,action,eyeline,blocking,location,time_of_day,weather,props,costume,color_palette,dialogue,sfx,music,ambience,transition_in,transition_out,pacing,beat,prompt_style,prompt_camera,prompt_mood,reference
```

## 場景分鏡規劃

### 每集40鏡頭分配
```
開場 (5鏡): 建立場景、時間、人物
發展 (15鏡): 推進情節、對話互動
轉折 (10鏡): 衝突升級、情緒變化
高潮 (7鏡): 關鍵時刻、視覺衝擊
收尾 (3鏡): 結果呈現、懸念埋設
```

### 鏡頭節奏曲線
```
1-5: 穩定建立 (Static/Wide)
6-20: 逐漸緊湊 (Medium shots, more movement)
21-30: 緊張升級 (Close-ups, faster cuts)
31-37: 高潮爆發 (Extreme close-ups, dynamic)
38-40: 緩和/懸念 (Pull back, linger)
```
