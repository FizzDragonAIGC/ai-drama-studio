// AI番劇工作台 - 30 Agents Server
// 連接Claude API，支持完整30 Agent架構

import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { AGENTS, AGENT_GROUPS, STATS } from './agents-config.js';

// 读取.env文件
const __dirname = dirname(fileURLToPath(import.meta.url));
try {
  const envFile = readFileSync(join(__dirname, '.env'), 'utf-8');
  envFile.split('\n').forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
  });
} catch (e) { /* no .env file */ }

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 同时服务前端静态文件
app.use(express.static(join(__dirname, '..')));

const PORT = process.env.PORT || 3001;

// 直接调用Anthropic API
async function callAnthropicDirect(systemPrompt, userMessage, model = 'claude-sonnet-4-20250514') {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not set');
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
  
  try {
    console.log(`[${agent.name}] Processing request...`);
    
    const systemPrompt = `${agent.prompt}\n\n調用的Skills: ${agent.skills.join(', ')}`;
    const userMessage = context 
      ? `背景信息：\n${JSON.stringify(context, null, 2)}\n\n內容：\n${content}`
      : content;
    
    const result = await callAnthropicDirect(systemPrompt, userMessage);
    
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

// 兼容旧API路由 (interview, concept, etc.)
const LEGACY_AGENT_MAP = {
  interview: 'interview',
  concept: 'concept',
  chapters: 'narrative',
  characters: 'character',
  design: 'artdirector',
  script: 'screenwriter',
  storyboard: 'storyboard'
};

app.post('/api/:legacyAgent', async (req, res) => {
  const { legacyAgent } = req.params;
  const agentId = LEGACY_AGENT_MAP[legacyAgent];
  
  if (!agentId) {
    // 如果不是legacy agent，检查是否是新的agent id
    if (AGENTS[legacyAgent]) {
      req.params.agentId = legacyAgent;
      return app._router.handle(req, res, () => {});
    }
    return res.status(400).json({ 
      error: `Unknown agent: ${legacyAgent}`,
      availableAgents: Object.keys(AGENTS)
    });
  }
  
  const agent = AGENTS[agentId];
  const { content, context } = req.body;
  
  try {
    console.log(`[${agent.name}] Processing request...`);
    
    const systemPrompt = `${agent.prompt}\n\n調用的Skills: ${agent.skills.join(', ')}`;
    const userMessage = context 
      ? `背景信息：\n${JSON.stringify(context, null, 2)}\n\n內容：\n${content}`
      : content;
    
    const result = await callAnthropicDirect(systemPrompt, userMessage);
    
    console.log(`[${agent.name}] Done!`);
    res.json({ result, agent: agentId });
  } catch (err) {
    console.error(`[${agent.name}] Error:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

// 获取所有Agents列表
app.get('/api/agents', (req, res) => {
  res.json({
    agents: Object.entries(AGENTS).map(([id, a]) => ({
      id,
      name: a.name,
      group: a.group,
      skillCount: a.skills.length
    })),
    groups: AGENT_GROUPS,
    stats: STATS
  });
});

// 获取单个Agent详情
app.get('/api/agents/:agentId', (req, res) => {
  const { agentId } = req.params;
  const agent = AGENTS[agentId];
  
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  res.json({
    id: agentId,
    ...agent
  });
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    hasApiKey: !!process.env.ANTHROPIC_API_KEY,
    stats: STATS,
    groups: Object.keys(AGENT_GROUPS)
  });
});

app.listen(PORT, () => {
  console.log(`🎬 AI番劇 Agent Server v2 running on port ${PORT}`);
  console.log(`   API Key: ${process.env.ANTHROPIC_API_KEY ? '✅ Set' : '❌ Not set'}`);
  console.log(`   📊 ${STATS.totalAgents} Agents | ${STATS.totalSkills} Skills | ${STATS.groups} Groups`);
  console.log(`   Groups: ${Object.keys(AGENT_GROUPS).join(', ')}`);
});
