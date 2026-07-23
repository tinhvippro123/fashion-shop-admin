const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "src/features/staffs/components/StaffTable.tsx",
  "src/features/promotions/components/VoucherTable.tsx",
  "src/features/promotions/components/CampaignTable.tsx",
  "src/features/marketing/components/BannerTable.tsx",
  "src/features/marketing/components/FlashSaleTable.tsx",
  "src/features/customers/components/CustomerTable.tsx",
  "src/features/reviews/components/ReviewTable.tsx",
  "src/features/catalog/components/SizeTable.tsx",
  "src/features/catalog/components/ColorTable.tsx",
  "src/features/content/components/ContactTable.tsx",
  "src/features/content/components/PageTable.tsx",
  "src/features/content/components/FAQTable.tsx",
  "src/features/blogs/components/BlogTable.tsx",
  "src/features/orders/components/OrderTable.tsx"
];

for (const relPath of filesToUpdate) {
  const filePath = path.join(__dirname, relPath);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // The previous script injected:
    // {isLoading ? <TableSkeleton columns={8} /> : ({orders.map(...)})}
    // We need to fix this syntax error.
    
    // Find the injected ternary block
    const regex = /\{isLoading \? <TableSkeleton columns={(\d+)} \/> : \(\{([\s\S]*?)\}\)\}/g;
    
    content = content.replace(regex, (match, columns, innerJSX) => {
      return `{isLoading ? <TableSkeleton columns={${columns}} /> : (\n${innerJSX}\n)}`;
    });
    
    // There is also a chance the previous script injected : (orders.map) without { if it didn't have outer {}
    // Let's just use regex to fix: ` : ({` -> ` : (` and `})}` -> `)}` if it matches the bad pattern.
    const badRegex = /\{isLoading \? <TableSkeleton columns={(\d+)} \/> : \(\{([\s\S]*?)\}\)\}/;
    if (badRegex.test(content)) {
       // already handled by global replace above
    }
    
    fs.writeFileSync(filePath, content);
    console.log("Fixed: " + relPath);
  } else {
    console.log("Not found: " + relPath);
  }
}
