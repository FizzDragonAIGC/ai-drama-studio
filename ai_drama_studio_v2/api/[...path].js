const https = require('https');
const http = require('http');

const BACKEND_HOST = '34.58.33.115';
const BACKEND_PORT = 3001;

module.exports = async (req, res) => {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const path = '/api/' + (req.query.path?.join('/') || '');
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BACKEND_HOST,
      port: BACKEND_PORT,
      path: path,
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 180000 // 3分钟超时
    };

    const proxyReq = http.request(options, (proxyRes) => {
      let data = '';
      proxyRes.on('data', chunk => data += chunk);
      proxyRes.on('end', () => {
        res.status(proxyRes.statusCode);
        try {
          res.json(JSON.parse(data));
        } catch {
          res.send(data);
        }
        resolve();
      });
    });

    proxyReq.on('error', (err) => {
      res.status(502).json({ error: 'Backend connection failed: ' + err.message });
      resolve();
    });

    proxyReq.on('timeout', () => {
      proxyReq.destroy();
      res.status(504).json({ error: 'Backend timeout' });
      resolve();
    });

    if (req.body) {
      proxyReq.write(JSON.stringify(req.body));
    }
    proxyReq.end();
  });
};
