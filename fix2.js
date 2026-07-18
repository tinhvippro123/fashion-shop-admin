const fs = require('fs');
const pages = {
  'categories': { title: 'danh mục', fields: [{label: 'Tên danh mục', id: 'name', field: 'name'}, {label: 'Đường dẫn (Slug)', id: 'slug', field: 'slug'}], varName: 'cat', hasMobile: true },
  'colors': { title: 'màu sắc', fields: [{label: 'Tên màu', id: 'name', field: 'name'}, {label: 'Mã màu (Hex)', id: 'hex', field: 'hex'}], varName: 'color', hasMobile: true },
  'sizes': { title: 'kích thước', fields: [{label: 'Kích thước', id: 'name', field: 'name'}, {label: 'Mô tả', id: 'description', field: 'description'}], varName: 'size', hasMobile: true },
  'vouchers': { title: 'mã giảm giá', fields: [{label: 'Mã Code', id: 'code', field: 'code'}, {label: 'Giảm giá (%)', id: 'discount', field: 'discount'}, {label: 'Ngày hết hạn', id: 'expiry', field: 'expiry'}], varName: 'voucher', hasMobile: true },
  'banners': { title: 'Banner', fields: [{label: 'Tiêu đề', id: 'title', field: 'title'}, {label: 'Đường dẫn (Link)', id: 'link', field: 'link'}], varName: 'banner', hasMobile: true },
  'faqs': { title: 'câu hỏi thường gặp', fields: [{label: 'Câu hỏi', id: 'question', field: 'question'}, {label: 'Câu trả lời', id: 'answer', field: 'answer'}], varName: 'faq', hasMobile: true },
  'staffs': { title: 'thông tin nhân viên', fields: [{label: 'Họ và tên', id: 'name', field: 'name'}, {label: 'Email đăng nhập', id: 'email', field: 'email'}, {label: 'Số điện thoại', id: 'phone', field: 'phone'}, {label: 'Phân quyền', id: 'role', field: 'role'}], varName: 'staff', hasMobile: true, extraMenus: '<DropdownMenuItem>{staff.status === "Hoạt động" ? "Khóa tài khoản" : "Mở khóa"}</DropdownMenuItem>\n                        <DropdownMenuItem className="text-red-600">Xóa tài khoản</DropdownMenuItem>', noDelete: true }
};

for (const [page, data] of Object.entries(pages)) {
  const file = 'src/app/(dashboard)/' + page + '/page.tsx';
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  function buildMenu(isMobile) {
    const prefix = isMobile ? 'm-' : '';
    let inputs = data.fields.map(f => {
      return `                              <div className="grid gap-2">\n                                <Label htmlFor={\`${prefix}edit-${f.id}-$\{${data.varName}.id}\`}>${f.label}</Label>\n                                <Input id={\`${prefix}edit-${f.id}-$\{${data.varName}.id}\`} defaultValue={${data.varName}.${f.field}} />\n                              </div>`;
    }).join('\n');
    let extra = data.extraMenus ? data.extraMenus : '<DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>';
    return `                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger nativeButton={false} render={<DropdownMenuItem closeOnClick={false}>Chỉnh sửa</DropdownMenuItem>} />
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa ${data.title}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
${inputs}
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button className="bg-zinc-900 hover:bg-zinc-800">Lưu thay đổi</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        ${extra}
                      </DropdownMenuContent>
                    </DropdownMenu>`;
  }

  content = content.replace(/<DropdownMenu><DropdownMenuContent>\s*<Dialog>\s*<\/Dialog><\/DropdownMenuContent>\s*<\/DropdownMenu>/, buildMenu(false));
  if (data.hasMobile) {
    content = content.replace(/<DropdownMenu><DropdownMenuContent>\s*<Dialog>\s*<\/Dialog><\/DropdownMenuContent>\s*<\/DropdownMenu>/, buildMenu(true));
  }
  fs.writeFileSync(file, content);
}
console.log('Restored DropdownMenu and DialogContent');
