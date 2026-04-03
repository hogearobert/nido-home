import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const baseDir = './temporary screenshots';

fs.mkdirSync(baseDir, { recursive: true });

let next = 1;
const existing = fs.readdirSync(baseDir).filter(f => f.startsWith('screenshot-'));
if (existing.length) {
  const nums = existing.map(f => {
    const m = f.match(/screenshot-(\d+)/);
    return m ? parseInt(m[1]) : 0;
  });
  next = Math.max(...nums) + 1;
}

const outFile = label
  ? `${baseDir}/screenshot-${next}-${label}.png`
  : `${baseDir}/screenshot-${next}.png`;

console.log(`Capturing ${url} ...`);

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  executablePath: '/Users/robertm_mac/.cache/puppeteer/chrome/mac_arm-146.0.7680.153/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
});

const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

// Wait for animations
await new Promise(r => setTimeout(r, 1500));

await page.screenshot({ path: outFile, fullPage: true });
await browser.close();

console.log(`Saved: ${outFile}`);
