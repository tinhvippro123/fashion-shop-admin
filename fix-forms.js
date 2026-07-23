const fs = require('fs');

const filesToUpdate = [
  'src/app/(dashboard)/flash-sales/create/page.tsx',
  'src/app/(dashboard)/flash-sales/[id]/edit/page.tsx',
  'src/app/(dashboard)/pages/create/page.tsx',
  'src/app/(dashboard)/pages/[id]/edit/page.tsx',
  'src/features/catalog/components/product/ProductForm.tsx',
  'src/features/blogs/components/BlogForm.tsx',
  'src/features/promotions/components/CampaignForm.tsx'
];

for (const file of filesToUpdate) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace <div className="flex flex-col gap-6 w-full pb-10"> or w-full">
    content = content.replace(/className="flex flex-col gap-6 w-full pb-10"/g, 'className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10"');
    content = content.replace(/className="flex flex-col gap-6 w-full"/g, 'className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10"');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  } else {
    console.log('Not found:', file);
  }
}
