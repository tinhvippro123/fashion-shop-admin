const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const featuresDir = path.join(__dirname, 'src', 'features');

walkDir(featuresDir, (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // filePath example: src/features/promotions/hooks/useVouchers.ts
    // featureName is 'promotions'
    const relativePath = path.relative(featuresDir, filePath);
    const parts = relativePath.split(path.sep);
    
    if (parts.length >= 2) {
      const featureName = parts[0];
      
      const newContent = content.replace(/from\s+['"]\.\.\/(.*?)['"]/g, `from "@/features/${featureName}/$1"`);
      
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated: ${filePath}`);
      }
    }
  }
});
console.log("Done.");
