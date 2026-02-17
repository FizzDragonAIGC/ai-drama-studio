// Simple proxy to backend
export default async function handler(req, res) {
  const backendUrl = 'http://34.58.33.115:3001';
  const path = req.url.replace('/api/proxy', '/api');
  
  try {
    const response = await fetch(backendUrl + path, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
