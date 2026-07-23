const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/features/catalog/components/category/CategoryTable.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add isLoading prop
content = content.replace('interface CategoryTableProps {\n  categories: Category[];\n}', 'interface CategoryTableProps {\n  categories: Category[];\n  isLoading?: boolean;\n}');
content = content.replace('export function CategoryTable({ categories }: CategoryTableProps) {', 'export function CategoryTable({ categories, isLoading }: CategoryTableProps) {');

// 2. Inject skeleton to desktop
content = content.replace(
  /<TableBody>\n\s*\{categories\.map\(\(cat\) => \(/g,
  '<TableBody>\n              {isLoading ? <TableSkeleton columns={6} /> : (\ncategories.map((cat) => ('
);

content = content.replace(
  /<\/TableRow>\n\s*\)\)\n\s*\}/g,
  '</TableRow>\n                ))\n)}'
);

// 3. Fix EmptyState logic
content = content.replace(/\{categories\.length === 0 \?/g, '{(!isLoading && categories.length === 0) ?');

// 4. Mobile list
content = content.replace(
  /<div className="md:hidden flex flex-col">\n\s*\{categories\.map\(\(cat\) => \(/g,
  '<div className="md:hidden flex flex-col">\n          {isLoading ? <div className="p-4 text-center text-zinc-500">Đang tải...</div> : (\ncategories.map((cat) => ('
);

content = content.replace(
  /<\/DropdownMenu>\n\s*<\/div>\n\s*<\/div>\n\s*\)\)\n\s*\}/g,
  '</DropdownMenu>\n              </div>\n            </div>\n          ))\n)}'
);

fs.writeFileSync(file, content);
console.log("Fixed CategoryTable");
