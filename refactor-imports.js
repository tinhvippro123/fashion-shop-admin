const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('d:/Project/fashion_shop_project/fashion-shop-admin/src/features', (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Normalize path to forward slashes for regex matching
    const normalizedPath = filePath.replace(/\\/g, '/');
    const match = normalizedPath.match(/src\/features\/([^\/]+)/);
    if (!match) return;
    const featureName = match[1];
    
    content = content.replace(/from\s+['"]\.\.\/\.\.\/(.*?)['"]/g, `from "@/features/${featureName}/$1"`);
    content = content.replace(/from\s+['"]\.\.\/(.*?)['"]/g, `from "@/features/${featureName}/$1"`);
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
    }
  }
});
