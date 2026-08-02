const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  try {
    console.log('Navigating to http://localhost:3000/about...');
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
    console.log('Page loaded.');
  } catch (e) {
    console.log('Navigation failed:', e);
  }
  
  await browser.close();
})();
