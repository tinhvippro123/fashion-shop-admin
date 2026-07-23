const fs = require('fs');
const path = require('path');

// 1. First, re-apply the filter fix for OrderTable
let orderTablePath = 'src/features/orders/components/OrderTable.tsx';
let orderContent = fs.readFileSync(orderTablePath, 'utf8');
const filterRegex = /<div className="relative flex-1 max-w-sm">\s*<Search className="absolute [^>]+>\s*<Input[\s\S]*?\/>\s*<\/div>\s*<Button variant="outline" className="(?:ml-auto hidden sm:flex|hidden sm:flex ml-auto|ml-auto sm:flex hidden)">\s*<Filter className="mr-2 h-4 w-4" \/> Lọc\s*<\/Button>(?:\s*<Button variant="outline" size="icon" className="(?:sm:hidden|sm:hidden ml-auto)">\s*<Filter className="h-4 w-4" \/>\s*<\/Button>)?/m;
const match = orderContent.match(filterRegex);
if (match) {
  let replaced = match[0]
    .replace(/<div className="relative flex-1 max-w-sm">/, '<div className="flex items-center gap-2 flex-1 max-w-sm">\n            <div className="relative flex-1">')
    .replace(/<\/div>\s*<Button variant="outline" className="[^"]+">\s*<Filter className="mr-2 h-4 w-4" \/> Lọc\s*<\/Button>(?:\s*<Button variant="outline" size="icon" className="[^"]+">\s*<Filter className="h-4 w-4" \/>\s*<\/Button>)?/, '</div>\n            <Button variant="outline">\n              <Filter className="mr-2 h-4 w-4" /> Lọc\n            </Button>\n          </div>');
  orderContent = orderContent.replace(filterRegex, replaced);
}
fs.writeFileSync(orderTablePath, orderContent, 'utf8');

// 2. Fix DropdownMenuItem links globally in all tables
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

  // Pattern 1: <DropdownMenuItem> \n <Link ...>...</Link> \n </DropdownMenuItem>
  content = content.replace(/<DropdownMenuItem>\s*<Link\s+href=\{([^>]+)\}\s+className="([^"]+)">([^<]+)<\/Link>\s*<\/DropdownMenuItem>/g, '<DropdownMenuItem asChild>\n                            <Link href={$1} className="$2">$3</Link>\n                          </DropdownMenuItem>');

  // Pattern 2: CustomerTable specific: <DropdownMenuItem render={<Link href={...} className="..." />}> Text </DropdownMenuItem>
  content = content.replace(/<DropdownMenuItem\s+render=\{<Link\s+href=\{([^>]+)\}\s+className="([^"]+)"\s*\/>\}>\s*([^<]+)\s*<\/DropdownMenuItem>/g, '<DropdownMenuItem asChild>\n                          <Link href={$1} className="$2">$3</Link>\n                        </DropdownMenuItem>');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed Dropdown Links in ${file}`);
  }
});
