const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const lighthouse = require('lighthouse').default || require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
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
    const acceptEncoding = req.headers['accept-encoding'] || '';

    const shouldGzip = /text|javascript|json|xml|svg/i.test(contentType);

    if (shouldGzip && acceptEncoding.includes('gzip')) {
      const gzipped = zlib.gzipSync(data, { level: 6 });
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Encoding': 'gzip',
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(gzipped);
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    }
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

    const lhr = mobileResult.lhr;
    for (const [key, audit] of Object.entries(lhr.audits)) {
      if (key.includes('lcp') || key.includes('largest-contentful-paint')) {
        console.log(`AUDIT: ${key}`, audit.title, audit.displayValue);
        if (audit.details) {
          console.log(JSON.stringify(audit.details).slice(0, 500));
        }
      }
    }

  } catch (err) {
    console.error('Audit failed:', err);
  } finally {
    if (chrome) await chrome.kill();
    server.close();
    process.exit(0);
  }
});

