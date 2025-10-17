// detect-injection.js
// Usage: node detect-injection.js server.log
const fs = require('fs');
const path = require('path');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node detect-injection.js <logfile>');
  process.exit(1);
}

const patterns = [
  /'\s*OR\s*'\d+'\s*=\s*'\d+/i,
  /--\s*$/i,
  /;\s*DROP\s+TABLE/i,
  /UNION\s+SELECT/i,
  /' OR '1'='1/i,
  /" OR "1"="1/i,
  /exec\(/i,
  /sleep\(\d+\)/i
];

fs.readFile(path.resolve(file), 'utf8', (err, data) => {
  if (err) return console.error('Read error:', err);
  const lines = data.split(/\r?\n/);
  const alerts = [];
  lines.forEach((ln, idx) => {
    for (const p of patterns) {
      if (p.test(ln)) {
        alerts.push({ line: idx + 1, pattern: p.toString(), text: ln.trim() });
        break;
      }
    }
  });

  if (alerts.length === 0) {
    console.log('No probable injection attempts found.');
  } else {
    console.log(`Found ${alerts.length} probable injection attempt(s):`);
    alerts.slice(0, 50).forEach(a => {
      console.log(`- line ${a.line} pattern ${a.pattern}: ${a.text}`);
    });
    if (alerts.length > 50) console.log(`...${alerts.length - 50} more`);
  }
});