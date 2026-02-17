const http = require('http');

const BACKEND_HOST = '34.58.33.115';
const BACKEND_PORT = 3001;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 构建后端路径
  const pathArray = req.query.path || [];
  const path = '/api/' + pathArray.join('/');
  
  console.log(`Proxying ${req.method} ${path}`);

  return new Promise((resolve) => {
    const options = {
      hostname: BACKEND_HOST,
      port: BACKEND_PORT,
      path: path,
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 180000
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
      console.error('Backend error:', err.message);
      res.status(502).json({ error: 'Backend connection failed: ' + err.message });
      resolve();
    });

    proxyReq.on('timeout', () => {
      proxyReq.destroy();
      res.status(504).json({ error: 'Backend timeout (180s)' });
      resolve();
    });

    if (req.body && Object.keys(req.body).length > 0) {
      proxyReq.write(JSON.stringify(req.body));
    }
    proxyReq.end();
  });
};
