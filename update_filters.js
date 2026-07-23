const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "src/features/reviews/components/ReviewTable.tsx",
  "src/features/promotions/components/VoucherTable.tsx",
  "src/features/promotions/components/CampaignTable.tsx",
  "src/features/orders/components/ReturnTable.tsx",
  "src/features/orders/components/OrderTable.tsx",
  "src/features/customers/components/CustomerTable.tsx",
  "src/features/catalog/components/product/ProductTable.tsx",
  "src/features/catalog/components/category/CategoryTable.tsx"
];

filesToUpdate.forEach(file => {
  const fullPath = path.join('d:/Project/fashion_shop_project/fashion-shop-admin', file);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Look for the block with search input and the filter buttons
  const regex = /<div className="relative flex-1 max-w-sm">\s*<Search className="absolute [^>]+>\s*<Input[\s\S]*?\/>\s*<\/div>\s*<Button variant="outline" className="(?:ml-auto hidden sm:flex|hidden sm:flex ml-auto|ml-auto sm:flex hidden)">\s*<Filter className="mr-2 h-4 w-4" \/> Lọc\s*<\/Button>(?:\s*<Button variant="outline" size="icon" className="(?:sm:hidden|sm:hidden ml-auto)">\s*<Filter className="h-4 w-4" \/>\s*<\/Button>)?/m;
  
  const match = content.match(regex);
  if (match) {
    let replaced = match[0]
      .replace(/<div className="relative flex-1 max-w-sm">/, '<div className="flex items-center gap-2 flex-1 max-w-sm">\n            <div className="relative flex-1">')
      .replace(/<\/div>\s*<Button variant="outline" className="[^"]+">\s*<Filter className="mr-2 h-4 w-4" \/> Lọc\s*<\/Button>(?:\s*<Button variant="outline" size="icon" className="[^"]+">\s*<Filter className="h-4 w-4" \/>\s*<\/Button>)?/, '</div>\n            <Button variant="outline">\n              <Filter className="mr-2 h-4 w-4" /> Lọc\n            </Button>\n          </div>');
    
    content = content.replace(regex, replaced);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`No match found in ${file}`);
  }
});
