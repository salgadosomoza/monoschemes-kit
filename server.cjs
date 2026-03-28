const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const file = path.join(__dirname, 'src/tokens/components.json');
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200);
    res.end(data);
  });
}).listen(3000, () => console.log('✅ Running on http://localhost:3000'));