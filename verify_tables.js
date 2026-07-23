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
    const content = fs.readFileSync(filePath, 'utf8');
    const name = path.basename(filePath);
    
    // 1. Check for old early returns
    const hasOldLoadingReturn = /if\s*\(isLoading\)\s*({[^}]*})?/g.test(content) && !content.includes('if (isLoading) return <TableSkeleton'); 
    // Wait, the regex might catch legitimate uses, but in these tables we just shouldn't have `if (isLoading) return...` at all.
    const hasAnyEarlyReturn = /if\s*\(isLoading\)\s*(return|{)/.test(content);
    
    // 2. Check TableSkeleton inside TableBody
    const hasSkeletonInBody = /<TableBody>[\s\S]*?<TableSkeleton/g.test(content) || /\{isLoading\s*\?\s*<TableSkeleton/g.test(content);
    
    // 3. Check for flawed EmptyState logic (length === 0 without !isLoading)
    // Matches {something.length === 0 ?
    // But ignores {(!isLoading && something.length === 0)
    let hasFlawedEmptyLogic = false;
    const lengthChecks = content.match(/\{([a-zA-Z0-9_]+)\.length === 0 \?/g);
    if (lengthChecks) {
      hasFlawedEmptyLogic = true;
    }
    
    console.log(`[${name}]`);
    console.log(`  - Early return: ${hasAnyEarlyReturn ? 'YES (BAD)' : 'NO (GOOD)'}`);
    console.log(`  - Skeleton in Body: ${hasSkeletonInBody ? 'YES (GOOD)' : 'NO (BAD)'}`);
    console.log(`  - Flawed Empty Logic: ${hasFlawedEmptyLogic ? 'YES (BAD)' : 'NO (GOOD)'}`);
  }
}
