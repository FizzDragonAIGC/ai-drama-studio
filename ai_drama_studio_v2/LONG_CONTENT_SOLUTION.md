# 長內容生成方案 - DeepSeek優化

## 問題分析

| 限制 | DeepSeek | Claude |
|------|----------|--------|
| max_tokens | **8,192** | 16,000+ |
| 每集輸出 | ~80 tokens | ~80 tokens |
| 單次上限 | **~100集** (理論) | ~200集 |
| 實際安全值 | **50集** | 100集 |

**100集 × 80 tokens = 8,000 tokens** → 接近DeepSeek上限，容易截斷

---

## 解決方案：分批生成 (Batch Mode)

### 核心思路
```
100集 ÷ 20集/批 = 5批次
每批次獨立API調用，最後合併
```

### 批次配置
| 集數範圍 | 批次數 | 每批集數 |
|---------|--------|---------|
| 1-24集 | 1批 | 24集 |
| 25-50集 | 2批 | 25集 |
| 51-80集 | 3批 | ~27集 |
| 81-100集 | 4-5批 | 20集 |

---

## 實現方案

### 方案A：前端分批請求

```javascript
async function generateLongChapters(totalEpisodes, perBatch = 20) {
    const batches = Math.ceil(totalEpisodes / perBatch);
    const allEpisodes = [];
    
    for (let i = 0; i < batches; i++) {
        const start = i * perBatch + 1;
        const end = Math.min((i + 1) * perBatch, totalEpisodes);
        
        updateProgress(`生成第 ${start}-${end} 集 (${i+1}/${batches})...`);
        
        const response = await fetch('/api/agent/narrative', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: novelContent,
                config: {
                    batchMode: true,
                    startEpisode: start,
                    endEpisode: end,
                    totalEpisodes: totalEpisodes,
                    // 傳遞前批次的結尾，保證連貫性
                    previousEnding: allEpisodes.length > 0 
                        ? allEpisodes[allEpisodes.length - 1].hook 
                        : null
                }
            })
        });
        
        const data = await response.json();
        const episodes = parseEpisodes(data.result);
        allEpisodes.push(...episodes);
        
        // 批次間延遲，避免API限流
        if (i < batches - 1) await sleep(1000);
    }
    
    return allEpisodes;
}
```

### 方案B：後端智能分批

```javascript
// proxy-server.js 新增分批邏輯
app.post('/api/chapters/batch', async (req, res) => {
    const { novel, totalEpisodes, batchSize = 20 } = req.body;
    const batches = Math.ceil(totalEpisodes / batchSize);
    const results = [];
    
    for (let i = 0; i < batches; i++) {
        const start = i * batchSize + 1;
        const end = Math.min((i + 1) * batchSize, totalEpisodes);
        
        const prompt = buildBatchPrompt({
            novel,
            start,
            end,
            totalEpisodes,
            previousBatch: results.length > 0 ? results[results.length - 1] : null
        });
        
        const response = await callDeepSeek(prompt, { max_tokens: 6000 });
        results.push(response);
    }
    
    // 合併所有批次
    const allEpisodes = results.flatMap(r => r.episodes);
    res.json({ episodes: allEpisodes, batches: batches });
});
```

---

## 分批Prompt設計

### 首批 (1-20集)
```
請為這個故事規劃第1-20集（共${total}集的開頭部分）

要求：
1. 第1-5集為「起」（建置期）- 世界觀、角色介紹
2. 第6-15集為「承」（發展期）- 矛盾發展
3. 第16-20集進入「轉」- 衝突升級

輸出JSON: { "episodes": [...], "nextHook": "第21集開頭提示" }
```

### 中間批次 (21-40集)
```
續接上文，請規劃第21-40集

前情提要：${previousEnding}
上批結尾鉤子：${previousHook}

要求：
1. 確保與第20集劇情銜接
2. 第21-30集繼續「轉」
3. 第31-40集進入衝突高峰

輸出JSON: { "episodes": [...], "nextHook": "第41集開頭提示" }
```

### 末批 (81-100集)
```
規劃最終章第81-100集

前情提要：${previousEnding}

要求：
1. 第81-90集為「合」開始 - 收尾
2. 第91-98集高潮爆發
3. 第99-100集大結局

輸出JSON: { "episodes": [...], "finalEnding": "結局總結" }
```

---

## UI設計

### 長篇模式觸發
```javascript
function updateChapterConfig() {
    const episodes = parseInt(document.getElementById('episodeCount').value);
    
    if (episodes > 50) {
        showLongContentWarning(episodes);
    }
}

function showLongContentWarning(episodes) {
    const batches = Math.ceil(episodes / 20);
    
    document.getElementById('longContentWarning').innerHTML = `
        <div class="warning-box">
            ⚠️ 長篇模式 (${episodes}集)
            <ul>
                <li>將分 ${batches} 批次生成</li>
                <li>預計時間: ${batches * 30}秒</li>
                <li>可隨時暫停/繼續</li>
            </ul>
        </div>
    `;
}
```

### 進度顯示
```javascript
function renderBatchProgress(current, total, episodes) {
    return `
        <div class="batch-progress">
            <div class="progress-bar" style="width:${current/total*100}%"></div>
            <div class="progress-text">
                批次 ${current}/${total} | 已生成 ${episodes.length} 集
            </div>
            <button onclick="pauseBatchGeneration()">⏸️ 暫停</button>
        </div>
    `;
}
```

---

## 暫停/恢復機制

```javascript
let batchState = {
    isPaused: false,
    currentBatch: 0,
    allEpisodes: [],
    config: null
};

function pauseBatchGeneration() {
    batchState.isPaused = true;
    saveBatchState();
    showMessage('已暫停，進度已保存');
}

function resumeBatchGeneration() {
    batchState.isPaused = false;
    continueBatchGeneration(batchState.currentBatch);
}

function saveBatchState() {
    localStorage.setItem('batchState', JSON.stringify(batchState));
}
```

---

## 配置建議

| 總集數 | 每批 | 批次數 | 預計時間 |
|--------|------|--------|----------|
| 30集 | 30 | 1批 | 30秒 |
| 50集 | 25 | 2批 | 1分鐘 |
| 80集 | 20 | 4批 | 2分鐘 |
| 100集 | 20 | 5批 | 2.5分鐘 |
| 150集 | 25 | 6批 | 3分鐘 |

---

## 實施優先級

1. **P0**: 前端分批UI + 進度顯示
2. **P1**: 後端batch API
3. **P2**: 暫停/恢復功能
4. **P3**: 批次間連貫性優化
