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

    // Gzip text resources like production Hostinger server
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
  console.log(`Production Gzip Server listening at http://127.0.0.1:${PORT}`);
  
  let chrome;
  try {
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    });

    // Run Mobile Audit
    console.log('--- RUNNING LIGHTHOUSE MOBILE AUDIT (With Gzip Compression) ---');
    const mobileResult = await lighthouse(`http://127.0.0.1:${PORT}`, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
      onlyCategories: ['performance']
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

    const mReport = mobileResult.lhr;
    const mScore = Math.round(mReport.categories.performance.score * 100);
    const mFCP = mReport.audits['first-contentful-paint'].displayValue;
    const mLCP = mReport.audits['largest-contentful-paint'].displayValue;
    const mTBT = mReport.audits['total-blocking-time'].displayValue;
    const mCLS = mReport.audits['cumulative-layout-shift'].displayValue;
    const mSI = mReport.audits['speed-index'].displayValue;

    console.log(`MOBILE PERFORMANCE SCORE: ${mScore}`);
    console.log(`  FCP: ${mFCP}`);
    console.log(`  LCP: ${mLCP}`);
    console.log(`  TBT: ${mTBT}`);
    console.log(`  CLS: ${mCLS}`);
    console.log(`  Speed Index: ${mSI}`);

    // Run Desktop Audit
    console.log('\n--- RUNNING LIGHTHOUSE DESKTOP AUDIT (With Gzip Compression) ---');
    const desktopResult = await lighthouse(`http://127.0.0.1:${PORT}`, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
      onlyCategories: ['performance']
    }, {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1
        }
      }
    });

    const dReport = desktopResult.lhr;
    const dScore = Math.round(dReport.categories.performance.score * 100);
    const dFCP = dReport.audits['first-contentful-paint'].displayValue;
    const dLCP = dReport.audits['largest-contentful-paint'].displayValue;
    const dTBT = dReport.audits['total-blocking-time'].displayValue;
    const dCLS = dReport.audits['cumulative-layout-shift'].displayValue;
    const dSI = dReport.audits['speed-index'].displayValue;

    console.log(`DESKTOP PERFORMANCE SCORE: ${dScore}`);
    console.log(`  FCP: ${dFCP}`);
    console.log(`  LCP: ${dLCP}`);
    console.log(`  TBT: ${dTBT}`);
    console.log(`  CLS: ${dCLS}`);
    console.log(`  Speed Index: ${dSI}`);

  } catch (err) {
    console.error('Audit failed:', err);
  } finally {
    if (chrome) await chrome.kill();
    server.close();
    process.exit(0);
  }
});
