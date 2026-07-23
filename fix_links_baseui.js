const fs = require('fs');
const path = require('path');

// 1. Revert dropdown-menu.tsx
let dropdownMenuPath = 'src/shared/ui/dropdown-menu.tsx';
let dropdownMenuContent = fs.readFileSync(dropdownMenuPath, 'utf8');
dropdownMenuContent = dropdownMenuContent.replace(/\s*asChild\?:\s*boolean\n?/g, '\n');
fs.writeFileSync(dropdownMenuPath, dropdownMenuContent, 'utf8');
console.log('Reverted dropdown-menu.tsx');

// 2. Fix DropdownMenuItem links globally in all tables to use render={<Link ... />}
const featuresDir = 'src/features';

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walkDir(file));
    } else {
      if (file.endsWith('Table.tsx')) results.push(file);
    }
  });
  return results;
}

const tableFiles = walkDir(featuresDir);
tableFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  const regex = /<DropdownMenuItem\s+asChild>\s*<Link\s+href=\{([^>]+)\}\s+className="([^"]+)">([\s\S]*?)<\/Link>\s*<\/DropdownMenuItem>/g;
  content = content.replace(regex, '<DropdownMenuItem render={<Link href={$1} className="$2" />}>\n                              $3\n                            </DropdownMenuItem>');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed Base UI Dropdown Links in ${file}`);
  }
});
