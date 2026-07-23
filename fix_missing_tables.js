const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "src/features/catalog/components/category/CategoryTable.tsx",
  "src/features/catalog/components/product/ProductTable.tsx",
  "src/features/orders/components/ReturnTable.tsx"
];

for (const relPath of filesToUpdate) {
  const filePath = path.join(__dirname, relPath);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import if missing
    if (!content.includes('TableSkeleton')) {
      const lastImportIndex = content.lastIndexOf('import ');
      const endOfLastImport = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfLastImport + 1) + 
                'import { TableSkeleton } from "@/shared/ui/table-skeleton";\n' + 
                content.slice(endOfLastImport + 1);
    }
    
    // 1. Remove any top-level early returns (either <div> loading or <TableSkeleton />)
    content = content.replace(/if\s*\(isLoading\)\s*\{\s*return\s*(<div[^>]*>.*?<\/div>|<TableSkeleton[^>]*>);?\s*\}/g, '');
    content = content.replace(/if\s*\(isLoading\)\s*return\s*(<div[^>]*>.*?<\/div>|<TableSkeleton[^>]*>);?/g, '');
    
    // Fix flawed EmptyState logic
    content = content.replace(/\{([a-zA-Z0-9_]+)\.length === 0 \?/g, '{(!isLoading && $1.length === 0) ?');
    
    // Count TableHeads
    const theadMatch = content.match(/<TableHeader>[\s\S]*?<\/TableHeader>/);
    let columns = 5;
    if (theadMatch) {
      const heads = theadMatch[0].match(/<TableHead/g);
      if (heads) columns = heads.length;
    }
    
    // Inject TableSkeleton into TableBody
    const tbodyRegex = /<TableBody([^>]*)>([\s\S]*?)<\/TableBody>/;
    const match = content.match(tbodyRegex);
    if (match) {
      const props = match[1];
      const inner = match[2];
      if (!inner.includes('<TableSkeleton')) {
        let innerContent = inner.trim();
        if (innerContent.startsWith('{') && innerContent.endsWith('}')) {
          innerContent = innerContent.substring(1, innerContent.length - 1);
        }
        
        const replacement = `<TableBody${props}>\n              {isLoading ? <TableSkeleton columns={${columns}} /> : (\n${innerContent}\n)}\n            </TableBody>`;
        content = content.replace(tbodyRegex, replacement);
      }
    }
    
    fs.writeFileSync(filePath, content);
    console.log("Fixed: " + relPath + " with " + columns + " columns");
  } else {
    console.log("Not found: " + relPath);
  }
}
