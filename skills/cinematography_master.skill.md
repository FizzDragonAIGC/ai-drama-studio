# 🎥 運鏡智能體 (Cinematography Master Agent)

## 概述
整合所有攝影相關知識的Master Skill，涵蓋景別、機位、運鏡、構圖四大系統。

## 相關Skills
- `camera_angles.skill.md` - 機位角度
- `camera_movement_advanced.skill.md` - 高級運鏡
- `cinematography_composition.skill.md` - 構圖法則
- `cinematography_shots.skill.md` - 景別系統
- `cinematography_movement.skill.md` - 運動攝影
- `directing_master_shot.skill.md` - 主鏡頭設計
- `lighting_cinematic.skill.md` - 電影燈光

---

## 一、景別系統 (Shot Sizes)

### 完整景別表
| 代碼 | 英文 | 中文 | 畫面內容 | 情感功能 | Prompt關鍵詞 |
|------|------|------|----------|----------|-------------|
| ELS | Extreme Long Shot | 大遠景 | 人物極小，環境主導 | 渺小、壯闘、孤獨 | extreme wide shot, vast landscape |
| LS | Long Shot | 遠景 | 全身+環境 | 建立環境、人物入場 | wide shot, full body, environment |
| MLS | Medium Long Shot | 中遠景 | 膝蓋以上 | 動作清晰、環境感 | medium long shot, knee up |
| MS | Medium Shot | 中景 | 腰部以上 | 對話、日常 | medium shot, waist up |
| MCU | Medium Close-Up | 中近景 | 胸部以上 | 情感傾向、重要對話 | medium close-up, chest up |
| CU | Close-Up | 近景/特寫 | 面部填滿 | 情緒高點、重要反應 | close-up, face filling frame |
| ECU | Extreme Close-Up | 大特寫 | 眼睛/嘴/物品局部 | 極度強調、細節 | extreme close-up, macro, detail |
| Insert | Insert Shot | 插入鏡頭 | 物品特寫 | 重要道具、信息 | insert shot, object detail |

### 景別選擇指南
```
📖 敘事鏡頭 → LS / MS 為主
🎯 戲劇鏡頭 → MCU / CU 為主
🎨 情感鏡頭 → CU / ECU 為主
```

---

## 二、機位系統 (Camera Angles)

### 垂直角度
| 角度 | 描述 | 情感效果 | Prompt |
|------|------|----------|--------|
| 鳥瞰 (Bird's Eye) | 正上方90° | 上帝視角、渺小、命運 | bird's eye view, top down |
| 俯拍 (High Angle) | 高於眼線15-45° | 弱小、被審視、脆弱 | high angle shot, looking down |
| 平視 (Eye Level) | 與眼線平行 | 客觀、平等、正常 | eye level shot |
| 仰拍 (Low Angle) | 低於眼線15-45° | 強大、威嚴、英雄 | low angle shot, looking up |
| 蟲視 (Worm's Eye) | 接近地面極低 | 極度崇拜、壓迫 | worm's eye view, extreme low |

### 水平角度
| 角度 | 描述 | 效果 | Prompt |
|------|------|------|--------|
| 正面 | 0° | 直接、對峙、坦誠 | frontal shot |
| 3/4側面 | 45° | 最常用、立體感 | three-quarter view |
| 側面 | 90° | 輪廓、對比、並列 | profile shot, side view |
| 背面 | 180° | 神秘、跟隨、未知 | back shot, from behind |
| 過肩 | OTS | 對話標準、觀察 | over the shoulder shot |

### 特殊機位
| 機位 | 描述 | 用途 | Prompt |
|------|------|------|--------|
| POV | 主觀視角 | 代入感、看見 | POV shot, first person view |
| Dutch Angle | 傾斜畫面 | 不安、瘋狂、失衡 | dutch angle, tilted frame |
| Two Shot | 雙人構圖 | 關係、對話 | two shot, both characters |
| Group Shot | 群體構圖 | 團隊、集體 | group shot, ensemble |

---

## 三、運鏡系統 (Camera Movement)

### 基礎運鏡
| 運鏡 | 英文 | 描述 | 情感 | 設備 | Prompt |
|------|------|------|------|------|--------|
| 推 | Push In | 向主體靠近 | 緊張、聚焦 | 軌道/穩定器 | push in, dolly in |
| 拉 | Pull Out | 遠離主體 | 揭示、孤獨 | 軌道/穩定器 | pull out, dolly out |
| 搖 | Pan | 水平旋轉 | 跟隨、環顧 | 三腳架 | pan left/right |
| 俯仰 | Tilt | 垂直旋轉 | 上下審視 | 三腳架 | tilt up/down |
| 橫移 | Track | 平行移動 | 陪伴、跟隨 | 軌道 | tracking shot, dolly |
| 升降 | Crane | 垂直移動 | 揭示、超越 | 搖臂/無人機 | crane up/down |
| 環繞 | Orbit | 繞主體旋轉 | 時刻凝固 | 環形軌道 | orbiting shot, 360 |
| 跟拍 | Follow | 跟隨運動 | 同行、緊迫 | 穩定器 | following shot |
| 手持 | Handheld | 自然晃動 | 真實、緊張 | 手持 | handheld, shaky cam |

### 複合運鏡
| 組合 | 描述 | 效果 | Prompt |
|------|------|------|--------|
| 推+升 | 靠近同時升起 | 英雄時刻 | push in rising, heroic reveal |
| 拉+降 | 後退同時下降 | 失落、渺小 | pull out descending |
| 環繞+推 | 螺旋靠近 | 壓迫、聚焦 | spiraling in |
| 跟拍+穿越 | 跟隨穿過空間 | 沉浸式 | following through |
| 搖+推 | 轉向同時靠近 | 發現 | pan to push in |

### 運鏡速度
| 速度 | 時長 | 情緒 | Prompt修飾 |
|------|------|------|-----------|
| 極慢 | 15-30秒 | 潛在緊張、沉思 | extremely slow, barely perceptible |
| 慢 | 5-10秒 | 莊重、憂傷 | slow, gradual |
| 中 | 2-5秒 | 正常敘事 | steady |
| 快 | 1-2秒 | 緊張、能量 | fast, swift |
| 極快 | <1秒 | 震驚、衝擊 | rapid, sudden |

### 高級運鏡技法
| 技法 | 英文 | 描述 | 效果 | Prompt |
|------|------|------|------|--------|
| 眩暈鏡頭 | Vertigo/Dolly Zoom | 推鏡+拉焦 | 空間扭曲、恐懼 | vertigo shot, dolly zoom |
| 甩鏡 | Whip Pan | 快速橫搖 | 快速轉場 | whip pan, motion blur |
| 一鏡到底 | Long Take | 無剪輯 | 沉浸、真實 | long take, continuous shot |
| 穿越鏡頭 | Through Shot | 穿過物體 | 進入、發現 | camera passing through |
| 墜落鏡頭 | Falling Shot | 隨物下墜 | 失重、絕望 | falling camera |

---

## 四、構圖系統 (Composition)

### 經典構圖法則
| 法則 | 描述 | 用途 | Prompt |
|------|------|------|--------|
| 三分法 | 畫面分9格，主體在線交點 | 萬用 | rule of thirds |
| 中心構圖 | 主體正中央 | 對稱、莊重、壓迫 | centered composition |
| 對角線 | 主體沿對角線 | 動態、張力 | diagonal composition |
| 框中框 | 用前景框住主體 | 聚焦、窺視 | frame within frame |
| 引導線 | 線條指向主體 | 引導視線 | leading lines |
| 黃金螺旋 | 斐波那契曲線 | 自然、美感 | golden spiral |

### 空間構圖
| 類型 | 描述 | 效果 | Prompt |
|------|------|------|--------|
| 淺景深 | 背景虛化 | 主體突出 | shallow depth of field, bokeh |
| 深景深 | 全部清晰 | 環境重要 | deep focus, everything sharp |
| 前景遮擋 | 物體在前方 | 窺視、層次 | foreground element |
| 負空間 | 留白 | 孤獨、呼吸 | negative space |

---

## 五、情緒-運鏡速查表

### 緊張/懸疑
```
景別：CU / MCU（聚焦面部反應）
機位：平視或微仰（觀眾同等或略低）
運鏡：緩慢推進 + 固定幾秒
構圖：三分法偏側，留出"威脅方向"空間
Prompt: slow push in, close-up, tension, dramatic lighting
```

### 震驚/恐懼
```
景別：快速從MS切到ECU
機位：Dutch Angle 傾斜
運鏡：快速推進 或 眩暈鏡頭
構圖：打破平衡，不穩定感
Prompt: dutch angle, sudden push in, vertigo effect, disturbing
```

### 孤獨/悲傷
```
景別：從CU慢慢拉到LS/ELS
機位：高機位俯拍
運鏡：緩慢拉遠
構圖：大量負空間，主體渺小
Prompt: slow pull out, high angle, isolated figure, vast empty space
```

### 勝利/希望
```
景別：從MS推到CU
機位：低機位仰拍
運鏡：升起 + 推進
構圖：主體居中偏上，天空入畫
Prompt: low angle, rising crane shot, heroic, golden hour lighting
```

### 浪漫/親密
```
景別：MCU 雙人
機位：平視，稍低
運鏡：緩慢環繞
構圖：兩人互為框架
Prompt: two shot, soft focus, orbiting slowly, intimate, warm lighting
```

### 追逐/緊迫
```
景別：MS到LS交替
機位：跟拍
運鏡：手持 + 快速跟隨
構圖：動態，傾斜，motion blur
Prompt: handheld tracking, fast following, motion blur, urgent
```

---

## 六、分鏡標註規範

### 標準格式
```
#001 | MS→CU | 6s
━━━━━━━━━━━━━━━━━━
機位：平視 / 三分法右側
運鏡：緩慢推進 (3s) → 定住 (3s)
鏡頭：50mm f/2.8
景深：淺景深，背景虛化
━━━━━━━━━━━━━━━━━━
情緒：緊張累積
敘事：發現線索
```

### 運鏡描述模板
```
[運鏡類型]：[方向/軌跡]
[速度]：[具體時長] / [情緒描述]
[起止]：從[起始構圖]到[終止構圖]
[設備建議]：[軌道/穩定器/手持/搖臂]
```

---

## 七、AI Prompt 運鏡模板

### 靜態鏡頭
```
[景別] shot of [主體], [機位] angle,
[構圖法則], [景深],
[光線], [氛圍],
cinematic, film still, 8K
```

### 動態鏡頭
```
[運鏡類型] shot, camera [運動描述],
[主體] [動作], [景別],
[速度], [情緒],
cinematic movement, dynamic
```

### 範例
```
low angle medium close-up of warrior, 
camera slowly pushing in,
shallow depth of field, dramatic side lighting,
tension building, epic moment,
cinematic, film grain, 8K --ar 16:9
```

---

## 八、導演風格運鏡參考

### 宮崎駿風格
- 緩慢橫移展示世界
- 跟隨角色飛行
- Prompt: Miyazaki style, gentle tracking, flying POV, dreamlike

### 新海誠風格
- 大量空鏡+光線
- 抒情慢推
- Prompt: Shinkai style, lens flare, golden hour, melancholic

### 王家衛風格
- 手持+慢鏡頭
- 模糊+抽格
- Prompt: Wong Kar-wai style, slow motion, handheld, blurred

### 北野武風格
- 固定機位長時間
- 突然暴力
- Prompt: Kitano style, static shot, long take, sudden violence

### 昆汀風格
- 低角度trunk shot
- 長對話固定
- Prompt: Tarantino style, trunk shot, low angle, long dialogue

---

*適用Agent：🎥運鏡、📷攝影、🎬分鏡、🎞️剪輯*
*版本：1.0*
*依賴Skills：camera_angles, camera_movement_advanced, cinematography_composition*
