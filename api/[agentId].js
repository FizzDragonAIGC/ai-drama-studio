export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { agentId } = req.query;
  
  // 排除已有的固定路由
  const fixedRoutes = ['health', 'providers', 'agents', 'config', 'stream'];
  if (fixedRoutes.includes(agentId)) {
    return res.status(404).json({ error: 'Use specific endpoint' });
  }
  
  const backendUrl = `http://34.58.33.115:3001/api/agent/${agentId}`;
  
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message, hint: 'Backend connection failed' });
  }
}
