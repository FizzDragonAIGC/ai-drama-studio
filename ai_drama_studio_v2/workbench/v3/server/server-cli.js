import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 通过 Claude CLI 调用 API
function callClaude(prompt, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const claude = spawn('claude', ['--print', '--output-format', 'text'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    let killed = false;
    
    const timer = setTimeout(() => {
      killed = true;
      claude.kill();
      reject(new Error('Timeout'));
    }, timeoutMs);
    
    claude.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    claude.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    claude.on('close', (code) => {
      clearTimeout(timer);
      if (killed) return;
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(stderr || `Process exited with code ${code}`));
      }
    });
    
    claude.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
    
    claude.stdin.write(prompt);
    claude.stdin.end();
  });
}

// 提取 JSON
function extractJSON(text) {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) ||
                   text.match(/```\s*([\s\S]*?)\s*```/) ||
                   text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1] || jsonMatch[0]);
  }
  throw new Error('無法解析JSON');
}

// ==================== API 端點 ====================

// 健康檢查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mode: 'claude-cli',
    hasToken: true,
    hasApiKey: true  // 兼容前端
  });
});

// 採訪Agent
app.post('/api/interview', async (req, res) => {
  try {
    const { novel, title } = req.body;
    console.log(`[採訪Agent] 開始分析: ${title}`);
    
    const prompt = `你是專業編劇顧問。分析以下小說並返回JSON格式（只返回JSON，不要其他內容）：

【小說】${title}
${(novel || '').substring(0, 8000)}

返回格式：
{
  "title": "作品名",
  "genre": "類型",
  "era": "時代背景",
  "characters": [{"name": "角色名", "role": "主角/配角", "trait": "特質"}],
  "places": [{"name": "地點", "significance": "意義"}],
  "core_conflict": "核心衝突",
  "themes": ["主題1", "主題2"],
  "interview_questions": ["問題1", "問題2", "問題3", "問題4", "問題5"]
}`;
    
    const result = await callClaude(prompt);
    const json = extractJSON(result);
    console.log(`[採訪Agent] 完成!`);
    res.json(json);
  } catch (err) {
    console.error('[採訪Agent] 錯誤:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 高概念Agent
app.post('/api/concept', async (req, res) => {
  try {
    const { analysis, answers } = req.body;
    console.log(`[高概念Agent] 開始生成`);
    
    const prompt = `你是高概念編劇專家。根據以下分析和訪談回答，生成Logline和故事定位。返回JSON格式（只返回JSON）：

分析: ${JSON.stringify(analysis)}
訪談回答: ${JSON.stringify(answers)}

返回格式：
{
  "logline": "一句話故事概述",
  "genre": "類型定位",
  "tone": "情感基調",
  "target_audience": "目標受眾",
  "unique_selling_point": "獨特賣點",
  "comparable_works": ["參考作品1", "參考作品2"]
}`;
    
    const result = await callClaude(prompt);
    const json = extractJSON(result);
    console.log(`[高概念Agent] 完成!`);
    res.json(json);
  } catch (err) {
    console.error('[高概念Agent] 錯誤:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 章節Agent
app.post('/api/chapters', async (req, res) => {
  try {
    const { novel, concept, episodeCount } = req.body;
    console.log(`[章節Agent] 開始分析，目標${episodeCount}集`);
    
    const prompt = `你是劇集結構專家。將小說拆分為${episodeCount}集。返回JSON格式（只返回JSON）：

概念: ${JSON.stringify(concept)}
小說: ${(novel || '').substring(0, 10000)}

返回格式：
{
  "total_episodes": ${episodeCount},
  "episodes": [
    {
      "episode": 1,
      "title": "集標題",
      "summary": "劇情概要",
      "hook": "結尾鉤子",
      "key_scenes": ["場景1", "場景2"]
    }
  ]
}`;
    
    const result = await callClaude(prompt, 120000);
    const json = extractJSON(result);
    console.log(`[章節Agent] 完成! 共${json.episodes?.length}集`);
    res.json(json);
  } catch (err) {
    console.error('[章節Agent] 錯誤:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 角色Agent
app.post('/api/characters', async (req, res) => {
  try {
    const { analysis, concept } = req.body;
    console.log(`[角色Agent] 開始設計`);
    
    const prompt = `你是角色設計專家（基於Lajos Egri理論）。設計深度角色。返回JSON格式（只返回JSON）：

分析: ${JSON.stringify(analysis)}
概念: ${JSON.stringify(concept)}

返回格式：
{
  "characters": [
    {
      "name": "角色名",
      "role": "主角/配角/反派",
      "archetype": "原型",
      "desire": "外在慾望",
      "need": "內在需求",
      "flaw": "性格缺陷",
      "arc": "角色弧線",
      "appearance": "外貌描述",
      "costume": "服裝風格"
    }
  ]
}`;
    
    const result = await callClaude(prompt);
    const json = extractJSON(result);
    console.log(`[角色Agent] 完成! 共${json.characters?.length}個角色`);
    res.json(json);
  } catch (err) {
    console.error('[角色Agent] 錯誤:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 美術Agent
app.post('/api/design', async (req, res) => {
  try {
    const { concept, characters } = req.body;
    console.log(`[美術Agent] 開始設計`);
    
    const prompt = `你是美術總監。設計視覺風格。返回JSON格式（只返回JSON）：

概念: ${JSON.stringify(concept)}
角色: ${JSON.stringify(characters)}

返回格式：
{
  "visual_style": "整體視覺風格",
  "color_palette": ["主色1", "主色2", "輔助色"],
  "lighting": "燈光風格",
  "locations": [
    {
      "name": "場景名",
      "description": "場景描述",
      "mood": "氛圍"
    }
  ],
  "props": ["重要道具1", "重要道具2"]
}`;
    
    const result = await callClaude(prompt);
    const json = extractJSON(result);
    console.log(`[美術Agent] 完成!`);
    res.json(json);
  } catch (err) {
    console.error('[美術Agent] 錯誤:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 編劇Agent
app.post('/api/script', async (req, res) => {
  try {
    const { episode, characters } = req.body;
    console.log(`[編劇Agent] 開始改編第${episode?.episode}集`);
    
    const prompt = `你是專業編劇。將以下劇情改編為劇本格式。返回JSON格式（只返回JSON）：

集資訊: ${JSON.stringify(episode)}
角色: ${JSON.stringify(characters)}

返回格式：
{
  "episode": ${episode?.episode || 1},
  "scenes": [
    {
      "scene_number": 1,
      "location": "場景地點",
      "time": "日/夜",
      "description": "場景描述",
      "dialogue": [
        {"character": "角色名", "line": "台詞"}
      ],
      "action": "動作描述"
    }
  ]
}`;
    
    const result = await callClaude(prompt, 90000);
    const json = extractJSON(result);
    console.log(`[編劇Agent] 完成! 共${json.scenes?.length}場戲`);
    res.json(json);
  } catch (err) {
    console.error('[編劇Agent] 錯誤:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 分鏡Agent
app.post('/api/storyboard', async (req, res) => {
  try {
    const { script, characters, visualStyle } = req.body;
    console.log(`[分鏡Agent] 開始生成分鏡`);
    
    const prompt = `你是分鏡師。為以下劇本生成分鏡表和AI繪圖Prompt。返回JSON格式（只返回JSON）：

劇本: ${JSON.stringify(script)}
角色: ${JSON.stringify(characters)}
視覺風格: ${JSON.stringify(visualStyle)}

返回格式：
{
  "shots": [
    {
      "shot_number": 1,
      "scene": 1,
      "shot_type": "特寫/中景/全景",
      "camera_angle": "機位角度",
      "description": "畫面描述",
      "dialogue": "台詞（如有）",
      "duration": "秒數",
      "ai_prompt": "AI繪圖prompt（英文，詳細描述畫面）"
    }
  ]
}`;
    
    const result = await callClaude(prompt, 120000);
    const json = extractJSON(result);
    console.log(`[分鏡Agent] 完成! 共${json.shots?.length}個鏡頭`);
    res.json(json);
  } catch (err) {
    console.error('[分鏡Agent] 錯誤:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ==================== 啟動服務器 ====================

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║   🎬 AI番劇工作台 Agent Server                ║
║   Mode: Claude CLI                            ║
║   Port: ${PORT}                                   ║
║   Endpoints: 7 agents + health                ║
╚═══════════════════════════════════════════════╝
  `);
});
