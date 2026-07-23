const fs = require('fs');
const path = require('path');

function replaceFile(relPath, replacer) {
  const file = path.join(__dirname, relPath);
  if (fs.existsSync(file)) {
    const original = fs.readFileSync(file, 'utf8');
    const newContent = replacer(original);
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${relPath}`);
  }
}

// 1. Products Page
replaceFile('src/app/(dashboard)/products/page.tsx', (content) => {
  return content.replace('const { products } = useProducts();', 'const { products, isLoading } = useProducts();')
                .replace('<ProductTable products={products} />', '<ProductTable products={products} isLoading={isLoading} />');
});

// 2. Categories Page
replaceFile('src/app/(dashboard)/categories/page.tsx', (content) => {
  return content.replace('const { categories } = useCategories();', 'const { categories, isLoading } = useCategories();')
                .replace('<CategoryTable categories={categories} />', '<CategoryTable categories={categories} isLoading={isLoading} />');
});

// 3. ProductTable
replaceFile('src/features/catalog/components/product/ProductTable.tsx', (content) => {
  let c = content;
  // Add isLoading prop
  c = c.replace('interface ProductTableProps {\n  products: Product[];\n}', 'interface ProductTableProps {\n  products: Product[];\n  isLoading?: boolean;\n}');
  c = c.replace('export function ProductTable({ products }: ProductTableProps) {', 'export function ProductTable({ products, isLoading }: ProductTableProps) {');
  
  // Inject skeleton
  c = c.replace(/<TableBody>\s*\{products\.map\(\(product\) => \(/g, '<TableBody>\n              {isLoading ? <TableSkeleton columns={7} /> : (\nproducts.map((product) => (');
  c = c.replace(/<\/TableRow>\s*\)\)\s*\}/g, '</TableRow>\n                ))\n)}');
  
  // Empty logic for desktop
  c = c.replace(/\{products\.length === 0 \?/g, '{(!isLoading && products.length === 0) ?');

  // Fix mobile view skeleton
  c = c.replace(/<div className="md:hidden flex flex-col">\s*\{products\.map\(\(product\) => \(/g, 
    '<div className="md:hidden flex flex-col">\n          {isLoading ? <div className="p-4 text-center text-zinc-500">Đang tải...</div> : (\nproducts.map((product) => (');
  
  c = c.replace(/<\/DropdownMenu>\s*<\/div>\s*<\/div>\s*\)\)\s*\}/g, 
    '</DropdownMenu>\n              </div>\n            </div>\n          ))\n)}');
    
  return c;
});

// 4. CategoryTable
replaceFile('src/features/catalog/components/category/CategoryTable.tsx', (content) => {
  let c = content;
  // Add isLoading prop
  c = c.replace('interface CategoryTableProps {\n  categories: Category[];\n}', 'interface CategoryTableProps {\n  categories: Category[];\n  isLoading?: boolean;\n}');
  c = c.replace('export function CategoryTable({ categories }: CategoryTableProps) {', 'export function CategoryTable({ categories, isLoading }: CategoryTableProps) {');
  
  // Inject skeleton
  c = c.replace(/<TableBody className="bg-white">\s*\{categories\.map\(\(category\) => \(/g, '<TableBody className="bg-white">\n              {isLoading ? <TableSkeleton columns={6} /> : (\ncategories.map((category) => (');
  c = c.replace(/<\/TableRow>\s*\)\)\s*\}/g, '</TableRow>\n                ))\n)}');
  
  // Empty logic for desktop
  c = c.replace(/\{categories\.length === 0 \?/g, '{(!isLoading && categories.length === 0) ?');
  
  // Fix mobile view skeleton
  c = c.replace(/<div className="md:hidden flex flex-col">\s*\{categories\.map\(\(cat\) => \(/g, 
    '<div className="md:hidden flex flex-col">\n          {isLoading ? <div className="p-4 text-center text-zinc-500">Đang tải...</div> : (\ncategories.map((cat) => (');
  
  c = c.replace(/<\/DropdownMenu>\s*<\/div>\s*<\/div>\s*\)\)\s*\}/g, 
    '</DropdownMenu>\n              </div>\n            </div>\n          ))\n)}');
    
  return c;
});
