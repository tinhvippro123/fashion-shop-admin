const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "src/features/staffs/components/StaffTable.tsx",
  "src/features/promotions/components/VoucherTable.tsx",
  "src/features/customers/components/CustomerTable.tsx",
  "src/features/blogs/components/BlogTable.tsx"
];

for (const relPath of filesToUpdate) {
  const filePath = path.join(__dirname, relPath);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the block:
    // if (isLoading) {
    //   return <div className="flex justify-center p-8 text-zinc-500">Đang tải danh sách...</div>;
    // }
    const regex = /if\s*\(isLoading\)\s*\{\s*return\s*<div[^>]*>Đang tải[^<]*<\/div>;\s*\}/g;
    content = content.replace(regex, '');
    
    fs.writeFileSync(filePath, content);
    console.log("Fixed: " + relPath);
  } else {
    console.log("Not found: " + relPath);
  }
}
