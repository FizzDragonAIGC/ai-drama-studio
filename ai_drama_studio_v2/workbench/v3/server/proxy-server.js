// AI番劇工作台 - 30 Agents Server (OpenClaw Proxy Mode)
// 通过OpenClaw sessions_spawn调用Claude

import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync, spawn } from 'child_process';
import { AGENTS, AGENT_GROUPS, STATS } from './agents-config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(join(__dirname, '..')));

const PORT = process.env.PORT || 3001;

// 通过OpenClaw CLI调用Claude
async function callViaOpenClaw(systemPrompt, userMessage) {
  return new Promise((resolve, reject) => {
    const fullPrompt = `${systemPrompt}\n\n---\n\n${userMessage}\n\n---\n\n请直接输出结果，不要额外解释。`;
    
    // 写入临时文件
    const tmpFile = `/tmp/agent-prompt-${Date.now()}.txt`;
    writeFileSync(tmpFile, fullPrompt);
    
    try {
      // 使用openclaw的chat功能（非交互模式）
      const result = execSync(`cat "${tmpFile}" | timeout 120 openclaw chat --no-stream 2>/dev/null || cat "${tmpFile}" | timeout 120 claude --no-stream 2>/dev/null`, {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024,
        timeout: 130000
      });
      resolve(result.trim());
    } catch (err) {
      // 如果CLI不可用，尝试直接HTTP调用OpenClaw gateway
      reject(new Error('OpenClaw CLI调用失败: ' + err.message));
    }
  });
}

// 通过OpenClaw Gateway API调用
async function callViaGateway(systemPrompt, userMessage) {
  const gatewayUrl = 'http://localhost:18789';
  
  // 检查gateway是否运行
  try {
    const healthCheck = await fetch(`${gatewayUrl}/health`, { timeout: 3000 });
    if (!healthCheck.ok) throw new Error('Gateway not healthy');
  } catch {
    throw new Error('OpenClaw Gateway未运行');
  }
  
  // 使用sessions API发送消息
  const response = await fetch(`${gatewayUrl}/api/sessions/send`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer a6e87e79f0b77f8e315b3cd91f5679d3c86b819cd82d798d'
    },
    body: JSON.stringify({
      message: `${systemPrompt}\n\n${userMessage}`,
      timeoutSeconds: 120
    })
  });
  
  if (!response.ok) {
    throw new Error(`Gateway API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.result || data.message || JSON.stringify(data);
}

// 直接调用Anthropic API (如果有标准API key)
async function callAnthropicDirect(systemPrompt, userMessage, model = 'claude-sonnet-4-20250514') {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.includes('oat01')) {
    throw new Error('NO_STANDARD_API_KEY');
  }
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 8192,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    })
  });
  
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API error: ${err}`);
  }
  
  const data = await response.json();
  return data.content[0].text;
}

// 通过claude CLI调用（最可靠的方式）
async function callClaude(systemPrompt, userMessage) {
  return new Promise((resolve, reject) => {
    const fullPrompt = `${systemPrompt}\n\n---\n\n${userMessage}\n\n---\n\n请直接输出结果。`;
    
    const proc = spawn('claude', [], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    proc.stdout.on('data', (data) => stdout += data.toString());
    proc.stderr.on('data', (data) => stderr += data.toString());
    
    proc.on('close', (code) => {
      if (code === 0 && stdout.trim()) {
        resolve(stdout.trim());
      } else {
        reject(new Error(stderr || `Process exited with code ${code}`));
      }
    });
    
    proc.on('error', (err) => reject(err));
    
    // 设置超时
    const timeout = setTimeout(() => {
      proc.kill();
      reject(new Error('Claude CLI timeout (120s)'));
    }, 120000);
    
    proc.on('close', () => clearTimeout(timeout));
    
    proc.stdin.write(fullPrompt);
    proc.stdin.end();
  });
}

// 单个Agent API路由
app.post('/api/agent/:agentId', async (req, res) => {
  const { agentId } = req.params;
  const { content, context } = req.body;
  
  const agent = AGENTS[agentId];
  if (!agent) {
    return res.status(400).json({ 
      error: `Unknown agent: ${agentId}`,
      availableAgents: Object.keys(AGENTS)
    });
  }
  
  if (!content) {
    return res.status(400).json({ error: '缺少内容' });
  }
  
  try {
    console.log(`[${agent.name}] Processing...`);
    
    const systemPrompt = `${agent.prompt}\n\n調用的Skills: ${agent.skills.join(', ')}`;
    const userMessage = context 
      ? `背景：\n${JSON.stringify(context, null, 2)}\n\n內容：\n${content}`
      : content;
    
    const result = await callClaude(systemPrompt, userMessage);
    
    console.log(`[${agent.name}] Done!`);
    res.json({ 
      result, 
      agent: agentId,
      agentName: agent.name,
      skillsUsed: agent.skills
    });
  } catch (err) {
    console.error(`[${agent.name}] Error:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

// 兼容旧API
const LEGACY_MAP = {
  interview: 'interview', concept: 'concept', chapters: 'narrative',
  characters: 'character', design: 'artdirector', script: 'screenwriter',
  storyboard: 'storyboard'
};

app.post('/api/:legacy', async (req, res) => {
  const agentId = LEGACY_MAP[req.params.legacy] || req.params.legacy;
  req.params.agentId = agentId;
  
  const agent = AGENTS[agentId];
  if (!agent) {
    return res.status(400).json({ error: `Unknown: ${req.params.legacy}` });
  }
  
  const { content, context, novel, title } = req.body;
  const actualContent = content || novel || '';
  
  if (!actualContent) {
    return res.status(400).json({ error: '缺少小說內容' });
  }
  
  try {
    console.log(`[${agent.name}] Processing...`);
    
    const systemPrompt = `${agent.prompt}\n\nSkills: ${agent.skills.join(', ')}`;
    const userMessage = context 
      ? `背景：${JSON.stringify(context)}\n\n${title ? '標題：'+title+'\n\n' : ''}內容：\n${actualContent}`
      : `${title ? '標題：'+title+'\n\n' : ''}內容：\n${actualContent}`;
    
    const result = await callClaude(systemPrompt, userMessage);
    
    console.log(`[${agent.name}] Done!`);
    res.json({ result, agent: agentId });
  } catch (err) {
    console.error(`[${agent.name}] Error:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

// Agents列表
app.get('/api/agents', (req, res) => {
  res.json({
    agents: Object.entries(AGENTS).map(([id, a]) => ({
      id, name: a.name, group: a.group, skillCount: a.skills.length
    })),
    groups: AGENT_GROUPS,
    stats: STATS
  });
});

// 健康检查
app.get('/health', async (req, res) => {
  let gatewayOk = false;
  try {
    const r = await fetch('http://localhost:18789/health', { timeout: 2000 });
    gatewayOk = r.ok;
  } catch {}
  
  res.json({ 
    status: 'ok',
    mode: 'openclaw-proxy',
    gatewayConnected: gatewayOk,
    stats: STATS
  });
});

app.listen(PORT, () => {
  console.log(`🎬 AI番劇 Agent Server v3 (OpenClaw Proxy)`);
  console.log(`   Port: ${PORT}`);
  console.log(`   📊 ${STATS.totalAgents} Agents | ${STATS.totalSkills} Skills`);
});
