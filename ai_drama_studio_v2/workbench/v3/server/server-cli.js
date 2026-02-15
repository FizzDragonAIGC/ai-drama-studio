import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 设置 OAuth Token
const OAUTH_TOKEN = process.env.CLAUDE_CODE_OAUTH_TOKEN || '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';

// 通过 Claude CLI 调用 API
function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const env = {
      ...process.env,
      CLAUDE_CODE_OAUTH_TOKEN: OAUTH_TOKEN
    };
    
    const claude = spawn('claude', ['--print', '--output-format', 'text'], {
      env,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    claude.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    claude.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    claude.on('close', (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(stderr || `Process exited with code ${code}`));
      }
    });
    
    claude.on('error', (err) => {
      reject(err);
    });
    
    // 发送 prompt
    claude.stdin.write(prompt);
    claude.stdin.end();
    
    // 30秒超时
    setTimeout(() => {
      claude.kill();
      reject(new Error('Timeout'));
    }, 30000);
  });
}

// Agent Prompts
const AGENT_PROMPTS = {
  interview: (novel, title) => `你是專業編劇顧問。分析小說並返回JSON：

【小說】${title}
${novel.substring(0, 5000)}

返回格式（只返回JSON，不要其他內容）：
{"title":"作品名","genre":"類型","characters":[{"name":"角色名","role":"主角/配角"}],"core_conflict":"核心衝突","interview_questions":["問題1","問題2","問題3"]}`
};

// Interview API
app.post('/api/interview', async (req, res) => {
  try {
    const { novel, title } = req.body;
    console.log(`[採訪Agent] 開始分析: ${title}`);
    
    const result = await callClaude(AGENT_PROMPTS.interview(novel, title));
    
    // 提取 JSON
    const jsonMatch = result.match(/```json\s*([\s\S]*?)\s*```/) ||
                     result.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const json = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      console.log(`[採訪Agent] 完成!`);
      res.json(json);
    } else {
      res.json({ raw: result });
    }
  } catch (err) {
    console.error('[採訪Agent] 錯誤:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 健康檢查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mode: 'claude-cli',
    hasToken: !!OAUTH_TOKEN
  });
});

// 啟動服務器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║   🎬 AI番劇工作台 Agent Server (CLI Mode)     ║
║   Port: ${PORT}                                   ║
║   Token: ${OAUTH_TOKEN ? '✓' : '✗'}                                     ║
╚═══════════════════════════════════════════════╝
  `);
});
