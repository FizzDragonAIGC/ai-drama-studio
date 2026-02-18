# Character Image Prompt - 角色形象AI生成Prompt指南

## 核心公式

```
Character Image Prompt = Subject Details + Appearance + Pose/Expression + Environment + Lighting + Camera + Style + Negative
```

---

## 一、Subject Details（主體描述）

### 必備元素
| 元素 | 說明 | 範例 |
|------|------|------|
| 身份 | 角色名/類型 | "a young female assassin", "an elderly Chinese scholar" |
| 年齡 | 具體或範圍 | "age 17", "in her early 30s", "elderly man in his 70s" |
| 性別 | 明確標註 | "male", "female", "androgynous" |
| 種族/民族 | 如相關 | "East Asian", "African American", "Middle Eastern" |

---

## 二、Appearance（外觀細節）

### 2.1 面部 (Face)
```
Eyes: [shape] [color] [特點]
- "large almond-shaped amber eyes with long lashes"
- "narrow calculating grey eyes"
- "heterochromia - one blue, one green eye"

Eyebrows: [形狀] [粗細]
- "thick straight eyebrows"
- "thin arched eyebrows"

Nose: [形狀]
- "sharp aquiline nose"
- "small button nose"

Mouth: [形狀] [狀態]
- "full lips with a confident smirk"
- "thin-lipped, pursed in disapproval"

Skin: [膚色] [質感] [特徵]
- "fair porcelain skin with light freckles"
- "tanned weathered skin with a scar across left cheek"

Facial hair: [如有]
- "neatly trimmed goatee"
- "stubble along the jawline"
```

### 2.2 髮型 (Hair)
```
Style + Length + Color + Texture + Accessories
- "long flowing black hair with silver streaks, braided with gold ribbons"
- "short spiky blonde hair with shaved sides, messy windswept style"
- "bald head with intricate tattoo patterns"
```

### 2.3 體型 (Build)
```
Height + Body Type + Posture
- "tall athletic build, 180cm, confident upright posture"
- "petite slender frame, slightly hunched defensive posture"
- "muscular heavyweight build, intimidating wide stance"
```

---

## 三、Pose & Expression（姿勢與表情）

### 3.1 姿勢選擇
| 用途 | 推薦姿勢 |
|------|----------|
| 角色設定圖 | standing pose, T-pose, A-pose |
| 性格展示 | hands on hips (自信), arms crossed (防備), relaxed stance (隨和) |
| 動態展示 | walking pose, action pose, combat stance |
| 多角度 | front view, side view, 3/4 view, back view |

### 3.2 表情設計
```
主角: "determined gaze with a slight confident smile"
反派: "cold calculating stare with a sinister half-smile"
配角-搞笑: "exaggerated surprised expression with wide eyes"
配角-智者: "serene peaceful expression with knowing eyes"
```

---

## 四、Environment（背景環境）

### 角色設定圖
```
- "clean white background" (標準)
- "gradient grey background" (專業)
- "simple studio lighting setup" (商業)
```

### 角色展示圖
```
- "standing in a misty bamboo forest at dawn"
- "in a neon-lit cyberpunk alley at night"
- "in an ornate Victorian library with warm candlelight"
```

---

## 五、Lighting（燈光）

### 常用燈光風格
| 風格 | 效果 | Prompt描述 |
|------|------|-----------|
| 三點照明 | 標準人像 | "three-point studio lighting" |
| 倫勃朗光 | 戲劇性 | "Rembrandt lighting, dramatic shadows" |
| 蝴蝶光 | 優雅美化 | "butterfly lighting, glamorous" |
| 側光 | 神秘感 | "dramatic side lighting, half face in shadow" |
| 逆光 | 剪影/神聖 | "backlit, rim lighting, ethereal glow" |
| 自然光 | 真實感 | "soft natural daylight, golden hour" |

---

## 六、Camera（相機參數）

### 角色設定圖推薦
```
Full body: "full body shot, 35mm lens, f/5.6"
Half body: "medium shot from waist up, 50mm lens, f/4"
Portrait: "portrait shot, 85mm lens, f/2.8, bokeh background"
Face detail: "close-up face shot, 100mm lens, f/2, sharp details"
```

### 多角度設定
```
"character design sheet, multiple views, front/side/back, turnaround"
"character reference sheet, full body, multiple expressions"
```

---

## 七、Style（風格標籤）

### 按畫風
```
寫實: "photorealistic, hyperdetailed, 8K, RAW photo quality"
半寫實: "semi-realistic, digital painting, detailed"
動漫: "anime style, cel shaded, vibrant colors"
吉卜力: "Studio Ghibli style, soft watercolor, warm tones"
迪士尼: "Disney animation style, expressive, polished"
賽博朋克: "cyberpunk aesthetic, neon colors, high contrast"
奇幻: "fantasy art, epic, detailed armor and weapons"
```

### 品質標籤
```
"masterpiece, best quality, highly detailed, sharp focus, professional"
"trending on artstation, concept art, illustration"
```

---

## 八、Negative Prompt（負面提示）

### 標準負面提示
```
--no distorted face, extra fingers, mutated hands, bad anatomy, blurry, low quality, jpeg artifacts, watermark, text, signature, cropped, out of frame, worst quality, low resolution, deformed, ugly, duplicate, morbid, mutilated
```

### 風格排除（按需）
```
寫實風排除動漫: "--no cartoon, anime, illustration, drawing"
動漫風排除寫實: "--no photorealistic, photograph, 3D render"
```

---

## 九、完整Prompt範例

### 範例1: 主角英雄（寫實風）
```
A heroic young Chinese man, age 25, athletic muscular build 178cm. Sharp determined eyes with dark brown irises, thick straight eyebrows, strong jawline with light stubble, tanned healthy skin with a small scar above left eyebrow. Short spiky black hair, slightly windswept. Wearing a modern tactical outfit - black fitted jacket with red accents, utility belt, combat boots. Standing in confident hero pose with arms crossed, determined gaze looking slightly upward. 

Clean studio background with subtle gradient. Three-point lighting with dramatic rim light. Full body shot, 50mm lens, f/4, sharp details throughout.

Photorealistic, cinematic quality, highly detailed, 8K resolution, concept art, character design.

--no distorted face, extra fingers, blurry, low quality, cartoon, anime
```

### 範例2: 反派角色（半寫實）
```
A sinister aristocratic woman, age 35, tall slender elegant build. Narrow calculating pale grey eyes with heavy eyeliner, thin arched eyebrows, aquiline nose, thin lips with dark red lipstick curled in a cold smile, flawless pale porcelain skin. Long straight silver-white hair flowing past shoulders, adorned with a black lace hair ornament.

Wearing an elaborate black Victorian gown with high collar, silver embroidery, long gloves. Standing with one hand on hip, chin raised, looking down with condescending expression.

Dark moody background with subtle purple mist. Dramatic Rembrandt lighting, deep shadows on one side of face. 3/4 view portrait shot, 85mm lens, f/2.8, eyes sharp with bokeh background.

Dark fantasy, gothic elegance, digital painting, detailed, trending on artstation.

--no bright colors, cheerful expression, casual clothing, blurry
```

### 範例3: 動漫角色設定圖
```
Anime character design sheet of a cheerful teenage girl, age 16, petite build. Large sparkling emerald eyes with star-shaped highlights, small cute nose, bright smile showing slight fang tooth, fair skin with pink blush on cheeks. Shoulder-length fluffy pink hair with twin tails tied with yellow ribbons, ahoge on top.

Wearing a colorful magical girl outfit - white and pink frilly dress, puffy sleeves, star-shaped brooch, white boots with wing decorations. Multiple poses: standing cheerfully with peace sign, surprised expression, determined battle pose, sad teary expression.

Clean white background. Flat anime coloring with soft cel shading. Full body reference sheet with multiple expressions and angles.

Anime style, vibrant colors, cute moe aesthetic, clean lineart, Studio Trigger inspired.

--no realistic, photograph, 3D, western cartoon, dark colors
```

---

## 十、輸出JSON格式

```json
{
  "character_name": "角色名",
  "image_prompt_full": "完整150-200字英文prompt",
  "image_prompt_short": "精簡50字快速prompt",
  "style_tags": ["風格1", "風格2"],
  "negative_prompt": "負面提示詞",
  "recommended_models": ["適合的AI模型"],
  "aspect_ratio": "推薦比例 (如 2:3 人像, 1:1 頭像)"
}
```

---

## 參考平台參數

| 平台 | 推薦比例 | 特殊參數 |
|------|----------|----------|
| Midjourney | --ar 2:3 | --style raw, --v 6 |
| Stable Diffusion | 768x1152 | CFG 7-9, Steps 30+ |
| DALL-E 3 | 1024x1792 | 自然語言描述 |
| Flux | 896x1152 | guidance 3.5-4 |

