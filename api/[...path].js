export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const path = Array.isArray(req.query.path) ? req.query.path.join('/') : (req.query.path || '');
  const backendUrl = `http://34.58.33.115:3001/api/${path}`;
  
  console.log('Proxying to:', backendUrl);
  
  try {
    const fetchOptions = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' }
    };
    
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }
    
    const response = await fetch(backendUrl, fetchOptions);
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      const text = await response.text();
      res.status(response.status).send(text);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message, backendUrl });
  }
}
