const http = require('http');
const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse').default || require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2'
};

const distDir = path.resolve(__dirname, '..', 'dist');

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  let filePath = path.join(distDir, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  } catch (err) {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 4173;

server.listen(PORT, '127.0.0.1', async () => {
  let chrome;
  try {
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    });

    const mobileResult = await lighthouse(`http://127.0.0.1:${PORT}`, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
    }, {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false
        },
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4
        }
      }
    });

    const audits = mobileResult.lhr.audits;
    console.log('--- LCP ELEMENT ---');
    console.log(JSON.stringify(audits['largest-contentful-paint-element']?.details?.items, null, 2));

    console.log('--- RENDER BLOCKING ---');
    console.log(JSON.stringify(audits['render-blocking-resources']?.details?.items, null, 2));

    console.log('--- MAIN THREAD BREAKDOWN ---');
    console.log(JSON.stringify(audits['mainthread-work-breakdown']?.details?.items?.slice(0, 5), null, 2));

    console.log('--- TOP NETWORK REQUESTS ---');
    const network = audits['network-requests']?.details?.items || [];
    network.slice(0, 12).forEach(item => {
      console.log(`${item.url.slice(-40)} | ${(item.transferSize/1024).toFixed(1)} KB | ${item.resourceType}`);
    });

  } catch (err) {
    console.error('Audit failed:', err);
  } finally {
    if (chrome) await chrome.kill();
    server.close();
    process.exit(0);
  }
});

