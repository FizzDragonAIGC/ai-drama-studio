import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// OpenClaw Gateway 配置
const GATEWAY_URL = 'http://localhost:18789';
const GATEWAY_TOKEN = 'a6e87e79f0b77f8e315b3cd91f5679d3c86b819cd82d798d';

// 通过 OpenClaw Gateway 调用 Claude
async function callClaude(prompt, systemPrompt = '') {
  const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
  
  // 使用 sessions_spawn 通过 Gateway API
  const response = await fetch(`${GATEWAY_URL}/api/sessions/spawn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GATEWAY_TOKEN}`
    },
    body: JSON.stringify({
      task: fullPrompt,
      timeoutSeconds: 120,
      cleanup: 'delete'
    })
  });
  
  if (!response.ok) {
    throw new Error(`Gateway error: ${response.status}`);
  }
  
  const result = await response.json();
  return result;
}

// Agent Prompts
const AGENT_PROMPTS = {
  interview: (novel, title) => `你是專業編劇顧問，正在深度閱讀一部小說，準備進行創意訪談。

【小說】${title}

【內容摘要】
${novel.substring(0, 8000)}

請分析這部小說，返回JSON格式：
{
  "title": "作品名",
  "genre": "類型",
  "era": "時代背景",
  "characters": [{"name": "角色名", "role": "主角/配角", "trait": "核心特質"}],
  "core_conflict": "一句話核心衝突",
  "themes": ["主題1", "主題2"],
  "interview_questions": ["問題1", "問題2", "問題3"]
}

只返回JSON，不要其他說明。`
};

// Interview API
app.post('/api/interview', async (req, res) => {
  try {
    const { novel, title } = req.body;
    console.log(`[採訪Agent] 開始分析: ${title}`);
    
    const result = await callClaude(AGENT_PROMPTS.interview(novel, title));
    
    // 提取 JSON
    const jsonMatch = result.result?.match(/```json\s*([\s\S]*?)\s*```/) ||
                     result.result?.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const json = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      res.json(json);
    } else {
      res.json({ raw: result.result });
    }
  } catch (err) {
    console.error('[採訪Agent] 錯誤:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 健康檢查
app.get('/api/health', async (req, res) => {
  try {
    // 測試 Gateway 連接
    const response = await fetch(`${GATEWAY_URL}/api/status`, {
      headers: { 'Authorization': `Bearer ${GATEWAY_TOKEN}` }
    });
    const status = response.ok ? 'ok' : 'gateway_error';
    res.json({ status, mode: 'openclaw-gateway' });
  } catch (err) {
    res.json({ status: 'error', error: err.message });
  }
});

// 啟動服務器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║   🎬 AI番劇工作台 Agent Server                ║
║   Mode: OpenClaw Gateway Proxy                ║
║   Port: ${PORT}                                   ║
║   Gateway: ${GATEWAY_URL}               ║
╚═══════════════════════════════════════════════╝
  `);
});
