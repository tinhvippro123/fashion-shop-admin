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
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Layouts & Containers
  content = content.replace(/bg-zinc-50\/50/g, 'bg-muted/30');
  content = content.replace(/bg-white/g, 'bg-card');
  
  // 2. Buttons & Badges (Hardcoded dark colors in light mode)
  content = content.replace(/bg-zinc-900 hover:bg-zinc-800 text-white/g, '');
  content = content.replace(/bg-zinc-900 hover:bg-zinc-800/g, '');
  
  // 3. Text Colors
  // We don't want to blindly replace all text-zinc-900 because some might be specific.
  // Actually, replacing text-zinc-900 with text-foreground is safe.
  content = content.replace(/text-zinc-900/g, 'text-foreground');
  content = content.replace(/text-zinc-500/g, 'text-muted-foreground');
  content = content.replace(/text-zinc-600/g, 'text-muted-foreground');
  content = content.replace(/text-zinc-400/g, 'text-muted-foreground');

  // 4. Borders & Badges backgrounds
  content = content.replace(/bg-zinc-100/g, 'bg-muted');
  content = content.replace(/border-zinc-200/g, 'border-border');
  content = content.replace(/border-zinc-100/g, 'border-border');
  content = content.replace(/divide-zinc-100/g, 'divide-border');
  content = content.replace(/divide-zinc-200/g, 'divide-border');
  content = content.replace(/ring-zinc-200/g, 'ring-border');
  
  // 5. Cleanup empty classNames caused by button replacement
  content = content.replace(/className="\s+"/g, '');
  content = content.replace(/className={`\s+`}/g, '');
  content = content.replace(/className={\s*cn\(\s*""\s*\)\s*}/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Modified:', file);
    filesModified++;
  }
}

console.log(`Finished fixing dark mode in ${filesModified} files.`);
