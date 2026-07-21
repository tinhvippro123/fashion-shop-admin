const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const appDir = path.join(__dirname, 'src', 'app');
const missing = [];

walkDir(appDir, (filePath) => {
  if (filePath.endsWith('page.tsx')) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('@/features') && !content.includes('@/shared')) {
      missing.push(filePath);
    }
  }
});
console.log("Pages without @/features or @/shared imports:", missing);
