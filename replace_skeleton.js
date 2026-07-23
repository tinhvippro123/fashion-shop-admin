const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "src/features/staffs/components/StaffTable.tsx",
  "src/features/promotions/components/VoucherTable.tsx",
  "src/features/marketing/components/BannerTable.tsx",
  "src/features/marketing/components/FlashSaleTable.tsx",
  "src/features/customers/components/CustomerTable.tsx",
  "src/features/reviews/components/ReviewTable.tsx",
  "src/features/catalog/components/SizeTable.tsx",
  "src/features/catalog/components/ColorTable.tsx",
  "src/features/content/components/ContactTable.tsx",
  "src/features/content/components/PageTable.tsx",
  "src/features/blogs/components/BlogTable.tsx"
];

for (const relPath of filesToUpdate) {
  const filePath = path.join(__dirname, relPath);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import if not exists
    if (!content.includes('TableSkeleton')) {
      // Find the last import
      const lastImportIndex = content.lastIndexOf('import ');
      const endOfLastImport = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfLastImport + 1) + 
                'import { TableSkeleton } from "@/shared/ui/table-skeleton";\n' + 
                content.slice(endOfLastImport + 1);
    }
    
    // Replace loading text
    content = content.replace(/if\s*\(isLoading\)\s*return\s*<div[^>]*>Đang tải[^<]*<\/div>;/, 'if (isLoading) return <TableSkeleton />;');
    
    fs.writeFileSync(filePath, content);
    console.log("Updated: " + relPath);
  } else {
    console.log("Not found: " + relPath);
  }
}
