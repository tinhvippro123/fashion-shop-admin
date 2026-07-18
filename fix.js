const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/app/(dashboard)');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<DropdownMenuContent align="end">\s*<DropdownMenuItem className="text-red-600">Xóa<\/DropdownMenuItem>/g, '<DropdownMenuContent align="end">\n                        <DialogTrigger nativeButton={false} render={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Chỉnh sửa</DropdownMenuItem>} />\n                        <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>');
  
  // also fix staffs/page.tsx which has: <DropdownMenuItem>{staff.status === "Hoạt động" ? "Khóa tài khoản" : "Mở khóa"}</DropdownMenuItem>
  content = content.replace(/<DropdownMenuContent align="end">\s*<DropdownMenuItem>\{staff\.status/g, '<DropdownMenuContent align="end">\n                        <DialogTrigger nativeButton={false} render={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Chỉnh sửa</DropdownMenuItem>} />\n                        <DropdownMenuItem>{staff.status');
  fs.writeFileSync(file, content);
});
console.log('Restored DialogTrigger');
