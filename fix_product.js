const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/features/catalog/components/product/ProductTable.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add TableSkeleton import
if (!content.includes('import { TableSkeleton }')) {
  content = content.replace('import { Product } from "@/features/catalog/types/product.admin";', 
    'import { Product } from "@/features/catalog/types/product.admin";\nimport { TableSkeleton } from "@/shared/ui/table-skeleton";');
}

// 2. Add isLoading prop
content = content.replace('interface ProductTableProps {\n  products: Product[];\n}', 'interface ProductTableProps {\n  products: Product[];\n  isLoading?: boolean;\n}');
content = content.replace('export function ProductTable({ products }: ProductTableProps) {', 'export function ProductTable({ products, isLoading }: ProductTableProps) {');

// 3. Inject skeleton to desktop
content = content.replace(
  /<TableBody>\r?\n\s*\{products\.map\(\(product\) => \(/g,
  '<TableBody>\n              {isLoading ? <TableSkeleton columns={7} /> : (\nproducts.map((product) => ('
);

content = content.replace(
  /<\/TableRow>\r?\n\s*\)\)\r?\n\s*\}/g,
  '</TableRow>\n                ))\n)}'
);

// 4. Fix EmptyState logic
content = content.replace(/\{products\.length === 0 \?/g, '{(!isLoading && products.length === 0) ?');

// 5. Mobile list
content = content.replace(
  /<div className="md:hidden flex flex-col">\r?\n\s*\{products\.map\(\(product\) => \(/g,
  '<div className="md:hidden flex flex-col">\n          {isLoading ? <div className="p-4 text-center text-zinc-500">Đang tải...</div> : (\nproducts.map((product) => ('
);

content = content.replace(
  /<\/DropdownMenu>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n\s*\)\)\r?\n\s*\}/g,
  '</DropdownMenu>\n              </div>\n            </div>\n          ))\n)}'
);

fs.writeFileSync(file, content);
console.log("Fixed ProductTable");
