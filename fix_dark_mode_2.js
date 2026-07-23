const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

let filesModified = 0;

for (const file of files) {
  // Skip skeleton.tsx because it uses explicit dark:bg-zinc-800 which is fine
  if (file.includes('skeleton.tsx')) continue;

  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Backgrounds
  content = content.replace(/bg-zinc-50(?![\/\w])/g, 'bg-muted/50');
  content = content.replace(/bg-zinc-200/g, 'bg-muted');
  
  // Texts
  content = content.replace(/text-zinc-700/g, 'text-foreground');
  content = content.replace(/text-zinc-800/g, 'text-foreground');
  
  // Highlighted elements (Sidebar active, Avatars, special Cards)
  content = content.replace(/bg-zinc-900 text-white/g, 'bg-primary text-primary-foreground');
  content = content.replace(/bg-zinc-900/g, 'bg-primary');
  
  // Cleanup empty strings
  content = content.replace(/className="\s+"/g, '');
  content = content.replace(/className={`\s+`}/g, '');
  
  // Custom fix for FlashSaleForm Button
  content = content.replace(/className="gap-2 bg-primary"/g, 'className="gap-2"');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Modified:', file);
    filesModified++;
  }
}

console.log(`Phase 2: Finished fixing dark mode in ${filesModified} files.`);
